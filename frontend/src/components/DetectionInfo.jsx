/**
 * DetectionInfo - shows real-time face detection stats (faces, fps, latency).
 * Props: faceCount (number), fps (number), latency (string)
 */
export default function DetectionInfo({ faceCount = 0, fps = 0, latency = '0ms' }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="p-4 rounded-2xl bg-surface-container-high flex flex-col items-center justify-center text-center">
        <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-tighter mb-1">
          Faces
        </span>
        <span className="text-xl font-bold text-primary tabular-nums">
          {faceCount}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-high flex flex-col items-center justify-center text-center">
        <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-tighter mb-1">
          FPS
        </span>
        <span className="text-xl font-bold text-secondary tabular-nums">
          {fps}
        </span>
      </div>
      <div className="p-4 rounded-2xl bg-surface-container-high flex flex-col items-center justify-center text-center">
        <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-tighter mb-1">
          Latency
        </span>
        <span className="text-xl font-bold text-tertiary tabular-nums">
          {latency}
        </span>
      </div>
    </div>
  )
}
