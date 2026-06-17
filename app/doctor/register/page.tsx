'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function DoctorRegister() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      alert('Doctor registered successfully!')

      setFormData({
        name: '',
        email: '',
        password: '',
      })

      router.push('/doctor/login')
    } catch (error: any) {
      alert(error.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#E0F2FE] via-[#F8FAFC] to-[#CFFAFE]">

      {/* Background blur (same as login) */}
      <div className="absolute -top-20 -left-20 sm:-top-32 sm:-left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-400/30 rounded-full blur-[100px] sm:blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 sm:-bottom-32 sm:-right-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-400/30 rounded-full blur-[100px] sm:blur-[120px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6">

        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">

          {/* Card */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[32px] shadow-[0_20px_60px_rgba(37,99,235,0.15)] border border-white p-6 sm:p-8 md:p-10">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg sm:text-xl font-bold">C</span>
              </div>

              <span className="text-xl sm:text-2xl font-bold text-slate-900">
                Clinivex
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Doctor Sign Up
            </h1>

            <p className="text-sm sm:text-base text-slate-500 mb-6 sm:mb-8">
              Create your professional account
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                name="email"
                placeholder="doctor@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 sm:h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm sm:text-base text-white"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 sm:mt-8 border-t border-slate-200 pt-5 sm:pt-6">

              <p className="text-center text-sm sm:text-base text-slate-600">
                Already have an account?{' '}
                <Link
                  href="/doctor/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign in
                </Link>
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}