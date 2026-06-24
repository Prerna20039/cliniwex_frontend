'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function DoctorLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const safeParseResponse = async (response: Response) => {
    const text = await response.text()

    try {
      return JSON.parse(text)
    } catch {
      return text
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email.trim())) {
      alert('Enter a valid email')
      return
    }

    // ✅ PASSWORD VALIDATION
    if (password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        'https://cliniwexbackend-production.up.railway.app/api/doctors/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      )

      const data = await safeParseResponse(response)

      console.log('LOGIN RESPONSE:', data)

      if (!response.ok) {
        const errorMessage =
          typeof data === 'string'
            ? data
            : data?.message || 'Login failed'

        throw new Error(errorMessage)
      }

      const successMessage =
        typeof data === 'string'
          ? data
          : data?.message || 'Login successful'

      // ✅ SAVE TOKEN
      if (typeof data === 'object' && data?.token) {
        localStorage.setItem('token', data.token)
      }

      // ✅ SAVE EMAIL FOR PROFILE PAGE
      localStorage.setItem('doctorEmail', email.trim())

      console.log(
        'Saved doctorEmail:',
        localStorage.getItem('doctorEmail')
      )

      alert(successMessage)

      router.push('/doctor/dashboard')
    } catch (error: any) {
      console.error(error)
      alert(error.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">

      <div className="absolute -top-20 -left-20 w-[280px] h-[280px] bg-blue-300/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-[320px] h-[320px] bg-cyan-300/20 rounded-full blur-[120px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">

        <div className="w-full max-w-sm sm:max-w-md">

          <div className="bg-white/90 backdrop-blur-xl border border-white shadow-[0_20px_60px_rgba(37,99,235,0.12)] rounded-2xl sm:rounded-[32px] p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold text-slate-900">
                Clinivex
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Doctor Sign In
            </h1>

            <p className="text-sm text-slate-500 mb-6">
              Welcome back, please login to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

            </form>

            <div className="mt-6 border-t pt-5 border-slate-200">
              <p className="text-center text-sm text-slate-600">
                Don’t have an account?{' '}
                <Link
                  href="/doctor/register"
                  className="text-blue-600 font-semibold"
                >
                  Sign Up
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}