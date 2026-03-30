export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/5 flex justify-between items-center px-8 w-full py-3">
      <div className="flex items-center gap-6">
        <span className="text-[12px] font-medium tracking-wide uppercase text-on-surface-variant">
          503073 - Smart Attendance
        </span>
        <div className="h-4 w-[1px] bg-white/10" />
        <div className="flex gap-4">
          <span className="text-[12px] font-medium tracking-wide uppercase text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            TensorFlow.js
          </span>
          <span className="text-[12px] font-medium tracking-wide uppercase text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            Client-side ML
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
        <span className="text-[12px] font-medium tracking-wide uppercase text-secondary">
          System Secure
        </span>
      </div>
    </footer>
  )
}
