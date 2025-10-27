import { api } from '../services/api'
import { authModel } from '../models/auth'

export async function register(email, password) {
  await api.register(email, password)
}

export async function login(email, password) {
  const { token, user } = await api.login(email, password)
  authModel.setToken(token)
  authModel.setUser(user)
  return { token, user }
}

export function logout() { authModel.clear() }
