export default function Header() {
  return (
    <header className="bg-slate-950/60 backdrop-blur-xl flex justify-between items-center w-full px-6 py-4 z-50 sticky top-0 shadow-[0_40px_100px_-15px_rgba(6,14,32,0.4)]">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-gradient">
          Smart Attendance
        </h1>
        <p className="text-[11px] tracking-widest uppercase text-on-surface-variant font-medium">
          Browser-based ML, TensorFlow.js
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
            Client-side ML
          </span>
        </div>
      </div>
    </header>
  )
}
