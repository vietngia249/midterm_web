import { useState, useCallback } from 'react'
import { useWebcam } from './hooks/useWebcam'
import Header from './components/Header'
import Footer from './components/Footer'
import CameraView from './components/CameraView'
import ModelStatus from './components/ModelStatus'
import CheckInForm from './components/CheckInForm'
import DetectionInfo from './components/DetectionInfo'
import AttendanceList from './components/AttendanceList'
import ModelLoadingOverlay from './components/ModelLoadingOverlay'

const STORAGE_KEY = 'smart-attendance-records'

function loadRecords() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

function App() {
  const { videoRef, isStreaming, error, startCamera, stopCamera } = useWebcam()

  // Attendance records from localStorage
  const [records, setRecords] = useState(loadRecords)

  // Model state (will be connected to TF.js later)
  const [modelStatus, setModelStatus] = useState('ready')

  // Detection state (mock - will be driven by BlazeFace later)
  const [faceDetected, setFaceDetected] = useState(false)
  const [faceCount, setFaceCount] = useState(0)
  const [fps, setFps] = useState(0)
  const [latency, setLatency] = useState('0ms')

  // Loading overlay (will be shown during model init)
  const [showLoading, setShowLoading] = useState(false)

  const handleCheckIn = useCallback((name) => {
    const now = new Date()
    const record = {
      id: crypto.randomUUID(),
      name,
      timestamp: now.toISOString(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      faceDetected: true,
      faceCount,
    }
    const updated = [record, ...records]
    setRecords(updated)
    saveRecords(updated)
  }, [records, faceCount])

  const handleClearAll = useCallback(() => {
    setRecords([])
    saveRecords([])
  }, [])

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col">
      <Header />

      {/* Model Loading Overlay */}
      <ModelLoadingOverlay
        progress={75}
        statusText="Optimizing WebGL Shaders"
        isVisible={showLoading}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section: Camera View (2/3) */}
          <div className="lg:col-span-2">
            <CameraView
              isStreaming={isStreaming}
              onStartCamera={startCamera}
              onStopCamera={stopCamera}
              videoRef={videoRef}
              error={error}
            />
          </div>

          {/* Right Section: Sidebar (1/3) */}
          <div className="flex flex-col gap-6">
            <ModelStatus
              status={modelStatus}
              backend="WebGL"
              onRetry={() => setModelStatus('loading')}
            />
            <CheckInForm
              faceDetected={faceDetected}
              onCheckIn={handleCheckIn}
            />
            <DetectionInfo
              faceCount={faceCount}
              fps={fps}
              latency={latency}
            />
            <AttendanceList
              records={records}
              onClearAll={handleClearAll}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
