import { useState, useCallback, useEffect, useRef } from 'react'
import { useWebcam } from './hooks/useWebcam'
import { useFaceDetection } from './hooks/useFaceDetection'
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
  const { videoRef, isStreaming, error: webcamError, startCamera, stopCamera } = useWebcam()
  const canvasRef = useRef(null)
  
  // TensorFlow ML Hook
  const { modelStatus, loadProgress, backend, detectFaces, retryLoad, switchBackend } = useFaceDetection()

  // Attendance records from localStorage
  const [records, setRecords] = useState(loadRecords)

  // Detection UI state
  const [faceDetected, setFaceDetected] = useState(false)
  const [faceCount, setFaceCount] = useState(0)
  const [fps, setFps] = useState(0)
  const [latency, setLatency] = useState('0ms')
  
  // Animation frames for detection loop
  const requestRef = useRef()
  const lastFrameTime = useRef(performance.now())

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

  // Core detection and drawing loop
  const detectAndDraw = useCallback(async () => {
    if (!isStreaming || modelStatus !== 'ready' || !videoRef.current || !canvasRef.current) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      return
    }

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Only configure canvas size if video is actually ready and has dimensions
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      // Match canvas size to video aspect
      if (canvas.width !== video.clientWidth || canvas.height !== video.clientHeight) {
         canvas.width = video.clientWidth
         canvas.height = video.clientHeight
      }

      // Calculate latency
      const startTime = performance.now()
      
      // Run inference
      const predictions = await detectFaces(video)
      
      const endTime = performance.now()
      setLatency(`${Math.round(endTime - startTime)}ms`)

      // Calculate FPS
      const currentFrameTime = performance.now()
      const timeDiff = currentFrameTime - lastFrameTime.current
      if (timeDiff > 0) {
        setFps(Math.round(1000 / timeDiff))
      }
      lastFrameTime.current = currentFrameTime

      // Update basic state
      setFaceCount(predictions.length)
      setFaceDetected(predictions.length > 0)

      // Clear previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (predictions.length > 0) {
        // Calculate scale since video presentation size differs from actual intrinsic size
        const scaleX = canvas.width / video.videoWidth
        const scaleY = canvas.height / video.videoHeight

        predictions.forEach(prediction => {
          // BlazeFace returns [topLeft, bottomRight]
          const [start, end] = prediction.topLeft && prediction.bottomRight 
            ? [prediction.topLeft, prediction.bottomRight]
            : [prediction.box.startPoint, prediction.box.endPoint]

          // The video layout uses transform: scaleX(-1) (mirrored), but coordinates from BlazeFace 
          // consider the original pixel data. We must flip X coordinates visually on canvas to match
          // the mirrored video element. Let's flip everything horizontally.
          
          const rawWidth = end[0] - start[0]
          const rawHeight = end[1] - start[1]
          
          const boxWidth = rawWidth * scaleX
          const boxHeight = rawHeight * scaleY
          const rawX = start[0] * scaleX
          const y = start[1] * scaleY

          // Mirror X
          const x = canvas.width - rawX - boxWidth

          // Draw bounding box only
          ctx.strokeStyle = '#10b981' // Success Green
          ctx.lineWidth = 3
          ctx.strokeRect(x, y, boxWidth, boxHeight)
        })
      }
    }

    // Schedule next frame
    requestRef.current = requestAnimationFrame(detectAndDraw)
  }, [isStreaming, modelStatus, detectFaces])

  // Start the drawing loop whenever stream and model are ready
  useEffect(() => {
    if (isStreaming && modelStatus === 'ready') {
      requestRef.current = requestAnimationFrame(detectAndDraw)
    } else {
      // Clear canvas and cancel if stream stops
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
      setFaceCount(0)
      setFaceDetected(false)
      setFps(0)
      setLatency('0ms')
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isStreaming, modelStatus, detectAndDraw])

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col">
      <Header />

      {/* Model Loading Overlay */}
      <ModelLoadingOverlay
        progress={loadProgress}
        statusText={loadProgress < 50 ? "Initializing WebGL Backend" : "Loading Face Detection Model"}
        isVisible={modelStatus === 'loading'}
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
              canvasRef={canvasRef}
              error={webcamError}
            />
          </div>

          {/* Right Section: Sidebar (1/3) */}
          <div className="flex flex-col gap-6">
            <ModelStatus
              status={modelStatus}
              backend={backend || 'WebGL'}
              onRetry={retryLoad}
              onSwitchBackend={switchBackend}
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
