'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import StatusBadge from '@/components/common/status-badge'
import DoctorSidebar from '@/components/doctor/sidebar'

interface Appointment {
  appointmentId: number
  patientId: number
  doctorId: number
  appointmentDate: string
  appointmentTime: string
  status: 'PENDING' | 'ACCEPTED' | 'COMPLETED' | 'CANCELLED'
  tokenNumber: number
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const doctorId = 1

      const response = await fetch(
        `https://cliniwexbackend-production.up.railway.app/api/doctors/appointments?doctorId=${doctorId}`
      )

      if (!response.ok) throw new Error('Failed to fetch appointments')

      const data = await response.json()
      setAppointments(data)
    } catch (err) {
      console.error('Error fetching appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateAppointmentStatus = async (
    appointmentId: number,
    status: 'ACCEPTED' | 'CANCELLED' | 'COMPLETED'
  ) => {
    try {
      const response = await fetch(
        `https://cliniwexbackend-production.up.railway.app/api/doctors/appointments/${appointmentId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        }
      )

      const text = await response.text()

      if (!response.ok) {
        console.error('Backend error:', text)
        throw new Error('Failed to update status')
      }

      // update UI instantly
      setAppointments(prev =>
        prev.map(app =>
          app.appointmentId === appointmentId
            ? { ...app, status }
            : app
        )
      )
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <DoctorSidebar />

      <div className="flex-1 ml-64 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Appointments</h1>

        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="overflow-x-auto max-h-[70vh]">
            <table className="w-full min-w-[900px]">
              <thead className="bg-blue-50 sticky top-0">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Patient</th>
                  <th className="p-3 text-left">Doctor</th>
                  <th className="p-3 text-left">Token</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Time</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center p-10">
                      Loading...
                    </td>
                  </tr>
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-10">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map(app => (
                    <tr key={app.appointmentId} className="border-b">
                      <td className="p-3">{app.appointmentId}</td>
                      <td className="p-3">{app.patientId}</td>
                      <td className="p-3">{app.doctorId}</td>
                      <td className="p-3">{app.tokenNumber}</td>
                      <td className="p-3">{app.appointmentDate}</td>
                      <td className="p-3">{app.appointmentTime}</td>

                      <td className="p-3">
                        <StatusBadge status={app.status} />
                      </td>

                      <td className="p-3">
                        {/* PENDING */}
                        {app.status === 'PENDING' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                updateAppointmentStatus(
                                  app.appointmentId,
                                  'ACCEPTED'
                                )
                              }
                            >
                              Accept
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateAppointmentStatus(
                                  app.appointmentId,
                                  'CANCELLED'
                                )
                              }
                            >
                              Reject
                            </Button>
                          </div>
                        )}

                        {/* ACCEPTED → ONLY IN QUEUE */}
                        {app.status === 'ACCEPTED' && (
                          <span className="text-blue-600 text-sm font-medium">
                            In Queue
                          </span>
                        )}

                        {/* COMPLETED */}
                        {app.status === 'COMPLETED' && (
                          <span className="text-green-600 text-sm font-medium">
                            Completed
                          </span>
                        )}

                        {/* CANCELLED */}
                        {app.status === 'CANCELLED' && (
                          <span className="text-red-500 text-sm font-medium">
                            Rejected
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