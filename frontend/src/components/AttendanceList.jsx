/**
 * AttendanceList - scrollable list of check-in records.
 * Props: records (array), onClearAll (function)
 */
export default function AttendanceList({ records = [], onClearAll }) {
  // Alternate colors for avatar backgrounds
  const avatarColors = [
    { bg: 'bg-primary/10', border: 'border-primary/20', text: 'text-primary' },
    { bg: 'bg-tertiary/10', border: 'border-tertiary/20', text: 'text-tertiary' },
    { bg: 'bg-secondary/10', border: 'border-secondary/20', text: 'text-secondary' },
  ]

  const handleExportCSV = () => {
    if (records.length === 0) return

    // Create CSV header
    const headers = ['ID', 'Name', 'Date', 'Time', 'Face Count']
    
    // Create CSV rows
    const rows = records.map(r => 
      [r.id, `"${r.name}"`, r.date, r.time, r.faceCount].join(',')
    )
    
    // Combine and create blob with UTF-8 BOM for Excel compatibility
    const csvContent = [headers.join(','), ...rows].join('\n')
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    
    // Create download link
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `smart-attendance-${new Date().toISOString().slice(0, 10)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="p-6 rounded-2xl bg-surface-container-high flex flex-col max-h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-on-surface font-bold text-lg">Today's Log</h3>
        <span className="text-[10px] font-bold text-on-surface-variant uppercase bg-surface-container-highest px-2 py-1 rounded">
          {records.length} Record{records.length !== 1 ? 's' : ''}
        </span>
      </div>

      {records.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-8">
          <p className="text-on-surface-variant/60 text-sm">No records yet</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {records.map((record, index) => {
            const colorSet = avatarColors[index % avatarColors.length]
            return (
              <div key={record.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${colorSet.bg} flex items-center justify-center border ${colorSet.border}`}>
                    <svg className={`w-5 h-5 ${colorSet.text}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">{record.name}</p>
                    <p className="text-[11px] text-on-surface-variant">Authenticated via Neural Net</p>
                  </div>
                </div>
                <span className="text-[12px] font-medium text-secondary">{record.time}</span>
              </div>
            )
          })}
        </div>
      )}

      <div className="mt-6 flex gap-2">
        <button
          onClick={handleExportCSV}
          disabled={records.length === 0}
          className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
            records.length === 0 
              ? 'bg-surface-container-highest/20 text-on-surface/20 cursor-not-allowed border border-transparent' 
              : 'text-primary border border-primary/20 hover:bg-primary/10 hover:border-primary/40'
          }`}
        >
          Export CSV
        </button>
        <button
          onClick={onClearAll}
          disabled={records.length === 0}
          className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all cursor-pointer ${
            records.length === 0 
              ? 'bg-surface-container-highest/20 text-on-surface/20 cursor-not-allowed border border-transparent' 
              : 'text-on-surface-variant border border-white/10 hover:bg-error/10 hover:text-error hover:border-error/20'
          }`}
        >
          Clear All
        </button>
      </div>
    </div>
  )
}
