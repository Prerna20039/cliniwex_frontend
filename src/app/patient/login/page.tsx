'use client'

import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Button } from '@/src/app/components/ui/button'

export default function PatientLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    setIsLoading(true)

    const { data } = await axios.post('https://cliniwexbackend-production.up.railway.app/api/patient/login', {
      email,
      password,
    })

    console.log(data)

    // Store the JWT token!
    localStorage.setItem('token', data.token)
    localStorage.setItem('patientName', data.name)
    localStorage.setItem('patientEmail', data.email)
    localStorage.setItem('patientId', data.patientId.toString())

    // Optional: Store token expiry time
    const expiryTime = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    localStorage.setItem('tokenExpiry', expiryTime.toString())

    window.location.href = '/patient/dashboard'
  } catch (error: any) {
    console.error(error.response?.data?.message)
    alert(error.response?.data?.message || 'Something went wrong')
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border shadow-sm p-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-bold text-xl text-foreground">Clinivex</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">Patient Login</h1>
          <p className="text-muted-foreground mb-6">Sign in to access your appointments and health records</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.com"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/patient/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-4">
            <Link href="/" className="text-center block text-sm text-primary hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
