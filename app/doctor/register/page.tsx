'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const BASE_URL = 'https://cliniwexbackend-production.up.railway.app'

export default function DoctorRegister() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    phone: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // =========================
  // ✅ SINGLE CLEAN SUBMIT
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // =========================
    // VALIDATION (INSIDE FUNCTION)
    // =========================

    if (!formData.name.trim()) {
      return alert('Name is required')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return alert('Enter a valid email')
    }

    if (formData.password.length < 6) {
      return alert('Password must be at least 6 characters')
    }

    if (!formData.specialty.trim()) {
      return alert('Specialty is required')
    }

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.phone)) {
      return alert('Phone number must be exactly 10 digits')
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${BASE_URL}/api/doctors/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      // ⚠️ backend returns TEXT (important fix)
      const text = await response.text()

      if (!response.ok) {
        throw new Error(text || 'Registration failed')
      }

      // =========================
      // SAVE EMAIL (SAFE WAY)
      // =========================
      localStorage.setItem('doctorEmail', formData.email)

      alert(text || 'Doctor registered successfully!')

      router.push('/doctor/profile')

    } catch (error: any) {
      console.error(error)
      alert(error.message || 'Something went wrong')

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#E0F2FE] via-[#F8FAFC] to-[#CFFAFE]">

      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-blue-400/30 rounded-full blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-cyan-400/30 rounded-full blur-[120px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">

        <div className="w-full max-w-sm sm:max-w-md">

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-[32px] shadow-[0_20px_60px_rgba(37,99,235,0.15)] border border-white p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg font-bold">C</span>
              </div>
              <span className="text-xl font-bold text-slate-900">
                Clinivex
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Doctor Sign Up
            </h1>

            <p className="text-sm text-slate-500 mb-6">
              Create your professional account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input name="name" placeholder="Full Name"
                value={formData.name} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border" />

              <input name="email" placeholder="Email"
                value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border" />

              <input name="password" type="password" placeholder="Password"
                value={formData.password} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border" />

              <input name="specialty" placeholder="Specialty"
                value={formData.specialty} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border" />

              <input name="phone" placeholder="Phone (10 digits)"
                value={formData.phone}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9]/g, '')
                  setFormData((p) => ({ ...p, phone: v }))
                }}
                maxLength={10}
                className="w-full px-4 py-3 rounded-xl border" />

              <Button type="submit" disabled={isLoading}
                className="w-full h-11 bg-blue-600 text-white rounded-xl">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>

            </form>

            <div className="mt-6 border-t pt-5">
              <p className="text-center text-sm">
                Already have account?{' '}
                <Link href="/doctor/login" className="text-blue-600 font-semibold">
                  Sign In
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}