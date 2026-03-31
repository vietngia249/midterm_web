import { useWebcam } from '../hooks/useWebcam'

/**
 * CameraView - displays live webcam feed with detection overlay and controls.
 * Matches the Stitch dashboard design with LIVE badge, detection box, and stop button.
 */
export default function CameraView({ isStreaming, onStartCamera, onStopCamera, videoRef, canvasRef, error }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Camera Feed Container */}
      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-surface-container-lowest shadow-2xl border border-white/5">
        {/* Video Element */}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover ${isStreaming ? 'block' : 'hidden'}`}
          autoPlay
          playsInline
          muted
          style={{ transform: 'scaleX(-1)' }}
        />

        {/* Canvas for detection overlay - positioned over video */}
        <canvas
          ref={canvasRef}
          id="detection-canvas"
          className={`absolute inset-0 w-full h-full ${isStreaming ? 'block' : 'hidden'}`}
        />

        {/* Camera Off Placeholder */}
        {!isStreaming && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-full h-full rounded-lg bg-surface-container-highest/50 border border-outline-variant/10 flex items-center justify-center">
              <svg className="w-16 h-16 text-on-surface-variant/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-8">
            <svg className="w-16 h-16 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <p className="text-error font-bold text-lg">Camera Error</p>
            <p className="text-on-surface-variant text-sm text-center max-w-sm">{error}</p>
          </div>
        )}

        {/* LIVE Badge */}
        {isStreaming && (
          <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10">
            <span className="w-2 h-2 rounded-full bg-red-500 pulse-dot" />
            <span className="text-[11px] font-bold text-white uppercase tracking-widest">LIVE</span>
          </div>
        )}

        {/* Bottom metadata overlay */}
        {isStreaming && (
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-white/60 text-[10px] uppercase font-bold tracking-tighter">Current Session</p>
              <p className="text-white font-medium">Attendance Check-in</p>
            </div>
          </div>
        )}
      </div>

      {/* Camera Control Button */}
      <div className="flex justify-center">
        {!isStreaming ? (
          <button
            id="btn-start-camera"
            onClick={onStartCamera}
            className="group relative flex items-center gap-3 px-8 py-4 btn-gradient hover:scale-[1.02] active:scale-95 transition-all duration-300 rounded-xl overflow-hidden shadow-lg hover:shadow-primary/20 cursor-pointer"
          >
            <svg className="w-5 h-5 text-on-primary-container" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <span className="text-on-primary-container font-bold uppercase tracking-wider text-sm">
              Start Camera
            </span>
          </button>
        ) : (
          <button
            id="btn-stop-camera"
            onClick={onStopCamera}
            className="group relative flex items-center gap-3 px-8 py-4 bg-error-container hover:bg-error transition-all duration-300 rounded-xl overflow-hidden shadow-lg hover:shadow-error/20 cursor-pointer"
          >
            <svg className="w-5 h-5 text-on-error-container" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.194L16.5 19.25m-1.409-1.409a2.25 2.25 0 01-3.182 0l-2.909-2.909m8.25 3.848l-3.182-3.182M3.75 7.5l3.182 3.182" />
            </svg>
            <span className="text-on-error-container font-bold uppercase tracking-wider text-sm">
              Stop Camera
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
