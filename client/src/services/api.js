const BASE_URL = 'https://mentora-ai-production-6560.up.railway.app'

// Get token from localStorage
const getToken = () => localStorage.getItem('mentora_token')

// Auth APIs
export const signup = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  return res.json()
}

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (data.success) {
    localStorage.setItem('mentora_token', data.session.access_token)
    localStorage.setItem('mentora_user', JSON.stringify(data.user))
  }
  return data
}

export const logout = async () => {
  await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  localStorage.removeItem('mentora_token')
  localStorage.removeItem('mentora_user')
}

// Tool APIs
export const summarizeNotes = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${BASE_URL}/api/summarize`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getToken()}` },
    body: formData
  })
  return res.json()
}

export const solveDoubt = async (question, subject) => {
  const res = await fetch(`${BASE_URL}/api/doubt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ question, subject })
  })
  return res.json()
}

export const helpAssignment = async (assignment, subject, deadline) => {
  const res = await fetch(`${BASE_URL}/api/assignment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ assignment, subject, deadline })
  })
  return res.json()
}

export const manageTimetable = async (classes) => {
  const res = await fetch(`${BASE_URL}/api/timetable`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ classes })
  })
  return res.json()
}

export const getUser = () => {
  const user = localStorage.getItem('mentora_user')
  return user ? JSON.parse(user) : null
}

export const isLoggedIn = () => !!getToken()