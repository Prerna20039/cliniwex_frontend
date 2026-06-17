'use client'

import { Button } from '@/src/app/components/ui/button'

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">
          My Profile
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            defaultValue="John Doe"
            className="border p-3 rounded-lg"
          />

          <input
            defaultValue="john@gmail.com"
            className="border p-3 rounded-lg"
          />

          <input
            defaultValue="+94 77 1234567"
            className="border p-3 rounded-lg"
          />

          <input
            defaultValue="32"
            className="border p-3 rounded-lg"
          />
        </div>

        <Button className="mt-6">
          Save Changes
        </Button>
      </div>
    </div>
  )
}