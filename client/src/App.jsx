import { useState, useEffect } from 'react'
import AuthPage from './pages/AuthPage'
import TasksPage from './pages/TasksPage'
import ConnectionStatus from './components/ConnectionStatus'
import { authModel } from './models/auth'
import { login, register, logout } from './controllers/authController'
import { tasksController } from './controllers/tasksController'

export default function App() {
  const [authed, setAuthed] = useState(authModel.isAuthed())
  const [user, setUser] = useState(authModel.getUser())

  // Initialize dark mode on app load
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedDarkMode === 'true' || (!savedDarkMode && prefersDark)) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  function handleLogout() {
    logout()
    setAuthed(false)
    setUser(null)
  }

  function handleAuthed() {
    setAuthed(true)
    setUser(authModel.getUser())
  }

  if (!authed) {
    return (
      <>
        <AuthPage onAuthed={handleAuthed} register={register} login={login} />
        <ConnectionStatus />
      </>
    )
  }

  return (
    <>
      <TasksPage tasksApi={tasksController} onLogout={handleLogout} user={user} />
      <ConnectionStatus />
    </>
  )
}
