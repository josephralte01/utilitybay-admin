'use client'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000' // Update as needed

export async function adminLogin(email: string, password: string): Promise<{ token: string }> {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error?.message || 'Login failed')
  }

  return res.json()
}

export function saveAdminToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminToken', token)
  }
}

export function getAdminToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken')
  }
  return null
}

export function clearAdminToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken')
  }
}
