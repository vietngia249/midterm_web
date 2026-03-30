/**
 * ModelLoadingOverlay - full-screen overlay shown while ML model loads.
 * Props: progress (number 0-100), statusText (string), isVisible (bool)
 */
export default function ModelLoadingOverlay({ progress = 0, statusText = 'Optimizing WebGL Shaders', isVisible = true }) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] bg-surface-container-lowest/40 backdrop-blur-2xl flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-surface-bright/30 backdrop-blur-md border border-white/10 rounded-xl p-12 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.6)] flex flex-col items-center text-center">
        {/* Spinner Container */}
        <div className="relative w-32 h-32 mb-10">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-on-surface-variant/10" />
          {/* Animated Progress Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary/40 animate-spin-custom" />
          {/* Icon Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 11.75a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zm6 0a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>
        </div>

        {/* Text Labels */}
        <h2 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">
          System Initializing
        </h2>
        <p className="text-on-surface-variant text-sm mb-12">
          Loading face detection model...
        </p>

        {/* Progress Bar Section */}
        <div className="w-full space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-[11px] font-medium uppercase tracking-widest text-secondary">
              Neural Engine
            </span>
            <span className="text-lg font-bold text-on-surface tabular-nums">
              {progress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_15px_rgba(192,193,255,0.4)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="pt-4 flex items-center justify-center gap-2 opacity-60">
            <div className="w-1 h-1 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-medium">
              {statusText}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
