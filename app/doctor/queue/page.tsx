'use client'

import { useEffect, useState } from 'react'
import DoctorSidebar from '@/components/doctor/sidebar'
import StatusBadge from '@/components/common/status-badge'
import { Button } from '@/components/ui/button'

interface QueueItem {
  queueId: number
  appointmentId: number
  tokenNumber: number
  status: 'WAITING' | 'IN_PROGRESS' | 'DONE'
  createdAt: string
}

const BASE_URL = "https://cliniwexbackend-production.up.railway.app"

export default function DoctorQueue() {
  const doctorId = 1

  const [queue, setQueue] = useState<QueueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  // ================= FETCH QUEUE =================
  const fetchQueue = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/doctors/queue?doctorId=${doctorId}&t=${Date.now()}`
      )

      const text = await res.text()

      if (!res.ok) {
        throw new Error(text || "Failed to fetch queue")
      }

      const data = JSON.parse(text)
      setQueue(data)

    } catch (err) {
      console.error('Queue fetch error', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQueue()
  }, [])

  // ================= CALL NEXT PATIENT =================
  const callNextPatient = async () => {
    try {
      setActionLoading(true)

      const res = await fetch(
        `${BASE_URL}/api/doctors/queue/call-next?doctorId=${doctorId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const text = await res.text()

      if (!res.ok) {
        throw new Error(text || "Failed to call next patient")
      }

      // small delay ensures backend updates DB before refetch
      setTimeout(() => {
        fetchQueue()
      }, 300)

    } catch (err) {
      console.error('Call next patient error', err)
    } finally {
      setActionLoading(false)
    }
  }

  // ================= COMPLETE CONSULTATION =================
  const completeConsultation = async (queueId: number) => {
    try {
      setActionLoading(true)

      const res = await fetch(
        `${BASE_URL}/api/doctors/queue/complete/${queueId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      const text = await res.text()

      if (!res.ok) {
        throw new Error(text || "Failed to complete consultation")
      }

      setTimeout(() => {
        fetchQueue()
      }, 300)

    } catch (err) {
      console.error('Complete consultation error', err)
    } finally {
      setActionLoading(false)
    }
  }

  // ================= UI =================
  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* SIDEBAR */}
      <DoctorSidebar />

      {/* MAIN */}
      <div className="flex-1 ml-64 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            Queue Management
          </h1>

          <Button
            onClick={callNextPatient}
            disabled={actionLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {actionLoading ? "Processing..." : "Call Next Patient"}
          </Button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border shadow overflow-hidden">
          <div className="overflow-auto max-h-[70vh]">

            <table className="w-full min-w-[800px]">

              <thead className="bg-blue-50 sticky top-0">
                <tr>
                  <th className="p-3 text-left">Queue ID</th>
                  <th className="p-3 text-left">Appointment</th>
                  <th className="p-3 text-left">Token</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Created</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : queue.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center">
                      No patients in queue
                    </td>
                  </tr>
                ) : (
                  queue.map((q) => (
                    <tr key={q.queueId} className="border-b">

                      <td className="p-3">{q.queueId}</td>
                      <td className="p-3">{q.appointmentId}</td>
                      <td className="p-3">{q.tokenNumber}</td>

                      <td className="p-3">
                        <StatusBadge status={q.status} />
                      </td>

                      <td className="p-3">
                        {new Date(q.createdAt).toLocaleString()}
                      </td>

                      <td className="p-3">

                        {q.status === 'IN_PROGRESS' && (
                          <Button
                            size="sm"
                            onClick={() => completeConsultation(q.queueId)}
                            disabled={actionLoading}
                          >
                            Complete
                          </Button>
                        )}

                        {q.status === 'WAITING' && (
                          <span className="text-yellow-600 font-medium">
                            Waiting
                          </span>
                        )}

                        {q.status === 'DONE' && (
                          <span className="text-green-600 font-medium">
                            Done
                          </span>
                        )}

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>
        </div>

      </div>
    </div>
  )
}