'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { StatusBadge } from '@/src/app/components/common/status-badge'

export default function VisitHistoryPage() {
  const [visits, setVisits] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVisits()
  }, [])

  const fetchVisits = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        'https://cliniwexbackend-production.up.railway.app/appointments/my'
      )

      console.log('API Response:', response.data)
      setVisits(response.data)

    } catch (error) {
      console.error('Error fetching visits:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">
          Visit History
        </h1>

        {loading ? (
          <p>Loading visits...</p>
        ) : (
          <div className="space-y-4">
            {visits.map((visit) => (
              <div
                key={visit.appointmentId}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    Appointment #{visit.tokenNumber}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {visit.appointmentDate} • {visit.appointmentTime}
                  </p>
                </div>

                <StatusBadge status={visit.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}