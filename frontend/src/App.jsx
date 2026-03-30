import WebcamView from './components/WebcamView'

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Webcam — takes 2/3 on large screens */}
          <div className="lg:col-span-2">
            <WebcamView />
          </div>

          {/* Sidebar placeholder — will hold check-in form + stats later */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6 animate-fade-in">
              <h2 className="text-lg font-semibold text-text-primary mb-3">
                📷 Camera Feed
              </h2>
              <p className="text-sm text-text-secondary">
                Start the camera to begin face detection. Your webcam feed stays
                100% in your browser — no data is uploaded anywhere.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs bg-primary/10 text-primary-light border border-primary/20">
                  TensorFlow.js
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs bg-secondary/10 text-secondary border border-secondary/20">
                  BlazeFace
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs bg-success/10 text-success border border-success/20">
                  Private
                </span>
              </div>
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
