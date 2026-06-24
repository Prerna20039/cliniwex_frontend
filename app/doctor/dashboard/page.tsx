'use client'

import { useEffect, useState } from 'react'
import DoctorSidebar from '@/components/doctor/sidebar'
import { StatCard } from '@/components/doctor/stat-card'
import { Button } from '@/components/ui/button'

const BASE_URL = "https://cliniwexbackend-production.up.railway.app"
const DOCTOR_ID = 1

export default function DoctorDashboard() {

  const [isLive, setIsLive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    acceptedAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    patientsInQueue: 0
  })

  // ================= FETCH DASHBOARD =================
  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/doctors/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const text = await res.text()

      if (!res.ok) {
        throw new Error(text || `HTTP ${res.status}`)
      }

      const data = JSON.parse(text)

      setStats(data.stats ?? data)
      if (data.isLive !== undefined) setIsLive(data.isLive)

    } catch (err: any) {
      console.error("Dashboard error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ================= TOGGLE LIVE =================
  const toggleLive = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/doctors/${DOCTOR_ID}/live`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      const text = await res.text()

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${text}`)
      }

      let data: any = {}
      try {
        data = text ? JSON.parse(text) : {}
      } catch {
        data = {}
      }

      setIsLive(data.isLive ?? !isLive)

    } catch (err: any) {
      console.error("Toggle Live Error:", err)
      setError(err.message)
    }
  }

  // ================= INIT =================
  useEffect(() => {
    fetchDashboard()
  }, [])

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading dashboard...
      </div>
    )
  }

  // ================= ERROR =================
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">

      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 shrink-0 border-r bg-card">
        <DoctorSidebar />
      </aside>

      {/* MAIN */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Doctor Dashboard
            </h1>

            <p className="text-muted-foreground text-sm">
              Manage appointments and live status
            </p>

            <div className="mt-2">
              <span className={
                isLive ? "text-green-600 font-semibold" : "text-red-500 font-semibold"
              }>
                {isLive ? "🟢 LIVE NOW" : "🔴 OFFLINE"}
              </span>
            </div>
          </div>

          <Button
            onClick={toggleLive}
            className={
              isLive
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-600 hover:bg-green-700"
            }
          >
            {isLive ? 'Go Offline' : 'Go Live'}
          </Button>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <StatCard icon="📊" label="Total Appointments" value={stats.totalAppointments} />
          <StatCard icon="⏳" label="Pending" value={stats.pendingAppointments} />
          <StatCard icon="🟢" label="Accepted" value={stats.acceptedAppointments} />
          <StatCard icon="✅" label="Completed" value={stats.completedAppointments} />
          <StatCard icon="❌" label="Cancelled" value={stats.cancelledAppointments} />
          <StatCard icon="👥" label="Patients in Queue" value={stats.patientsInQueue} />

        </div>

      </main>
    </div>
  )
}