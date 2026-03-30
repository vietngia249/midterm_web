import { useState } from 'react'

/**
 * CheckInForm - name input and check-in button.
 * Props: faceDetected (bool), onCheckIn (function)
 */
export default function CheckInForm({ faceDetected = false, onCheckIn }) {
  const [name, setName] = useState('')
  const canCheckIn = faceDetected && name.trim().length > 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canCheckIn) return
    onCheckIn(name.trim())
    setName('')
  }

  return (
    <div className="p-6 rounded-2xl bg-surface-container-high">
      <h3 className="text-on-surface font-bold text-lg mb-4">Identity Verification</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
            Enter your name
          </label>
          <input
            id="input-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            placeholder="e.g. John Doe"
            className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary transition-all outline-none"
          />
        </div>
        <button
          id="btn-check-in"
          type="submit"
          disabled={!canCheckIn}
          className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all cursor-pointer ${
            canCheckIn
              ? 'btn-gradient text-on-primary-container hover:scale-[1.02] active:scale-95'
              : 'bg-surface-container-highest text-outline cursor-not-allowed'
          }`}
        >
          Check In
        </button>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
          faceDetected
            ? 'bg-secondary/5 border-secondary/10'
            : 'bg-surface-container-highest/50 border-outline-variant/10'
        }`}>
          {faceDetected ? (
            <>
              <svg className="w-5 h-5 text-secondary shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <p className="text-[12px] text-secondary font-medium">Face detected - ready to check in</p>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-on-surface-variant/40 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 11.75a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zm6 0a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              <p className="text-[12px] text-on-surface-variant/60 font-medium">Start camera and detect a face to check in</p>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
