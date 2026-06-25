'use client'

import { useEffect, useState } from 'react'
import DoctorSidebar from '@/src/app/components/doctor/sidebar'
import { StatCard } from '@/src/app/components/doctor/stat-card'

interface AnalyticsData {
  totalAppointments: number
  pendingAppointments: number
  acceptedAppointments: number
  completedAppointments: number
  cancelledAppointments: number
  waitingPatients: number
  inProgressPatients: number
  completedConsultations: number
  totalQueueEntries: number
}

export default function DoctorAnalytics() {

  const [data, setData] =
    useState<AnalyticsData | null>(null)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {

      const res = await fetch(
        'https://cliniwexbackend-production.up.railway.app/api/doctors/analytics'
      )

      const analytics = await res.json()

      setData(analytics)

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      <DoctorSidebar />

      <div className="flex-1 ml-64 p-6">

        <h1 className="text-3xl font-bold mb-2">
          Analytics Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Queue & Appointment Insights
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard
            icon="📅"
            label="Appointments"
            value={data?.totalAppointments || 0}
            description="Total Bookings"
          />

          <StatCard
            icon="⏳"
            label="Waiting"
            value={data?.waitingPatients || 0}
            description="Patients in Queue"
          />

          <StatCard
            icon="🩺"
            label="In Progress"
            value={data?.inProgressPatients || 0}
            description="Consultation Running"
          />

          <StatCard
            icon="✅"
            label="Completed"
            value={data?.completedConsultations || 0}
            description="Consultations Done"
          />

        </div>

        <div className="mt-8 bg-white rounded-xl border p-6">

          <h2 className="font-bold text-xl mb-6">
            Appointment Status
          </h2>

          <div className="space-y-4">

            <div>
              Pending: {data?.pendingAppointments || 0}
            </div>

            <div>
              Accepted: {data?.acceptedAppointments || 0}
            </div>

            <div>
              Completed: {data?.completedAppointments || 0}
            </div>

            <div>
              Cancelled: {data?.cancelledAppointments || 0}
            </div>

          </div>

        </div>

        <div className="mt-8 bg-white rounded-xl border p-6">

          <h2 className="font-bold text-xl mb-6">
            Queue Statistics
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div>
              Total Queue Entries
              <p className="text-2xl font-bold">
                {data?.totalQueueEntries || 0}
              </p>
            </div>

            <div>
              Active Queue
              <p className="text-2xl font-bold">
                {(data?.waitingPatients || 0)
                  + (data?.inProgressPatients || 0)}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}