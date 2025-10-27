// Prefer explicit env when set; otherwise use Vite dev proxy (empty baseURL).
const baseURL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : (import.meta.env.DEV ? '' : '')

async function request(path, { method = 'GET', body, token } = {}) {
  const url = (baseURL || '') + path
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    let msg = 'Request failed'
    try { const data = await res.json(); msg = data.error || msg } catch {}
    const e = new Error(msg)
    e.status = res.status
    throw e
  }
  if (res.status === 204) return null
  return res.json()
}

export const api = {
  register: (email, password) => request('/auth/register', { method: 'POST', body: { email, password } }),
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
  listTasks: (token) => request('/tasks', { token }),
  createTask: (token, title) => request('/tasks', { method: 'POST', token, body: { title } }),
  updateTask: (token, id, payload) => request(`/tasks/${id}`, { method: 'PUT', token, body: payload }),
  deleteTask: (token, id) => request(`/tasks/${id}`, { method: 'DELETE', token }),
}
