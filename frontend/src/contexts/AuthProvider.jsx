import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { AuthContext } from './auth-context'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setUser(null)
      setLoading(false)
      return null
    }

    try {
      const response = await api.get('http://localhost:3000/auth/home', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 201 || response.status === 200) {
        setUser(response.data)
        return response.data
      }
    } catch (err) {
      console.error('Erreur vérification auth:', err)
      setUser(null)
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }

    return null
  }, [])

  const login = useCallback(async (token) => {
    localStorage.setItem('token', token)
    await checkAuth()
    navigate('/')
  }, [checkAuth, navigate])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }, [navigate])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}