import { useState } from 'react'

export default function AuthCard({ mode, setMode, onLogin, onRegister, busy }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    
    if (!email.trim() || !password.trim()) {
      return
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        return
      }
      onRegister(email.trim(), password)
    } else {
      onLogin(email.trim(), password)
    }
  }

  function resetForm() {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  function switchMode(newMode) {
    setMode(newMode)
    resetForm()
  }

  const isLogin = mode === 'login'
  const canSubmit = email.trim() && password.trim() && 
    (isLogin || password === confirmPassword)

  return (
    <div className="relative">
      {/* Enhanced card with better depth and contrast */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-slate-100/30 dark:from-slate-800/50 dark:via-transparent dark:to-slate-900/30 rounded-3xl"></div>
        
        <div className="relative z-10">
          {/* Mode toggle with enhanced styling */}
          <div className="flex mb-8 bg-slate-100/80 dark:bg-slate-700/50 rounded-2xl p-1.5 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode('register')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field with enhanced styling */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-50/80 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                  disabled={busy}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-slate-400 text-sm">📧</span>
                </div>
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-50/80 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 backdrop-blur-sm"
                  placeholder="Enter your password"
                  required
                  disabled={busy}
                  minLength={6}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-slate-400 text-sm">🔒</span>
                </div>
              </div>
            </div>

            {/* Confirm password field (register only) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50/80 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 backdrop-blur-sm"
                    placeholder="Confirm your password"
                    required
                    disabled={busy}
                    minLength={6}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-slate-400 text-sm">
                      {password && confirmPassword && password === confirmPassword ? '✅' : '🔒'}
                    </span>
                  </div>
                </div>
                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-sm text-red-500 dark:text-red-400">
                    Passwords don't match
                  </p>
                )}
              </div>
            )}

            {/* Submit button with enhanced styling */}
            <button
              type="submit"
              disabled={busy || !canSubmit}
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-indigo-600/20 rounded-xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="relative z-10 flex items-center justify-center">
                {busy ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <span className="ml-2">→</span>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Additional info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => switchMode(isLogin ? 'register' : 'login')}
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200"
                disabled={busy}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}