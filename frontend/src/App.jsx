function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg">
              SA
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary tracking-tight">
                Smart Attendance
              </h1>
              <p className="text-xs text-text-muted">
                Browser-based ML • TensorFlow.js
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Client-side ML
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="animate-fade-in">
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Smart Attendance System
            </h2>
            <p className="text-text-secondary max-w-md mx-auto mb-6">
              Real-time face detection powered by TensorFlow.js.
              All processing happens in your browser — no data leaves your device.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1.5 rounded-lg text-sm bg-bg-card-hover text-text-secondary border border-border">
                📷 Webcam Detection
              </span>
              <span className="px-3 py-1.5 rounded-lg text-sm bg-bg-card-hover text-text-secondary border border-border">
                🤖 TensorFlow.js
              </span>
              <span className="px-3 py-1.5 rounded-lg text-sm bg-bg-card-hover text-text-secondary border border-border">
                🔒 100% Private
              </span>
              <span className="px-3 py-1.5 rounded-lg text-sm bg-bg-card-hover text-text-secondary border border-border">
                📋 Attendance Log
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-text-muted">
          <span>503073 — Web Programming & Applications</span>
          <span>Powered by TensorFlow.js + BlazeFace</span>
        </div>
      </footer>
    </div>
  )
}

export default App
