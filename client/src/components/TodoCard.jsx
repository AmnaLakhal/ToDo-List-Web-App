import { useState } from 'react'

export default function TodoCard({ item, onToggle, onDelete, onRename }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(item.title)

  async function handleSave() {
    if (editTitle.trim() && editTitle !== item.title) {
      await onRename(item.id, editTitle.trim())
    }
    setIsEditing(false)
  }

  function handleCancel() {
    setEditTitle(item.title)
    setIsEditing(false)
  }

  return (
    <div className="group relative p-4 sm:p-5 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
      {/* Enhanced completion status indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl transition-all duration-500 ${
        item.completed 
          ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/50' 
          : 'bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700'
      }`}>
        {item.completed && (
          <div className="absolute inset-0 bg-emerald-400 rounded-l-3xl animate-pulse"></div>
        )}
      </div>
      
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 ml-2">
        {/* Enhanced checkbox with better visual feedback */}
        <div className="relative touch-target flex items-center justify-center group/checkbox">
          <input 
            type="checkbox" 
            className="h-6 w-6 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg transition-all duration-200 cursor-pointer touch-manipulation hover:scale-110" 
            checked={!!item.completed} 
            onChange={(e) => {
              console.log('Checkbox clicked:', { id: item.id, completed: e.target.checked, currentCompleted: item.completed });
              onToggle(item.id, e.target.checked);
            }} 
          />
          {item.completed && (
            <>
              <div className="absolute inset-0 bg-emerald-500/20 rounded-lg blur-sm animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-emerald-600 text-sm animate-bounce">✓</span>
              </div>
            </>
          )}
          {/* Hover effect */}
          <div className="absolute inset-0 bg-indigo-500/10 rounded-lg opacity-0 group-hover/checkbox:opacity-100 transition-opacity duration-200"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="relative group">
              <input 
                className="input w-full py-3 px-4 text-base bg-white/90 dark:bg-slate-800/90 border-2 border-slate-200/80 dark:border-slate-600/80 rounded-2xl focus:bg-white dark:focus:bg-slate-800 transition-all duration-300" 
                value={editTitle} 
                onChange={(e)=>setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave()
                  if (e.key === 'Escape') handleCancel()
                }}
                autoFocus
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-emerald-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ) : (
            <div 
              className={`cursor-pointer break-words py-2 px-1 rounded-lg transition-all duration-200 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 text-responsive-sm touch-manipulation ${
                item.completed 
                  ? 'line-through text-slate-500 dark:text-slate-400 opacity-75' 
                  : 'text-slate-900 dark:text-slate-100 font-medium'
              }`}
              onDoubleClick={() => setIsEditing(true)}
              title="Double-click to edit"
            >
              {item.title}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {isEditing ? (
            <>
              <button 
                className="bg-success bg-success-hover text-white border-success touch-target relative px-3 py-2 rounded-xl transition-all duration-300 disabled:opacity-50 group overflow-hidden" 
                onClick={handleSave}
                disabled={!editTitle.trim()}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 font-semibold">✓</span>
              </button>
              <button 
                className="touch-target px-3 py-2 rounded-xl bg-slate-200/80 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-300/60 dark:border-slate-600/60 hover:bg-slate-300/80 dark:hover:bg-slate-600/80 transition-all duration-300" 
                onClick={handleCancel}
              >
                <span className="font-semibold">✕</span>
              </button>
            </>
          ) : (
            <>
              <button 
                className="touch-target px-3 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-600/60 hover:bg-slate-200/80 dark:hover:bg-slate-600/80 hover:text-slate-800 dark:hover:text-slate-100 transition-all duration-300 group" 
                onClick={() => setIsEditing(true)}
                title="Edit task"
              >
                <span className="group-hover:scale-110 transition-transform duration-200">✏️</span>
              </button>
              <button 
                className="bg-success bg-success-hover text-white border-success touch-target relative px-3 py-2 rounded-xl transition-all duration-300 group overflow-hidden" 
                onClick={()=>onDelete(item.id)}
                title="Delete task"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 group-hover:scale-110 transition-transform duration-200">🗑️</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
