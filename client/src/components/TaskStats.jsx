export default function TaskStats({ tasks }) {
  if (!tasks || tasks.length === 0) return null

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl">
      {/* Total Tasks */}
      <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl border border-indigo-200/50 dark:border-indigo-700/50 hover:scale-105 transition-all duration-300 group">
        <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300">
          {totalTasks}
        </div>
        <div className="text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300 mt-1">
          Total Tasks
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50 hover:scale-105 transition-all duration-300 group">
        <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform duration-300">
          {completedTasks}
        </div>
        <div className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300 mt-1">
          Completed
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/20 dark:to-slate-700/20 rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:scale-105 transition-all duration-300 group">
        <div className="text-2xl sm:text-3xl font-bold text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform duration-300">
          {pendingTasks}
        </div>
        <div className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
          Pending
        </div>
      </div>

      {/* Completion Rate */}
      <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50 hover:scale-105 transition-all duration-300 group">
        <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
          {completionRate}%
        </div>
        <div className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300 mt-1">
          Complete
        </div>
      </div>

      {/* Progress Bar */}
      <div className="col-span-2 sm:col-span-4 mt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
            Progress
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
            {completedTasks}/{totalTasks}
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 sm:h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${completionRate}%` }}
          >
            <div className="h-full bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}