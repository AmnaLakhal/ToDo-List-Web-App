import { useState } from 'react'
import AuthCard from '../components/AuthCard'
import Toast from '../components/Toast'

export default function AuthPage({ onAuthed, register, login }) {
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState(null)
  const [mode, setMode] = useState('login') // 'login' | 'register'

  async function handleRegister(email, password) {
    try {
      setBusy(true)
      await register(email, password)
      setToast({ type: 'success', message: 'Account created! Please log in.' })
      setMode('login')
    } catch (e) {
      setToast({ type: 'error', message: e.message || 'Something went wrong' })
    } finally { setBusy(false) }
  }

  async function handleLogin(email, password) {
    try {
      setBusy(true)
      await login(email, password)
      onAuthed()
    } catch (e) { setToast({ type: 'error', message: e.message || 'Login failed' }) }
    finally { setBusy(false) }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-emerald-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Mobile-first animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary indigo orb - responsive sizing */}
        <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 sm:-top-40 sm:-right-40 bg-gradient-to-br from-indigo-400/20 to-indigo-600/30 dark:from-indigo-800/30 dark:to-indigo-900/40 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Success emerald orb - responsive sizing */}
        <div className="absolute -bottom-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 sm:-bottom-40 sm:-left-40 bg-gradient-to-br from-emerald-400/20 to-emerald-600/30 dark:from-emerald-800/30 dark:to-emerald-900/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Neutral accent orb - responsive sizing */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-slate-300/10 to-slate-400/20 dark:from-slate-600/20 dark:to-slate-700/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Additional depth layers - hidden on mobile for performance */}
        <div className="hidden sm:block absolute top-20 left-20 w-32 h-32 bg-indigo-300/20 dark:bg-indigo-700/20 rounded-full blur-2xl animate-pulse delay-300"></div>
        <div className="hidden sm:block absolute bottom-20 right-20 w-40 h-40 bg-emerald-300/20 dark:bg-emerald-700/20 rounded-full blur-2xl animate-pulse delay-700"></div>
      </div>

      {/* Mobile-first theme toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <button 
          className="touch-target bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-2 border-slate-200/80 dark:border-slate-600/80 shadow-xl hover:shadow-2xl transition-all duration-300 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" 
          onClick={()=>{
            document.documentElement.classList.toggle('dark')
            localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'))
          }}
          title="Toggle dark mode"
        >
          <span className="text-base sm:text-lg">🌙</span>
        </button>
      </div>

      {/* Mobile-first main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8 sm:p-4">
        <div className="w-full max-w-sm sm:max-w-md">
          {/* Mobile-first hero section */}
          <div className="text-center mb-8 sm:mb-10 animate-fade-in">
            <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6">
              {/* Icon background with depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-800 rounded-2xl sm:rounded-3xl shadow-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/50 to-transparent rounded-2xl sm:rounded-3xl"></div>
              <div className="relative z-10">
                <span className="text-2xl sm:text-3xl">📝</span>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-indigo-500/30 dark:bg-indigo-400/20 rounded-2xl sm:rounded-3xl blur-xl scale-110"></div>
            </div>
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 px-2">
              <span className="text-slate-900 dark:text-white">Welcome to </span>
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 dark:from-indigo-400 dark:via-indigo-500 dark:to-emerald-400 bg-clip-text text-transparent">
                TodoApp
              </span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl font-medium max-w-xs sm:max-w-md mx-auto leading-relaxed px-4">
              Organize your life, one task at a time
            </p>
            
            {/* Subtle accent line */}
            <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full mx-auto mt-3 sm:mt-4 opacity-60"></div>
          </div>

          {/* Auth card with animation */}
          <div className="animate-slide-up">
            <AuthCard mode={mode} setMode={setMode} onLogin={handleLogin} onRegister={handleRegister} busy={busy} />
          </div>

          {/* Mobile-first features section */}
          <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-3 animate-fade-in-delayed">
            <div className="group p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">⚡</div>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Fast & Simple</p>
            </div>
            <div className="group p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">🌙</div>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Dark Mode</p>
            </div>
            <div className="group p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">📱</div>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Mobile Ready</p>
            </div>
          </div>
        </div>
      </div>
      
      {toast && <Toast {...toast} onClose={()=>setToast(null)} />}
    </div>
  )
}
