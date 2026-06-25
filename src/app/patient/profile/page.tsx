'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/src/app/components/ui/button'


interface ProfileData {
  patientId: number
  name: string
  email: string
  phone: string
  age: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  

  const getPatientId = () => localStorage.getItem('patientId') || '1'

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const patientId = getPatientId()
        const res = await fetch(`https://cliniwexbackend-production.up.railway.app/api/patient/profile?patientId=${patientId}`)
        if (!res.ok) throw new Error('Failed to fetch profile')
        const data = await res.json()
        setProfile(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (field: keyof ProfileData, value: string) => {
    if (!profile) return
    setProfile({ ...profile, [field]: field === 'age' ? parseInt(value) || 0 : value })
  }

  const handleSave = async () => {
    if (!profile) return

    try {
      setIsSaving(true)
      setError(null)
      setSuccess(null)

      const patientId = getPatientId()
      const res = await fetch(`https://cliniwexbackend-production.up.railway.app/api/patient/profile?patientId=${patientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          age: profile.age,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to update profile')
      }

      const updated = await res.json()
      setProfile(updated)
      setSuccess('Profile updated successfully!')

      // Update localStorage name if changed
      localStorage.setItem('patientName', updated.name)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <p className="text-red-500">{error || 'Failed to load profile'}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">
          My Profile
        </h1>

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted-foreground mb-1">Name</label>
            <input
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">Phone</label>
            <input
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-1">Age</label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="w-full border p-3 rounded-lg"
            />
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          className="mt-6"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  )
}