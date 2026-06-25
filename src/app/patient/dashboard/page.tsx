'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/src/app/components/ui/button'
import { StatCard } from '@/src/app/components/common/stats-card'
import { StatusBadge } from '@/src/app/components/common/status-badge'
import { useRouter } from 'next/navigation'
import AgentBot from '@/src/app/components/common/chatbot'
import FloatingAIChat from '@/src/app/components/common/floatingchatbot'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'


type AppointmentStatus =
  'pending' | 'confirmed' | 'completed' | 'cancelled' | 'in-progress' | 'waiting'

interface StatsResponse {
  yourToken: number
  currentToken: number
  patientsAhead: number
  estimatedWaitMinutes: number
}

interface Appointment {
  id: number
  doctor: string
  date: string
  time: string
  status: AppointmentStatus
  type: string
}

const statsConfig = [
  { key: 'yourToken' as const, label: 'Your Token', description: 'Today', icon: '🎟️', prefix: '#' },
  { key: 'currentToken' as const, label: 'Current Token', description: 'Now Serving', icon: '👨‍⚕️', prefix: '#' },
  { key: 'patientsAhead' as const, label: 'Patients Ahead', description: 'In Queue', icon: '👥', prefix: '' },
  { key: 'estimatedWaitMinutes' as const, label: 'Estimated Wait', description: 'Approximate', icon: '⏱️', suffix: ' mins' },
]



const BASE_URL = 'https://cliniwexbackend-production.up.railway.app'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}



export default function PatientDashboard() {
  const [patientName, setPatientName] = useState<string>('Patient')
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const getPatientId = () => localStorage.getItem('patientId')

  const fetchStats = async (): Promise<StatsResponse> => {
  const patientId = getPatientId()

  try {
    const res = await fetch(
      `${BASE_URL}/api/patient/stats?patientId=${patientId}`,
      { headers: getAuthHeaders() }
    )

    if (!res.ok) {
      console.warn('Stats API failed, showing default values')

      return {
        yourToken: 0,
        currentToken: 0,
        patientsAhead: 0,
        estimatedWaitMinutes: 0,
      }
    }

    const data = await res.json()

    return {
      yourToken: data?.yourToken ?? 0,
      currentToken: data?.currentToken ?? 0,
      patientsAhead: data?.patientsAhead ?? 0,
      estimatedWaitMinutes: data?.estimatedWaitMinutes ?? 0,
    }
  } catch (error) {
    console.error('Stats fetch failed:', error)

    return {
      yourToken: 0,
      currentToken: 0,
      patientsAhead: 0,
      estimatedWaitMinutes: 0,
    }
  }
}



  const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/appointments/my`, {
      headers: getAuthHeaders(),
    })

    if (!res.ok) return []

    const data = await res.json()

    return (data || []).map((a: any) => ({
      id: a.appointmentId,
      doctor: `Doctor ${a.doctorId}`, // temporary until backend sends name
      date: a.appointmentDate,
      time: a.appointmentTime,
      status: a.status.toLowerCase(),
      type: 'Consultation',
    }))
  } catch (err) {
    console.error('Appointments fetch failed:', err)
    return []
  }
}

useEffect(() => {
  const loadDashboard = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const storedName = localStorage.getItem('patientName')
      if (storedName) setPatientName(storedName)

      const statsData = await fetchStats()
      const aptData = await fetchAppointments()

      setStats(statsData)
      setAppointments(aptData)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load dashboard'
      )
    } finally {
      setIsLoading(false)
    }
  }

  loadDashboard()
}, [])

useEffect(() => {

  const patientId = localStorage.getItem('patientId')

  if (!patientId) return

  const client = new Client({
    webSocketFactory: () =>
      new SockJS(
        'https://cliniwexbackend-production.up.railway.app/ws'
      ),

    reconnectDelay: 5000,
  })

  client.onConnect = () => {

    console.log('WebSocket Connected')

    client.subscribe(
      `/topic/stats/${patientId}`,
      (message) => {

        const updatedStats: StatsResponse =
          JSON.parse(message.body)

        setStats(updatedStats)

        console.log(
          'Stats Updated',
          updatedStats
        )
      }
    )
  }

  client.onStompError = (frame) => {
    console.error('STOMP Error', frame)
  }

  client.onWebSocketError = (error) => {
    console.error('WebSocket Error', error)
  }

  client.activate()

  return () => {
    client.deactivate()
  }

}, [])

  const currentTime = new Date().toLocaleTimeString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

  const handleJoinQueue = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/appointments/book`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        doctorId: 1,
        appointmentDate: new Date().toISOString().split('T')[0], // today
        appointmentTime: currentTime,
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || 'Failed to book appointment')
    }

    const result = await res.json()

    alert(`Appointment booked successfully!`)
    console.log('Booked:', result)

    window.location.reload()
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Booking failed')
  }
}

  const statCards = stats
    ? statsConfig.map((config) => ({
        icon: config.icon,
        label: config.label,
        value: `${config.prefix || ''}${stats[config.key]}${config.suffix || ''}`,
        description: config.description,
      }))
    : []

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 text-center">
        <p className="text-red-500">{error || 'Failed to load data'}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">

      {/* Hero */}
      <div className="rounded-3xl bg-primary text-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome, {patientName} 
        </h1>

        <div className="mt-6 flex flex-wrap gap-6">
          <div>
            <p className="text-sm text-white/70">Your Token</p>
            <p className="text-3xl font-bold">#{stats.yourToken}</p>
          </div>

          <div>
            <p className="text-sm text-white/70">Now Serving</p>
            <p className="text-3xl font-bold">#{stats.currentToken}</p>
          </div>

          <div>
            <p className="text-sm text-white/70">Wait Time</p>
            <p className="text-3xl font-bold">
              {stats.estimatedWaitMinutes} mins
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
  <Link href="/patient/queue-status">
    <Button variant="secondary">
      View Live Queue
    </Button>
  </Link>

  <Link href="/patient/profile">
    <Button
      variant="outline"
      className="bg-white text-primary hover:bg-gray-100"
    >
      Edit Profile
    </Button>
  </Link>
</div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Appointments */}
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Today's Appointment</h2>

        {appointments.length > 0 ? (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className="border rounded-xl p-4 flex justify-between"
            >
              <div>
                <p className="font-semibold">{apt.doctor}</p>
                <p className="text-sm text-muted-foreground">
                  {apt.date} • {apt.time}
                </p>
              </div>
              <StatusBadge status={apt.status} />
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No appointments today</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-3">
        <Button onClick={handleJoinQueue}>Join Queue</Button>
      </div>
      <FloatingAIChat />
    </div>
  )
}