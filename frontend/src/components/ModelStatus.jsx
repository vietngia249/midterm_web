/**
 * ModelStatus - displays ML model loading/ready state.
 * Props: status ('loading' | 'ready' | 'error'), backend (string), onRetry (function)
 */
export default function ModelStatus({ status = 'ready', backend = 'WebGL', onRetry, onSwitchBackend }) {
  return (
    <div className="p-6 rounded-2xl bg-surface-container-high transition-all hover:bg-surface-container-highest group">
      <div className="flex justify-between items-start mb-4">
        <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z"/>
        </svg>
        <div className={`px-3 py-1 rounded-full border ${
          status === 'ready'
            ? 'bg-secondary/10 border-secondary/30'
            : status === 'error'
            ? 'bg-error/10 border-error/30'
            : 'bg-primary/10 border-primary/30'
        }`}>
          <span className={`text-[10px] font-extrabold uppercase tracking-widest ${
            status === 'ready'
              ? 'text-secondary'
              : status === 'error'
              ? 'text-error'
              : 'text-primary'
          }`}>
            {status === 'ready' ? 'Active' : status === 'error' ? 'Error' : 'Loading'}
          </span>
        </div>
      </div>
      <h3 className="text-on-surface font-bold text-lg mb-1">Model Status</h3>
      <p className="text-on-surface-variant text-sm mb-4">
        {status === 'ready'
          ? 'Inference engine running via TensorFlow.js.'
          : status === 'error'
          ? 'Model failed to initialize. Please retry.'
          : 'Loading face detection model...'}
      </p>
      
      <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-outline-variant/30">
        <div className="flex items-center gap-2">
          {status === 'ready' && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span className="text-secondary font-medium text-xs">
                Model ready
              </span>
            </>
          )}
          {status === 'error' && (
            <button
              onClick={onRetry}
              className="text-error font-medium text-xs hover:underline cursor-pointer"
            >
              Click to retry
            </button>
          )}
          {status === 'loading' && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-medium text-xs">
                Initializing...
              </span>
            </>
          )}
        </div>

        {onSwitchBackend && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-on-surface-variant">Backend:</span>
            <select 
              value={backend.toLowerCase()}
              onChange={(e) => onSwitchBackend(e.target.value)}
              disabled={status === 'loading'}
              className="bg-surface text-on-surface text-xs border border-outline-variant rounded px-2 py-1 focus:outline-none focus:border-primary disabled:opacity-50"
            >
              <option value="webgl">WebGL</option>
              <option value="wasm">WASM</option>
              <option value="cpu">CPU</option>
            </select>
          </div>
        )}
      </div>
    </div>
  )
}
