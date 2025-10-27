const TOKEN_KEY = 'accessToken'
const USER_KEY = 'userInfo'

export const authModel = {
  getToken() { return localStorage.getItem(TOKEN_KEY) },
  setToken(t) { localStorage.setItem(TOKEN_KEY, t) },
  
  getUser() { 
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },
  setUser(user) { localStorage.setItem(USER_KEY, JSON.stringify(user)) },
  
  clear() { 
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
  
  isAuthed() { return !!localStorage.getItem(TOKEN_KEY) },
}
