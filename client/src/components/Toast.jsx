import { useEffect } from 'react'

export default function Toast({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success' 
    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-400/50' 
    : 'bg-gradient-to-r from-red-500 to-red-600 border-red-400/50'

  const icon = type === 'success' ? '✅' : '❌'

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
      <div className={`${bgColor} text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl border backdrop-blur-sm max-w-sm`}>
        <div className="flex items-center gap-3">
          <span className="text-lg flex-shrink-0">{icon}</span>
          <p className="text-sm sm:text-base font-medium flex-1">{message}</p>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors duration-200 touch-target flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}