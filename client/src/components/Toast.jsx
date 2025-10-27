export default function Toast({ message, type='info', onClose }) {
  const bg = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-red-600' : 'bg-slate-700'
  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded text-white shadow ${bg}`}>
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button className="text-white/80" onClick={onClose}>✕</button>
      </div>
    </div>
  )
}
