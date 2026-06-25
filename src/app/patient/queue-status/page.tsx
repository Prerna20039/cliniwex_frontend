'use client'

import { useState, useEffect } from 'react'
import { StatusBadge } from '@/src/app/components/common/status-badge'

interface QueueStatusResponse {
  tokenNumber: number
  currentToken: number
  position: number
  estimatedWaitingTime: string
  status: string
}

export default function QueueStatusPage() {
  const [queue, setQueue] = useState<QueueStatusResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getAppointmentId = () => localStorage.getItem('appointmentId') || '1'

  const fetchQueueStatus = async () => {
    const appointmentId = getAppointmentId()
    const res = await fetch(`http://localhost:8080/api/queue/status?appointmentId=${appointmentId}`)
    if (!res.ok) throw new Error('Failed to fetch queue status')
    return res.json()
  }

  useEffect(() => {
    const loadQueue = async () => {
      try {
        setIsLoading(true)
        const data = await fetchQueueStatus()
        setQueue(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load queue')
      } finally {
        setIsLoading(false)
      }
    }

    loadQueue()

    // Poll every 10 seconds
    const interval = setInterval(async () => {
      try {
        const data = await fetchQueueStatus()
        setQueue(data)
      } catch (err) {
        console.error('Queue refresh failed:', err)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error || !queue) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <p className="text-red-500">{error || 'Failed to load queue'}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    )
  }

  // Map API response to display values
  const displayData = {
    yourToken: queue.tokenNumber,
    currentToken: queue.currentToken,
    patientsAhead: queue.position,
    estimatedWait: queue.estimatedWaitingTime,
    status: queue.status.toLowerCase() as 'waiting' | 'in-progress' | 'done',
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-6">
          Queue Status
        </h1>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <p className="text-muted-foreground text-sm">
              Your Token
            </p>
            <p className="text-4xl font-bold mt-1">
              #{displayData.yourToken}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-muted-foreground text-sm">
              Current Token
            </p>
            <p className="text-4xl font-bold mt-1">
              #{displayData.currentToken}
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <p className="text-muted-foreground text-sm">
            Patients Ahead
          </p>
          <p className="text-3xl font-bold mt-1">
            {displayData.patientsAhead}
          </p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <p className="text-muted-foreground text-sm">
            Estimated Wait Time
          </p>
          <p className="text-3xl font-bold mt-1">
            {displayData.estimatedWait}
          </p>
        </div>

        <StatusBadge status={displayData.status} />
      </div>
    </div>
  )
}