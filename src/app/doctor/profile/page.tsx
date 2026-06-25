'use client'

import { useState } from 'react'
import DoctorSidebar from '@/src/app/components/doctor/sidebar'
import { Button } from '@/src/app/components/ui/button'

interface DoctorProfileData {
  name: string
  phoneNumber: string
  specialization: string

  qualification: string
  experienceYears: number | string
  consultationFee: number | string

  clinicName: string
  clinicAddress: string
  workingHours: string
  bio: string
}

const BASE_URL = 'https://cliniwexbackend-production.up.railway.app'

export default function DoctorProfilePage() {
  const [profile, setProfile] = useState<DoctorProfileData>({
    name: '',
    phoneNumber: '',
    specialization: '',

    qualification: '',
    experienceYears: '',
    consultationFee: '',

    clinicName: '',
    clinicAddress: '',
    workingHours: '',
    bio: '',
  })

  const [saving, setSaving] = useState(false)

  const getDoctorEmail = () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('doctorEmail')
  }

  const saveProfile = async () => {
    const email = getDoctorEmail()

    if (!email) {
      alert('Doctor email not found. Please login again.')
      return
    }

    if (!profile.name.trim()) {
      alert('Doctor Name is required')
      return
    }

    if (!profile.phoneNumber.trim()) {
      alert('Phone Number is required')
      return
    }

    if (profile.phoneNumber.length !== 10) {
      alert('Phone Number must be exactly 10 digits')
      return
    }

    if (!profile.specialization.trim()) {
      alert('Specialization is required')
      return
    }

    if (!profile.qualification.trim()) {
      alert('Qualification is required')
      return
    }

    if (!profile.clinicName.trim()) {
      alert('Clinic Name is required')
      return
    }

    if (!profile.clinicAddress.trim()) {
      alert('Clinic Address is required')
      return
    }

    try {
      setSaving(true)

      const response = await fetch(
        `${BASE_URL}/api/doctors/profile/email/${email}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: profile.name,
            phoneNumber: profile.phoneNumber,
            specialization: profile.specialization,

            qualification: profile.qualification,
            experienceYears: Number(profile.experienceYears || 0),
            consultationFee: Number(profile.consultationFee || 0),

            clinicName: profile.clinicName,
            clinicAddress: profile.clinicAddress,
            workingHours: profile.workingHours,
            bio: profile.bio,
          }),
        }
      )

      const result = await response.text()

      console.log('SAVE RESPONSE:', result)

      if (!response.ok) {
        console.error(result)
        alert(`Failed to save profile\n${result}`)
        return
      }

      alert('Profile saved successfully')
    } catch (error) {
      console.error(error)
      alert('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if (
      (name === 'experienceYears' ||
        name === 'consultationFee') &&
      value !== '' &&
      !/^\d*$/.test(value)
    ) {
      return
    }

    if (
      name === 'phoneNumber' &&
      value !== '' &&
      !/^\d*$/.test(value)
    ) {
      return
    }

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DoctorSidebar />

      <main className="flex-1 ml-64 p-6">
        <div className="max-w-5xl mx-auto">

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              Doctor Profile
            </h1>

            <Button
              onClick={saveProfile}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">

            <h2 className="font-semibold mb-6 text-lg">
              Doctor Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <Input
                label="Doctor Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter Doctor Name"
              />

              <Input
                label="Phone Number"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                maxLength={10}
                placeholder="Enter 10 digit phone number"
              />

              <Input
                label="Specialization"
                name="specialization"
                value={profile.specialization}
                onChange={handleChange}
                placeholder="Enter Specialization"
              />

              <Input
                label="Qualification"
                name="qualification"
                value={profile.qualification}
                onChange={handleChange}
                placeholder="MBBS, MD, etc."
              />

              <Input
                label="Experience (Years)"
                name="experienceYears"
                value={profile.experienceYears}
                onChange={handleChange}
                type="number"
                placeholder="Years of experience"
              />

              <Input
                label="Consultation Fee"
                name="consultationFee"
                value={profile.consultationFee}
                onChange={handleChange}
                type="number"
                placeholder="Consultation Fee"
              />

              <Input
                label="Clinic Name"
                name="clinicName"
                value={profile.clinicName}
                onChange={handleChange}
                placeholder="Clinic Name"
              />

              <Input
                label="Clinic Address"
                name="clinicAddress"
                value={profile.clinicAddress}
                onChange={handleChange}
                placeholder="Clinic Address"
              />

              <Input
                label="Working Hours"
                name="workingHours"
                value={profile.workingHours}
                onChange={handleChange}
                placeholder="9 AM - 5 PM"
              />

              <div className="md:col-span-2">
                <label className="text-sm text-gray-500 block mb-2">
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border rounded-lg p-3"
                  placeholder="Write about yourself..."
                />
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

function Input({
  label,
  ...props
}: {
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm text-gray-500 block mb-1">
        {label}
      </label>

      <input
        {...props}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}