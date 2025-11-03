import { useEffect, useState } from 'react'
import Skeleton from '../components/Skeleton'
import TodoCard from '../components/TodoCard'
import Toast from '../components/Toast'
import TaskStats from '../components/TaskStats'

export default function TasksPage({ tasksApi, onLogout, user }) {
  const [items, setItems] = useState(null)
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)

  async function refresh() {
    try {
      const list = await tasksApi.list()
      setItems(list)
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to load tasks' })
    }
  }

  useEffect(() => { refresh() }, [])

  async function addTask() {
    if (!title.trim()) return
    try {
      setLoading(true)
      await tasksApi.create(title.trim())
      setTitle('')
      setToast({ type: 'success', message: 'Task created successfully' })
      await refresh()
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to create task' })
    } finally {
      setLoading(false)
    }
  }

  async function toggle(id, completed) {
    console.log('Toggle function called:', { id, completed });
    try {
      const result = await tasksApi.toggle(id, completed);
      console.log('Toggle API result:', result);
      await refresh();
      console.log('Refresh completed');
    } catch (error) {
      console.error('Toggle error:', error);
      setToast({ type: 'error', message: 'Failed to update task' });
    }
  }

  async function remove(id) {
    try {
      await tasksApi.remove(id)
      setToast({ type: 'success', message: 'Task deleted successfully' })
      await refresh()
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to delete task' })
    }
  }

  async function rename(id, title) {
    try {
      await tasksApi.rename(id, title)
      setToast({ type: 'success', message: 'Task updated successfully' })
      await refresh()
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to update task' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Enhanced animated background for dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary indigo orb */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/10 to-indigo-600/20 dark:from-indigo-800/20 dark:to-indigo-900/30 rounded-full blur-3xl animate-pulse"></div>

        {/* Success emerald orb */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-emerald-600/20 dark:from-emerald-800/20 dark:to-emerald-900/30 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Neutral accent orb */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-slate-300/5 to-slate-400/10 dark:from-slate-600/10 dark:to-slate-700/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="mobile-container space-y-6 sm:space-y-8 py-4 sm:py-6 relative z-10">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="flex flex-col space-y-3">
            <h1 className="text-responsive-lg font-bold bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 dark:from-indigo-400 dark:via-indigo-500 dark:to-emerald-400 bg-clip-text text-transparent drop-shadow-sm">
              My Tasks
            </h1>
            {user && (
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <span className="text-sm sm:text-base font-bold text-white">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-indigo-500/30 dark:bg-indigo-400/20 rounded-2xl blur-lg scale-110 group-hover:scale-125 transition-transform duration-300"></div>
                  {/* Online indicator */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <p className="text-responsive-xs font-semibold text-slate-700 dark:text-slate-200">
                    Welcome back!
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user.email}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              className="btn touch-target flex-1 sm:flex-none bg-white/90 dark:bg-slate-700/90 border border-slate-200/80 dark:border-slate-600/80 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 backdrop-blur-sm hover:scale-105 transition-all duration-300 group"
              onClick={() => {
                document.documentElement.classList.toggle('dark')
                localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'))
              }}
              title="Toggle dark mode"
            >
              <span className="text-lg group-hover:rotate-12 transition-transform duration-300">
                {document.documentElement.classList.contains('dark') ? '☀️' : '🌙'}
              </span>
            </button>
            <button
              className="btn touch-target flex-1 sm:flex-none bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-700 dark:to-slate-800 text-white border border-slate-500/30 hover:from-slate-700 hover:to-slate-800 hover:scale-105 transition-all duration-300 group"
              onClick={onLogout}
            >
              <span className="font-semibold text-responsive-xs group-hover:translate-x-0.5 transition-transform duration-300">
                Logout
              </span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </header>

        <div className="relative p-4 sm:p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <span className="text-slate-500 dark:text-slate-400 text-lg group-focus-within:text-indigo-500 group-focus-within:scale-110 transition-all duration-200">✏️</span>
              </div>
              <input
                className="input touch-target w-full pl-12 pr-4 py-4 text-responsive-sm bg-white/95 dark:bg-slate-800/95 border border-slate-200/80 dark:border-slate-600/80 rounded-2xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 dark:focus:ring-indigo-400/20 transition-all duration-300 hover:shadow-lg"
                placeholder="What needs to be done?"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                disabled={loading}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-emerald-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              {/* Floating label effect */}
              {title && (
                <div className="absolute -top-2 left-3 px-2 bg-white dark:bg-slate-800 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  New Task
                </div>
              )}
            </div>
            <button
              className="btn bg-primary bg-primary-hover text-white border-primary touch-target relative font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden w-full sm:w-auto hover:scale-105 hover:shadow-xl"
              onClick={addTask}
              disabled={loading || !title.trim()}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-indigo-600/30 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-responsive-xs">Adding...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">➕</span>
                    <span className="text-responsive-xs group-hover:translate-x-0.5 transition-transform duration-300">Add Task</span>
                  </>
                )}
              </span>
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-2xl bg-white/20 scale-0 group-active:scale-100 transition-transform duration-150"></div>
            </button>
          </div>
        </div>

        {items === null ? (
          <div className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
            <Skeleton lines={4} />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Task Statistics */}
            {items.length > 0 && <TaskStats tasks={items} />}

            <div className="space-y-4">
              {items.map((it, index) => (
                <div
                  key={it.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TodoCard item={it} onToggle={toggle} onDelete={remove} onRename={rename} />
                </div>
              ))}
              {items.length === 0 && (
                <div className="p-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl text-center group hover:scale-105 transition-all duration-500">
                  <div className="relative inline-block mb-6">
                    <div className="text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 group-hover:scale-110 transform">📝</div>
                    <div className="absolute inset-0 text-6xl opacity-10 blur-sm group-hover:opacity-20 transition-opacity duration-300">📝</div>
                    {/* Floating particles */}
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    No tasks yet
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                    Start organizing your life by adding your first task above
                  </p>
                  {/* Subtle call-to-action */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      <span>Click the input above</span>
                      <span className="animate-bounce">↑</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    </div>
  )
}
