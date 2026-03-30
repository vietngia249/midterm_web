import { useWebcam } from '../hooks/useWebcam'

/**
 * WebcamView — displays the live webcam feed with start/stop controls.
 * Shows error messages for permission or hardware issues.
 */
export default function WebcamView() {
  const { videoRef, isStreaming, error, startCamera, stopCamera } = useWebcam()

  return (
    <div className="glass rounded-2xl overflow-hidden animate-fade-in">
      {/* Video Container */}
      <div className="relative bg-black/50 aspect-video flex items-center justify-center">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${isStreaming ? 'block' : 'hidden'}`}
          autoPlay
          playsInline
          muted
          style={{ transform: 'scaleX(-1)' }}
        />

        {/* Placeholder when camera is off */}
        {!isStreaming && !error && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-bg-card flex items-center justify-center">
              <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <div>
              <p className="text-text-secondary font-medium">Camera is off</p>
              <p className="text-text-muted text-sm mt-1">Click the button below to start</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center gap-4 py-16 text-center px-6">
            <div className="w-20 h-20 rounded-full bg-danger/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <div>
              <p className="text-danger font-medium">Camera Error</p>
              <p className="text-text-muted text-sm mt-1 max-w-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Streaming indicator */}
        {isStreaming && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
            <span className="text-xs font-medium text-white">LIVE</span>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 flex justify-center">
        {!isStreaming ? (
          <button
            id="btn-start-camera"
            onClick={startCamera}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-medium transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-primary/25"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            Start Camera
          </button>
        ) : (
          <button
            id="btn-stop-camera"
            onClick={stopCamera}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-danger hover:bg-red-500 text-white font-medium transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-danger/25"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
            </svg>
            Stop Camera
          </button>
        )}
      </div>
    </div>
  )
}
