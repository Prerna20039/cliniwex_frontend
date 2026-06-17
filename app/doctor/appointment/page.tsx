'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import  StatusBadge from '@/components/common/status-badge'
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
  const [appointments] = useState<Appointment[]>([])

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <DoctorSidebar />

      {/* Main */}
      <div className="flex-1 ml-64 p-6 overflow-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Appointments</h1>
          <p className="text-gray-600">Manage patient appointments</p>
        </div>

        {/* Scroll container */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">

          <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
            <table className="min-w-[900px] w-full">

              <thead className="sticky top-0 bg-blue-50 border-b">
                <tr>
                  <th className="p-3 text-left text-black">ID</th>
                  <th className="p-3 text-left text-black">Patient</th>
                  <th className="p-3 text-left text-black">Doctor</th>
                  <th className="p-3 text-left text-black">Token</th>
                  <th className="p-3 text-left text-black">Date</th>
                  <th className="p-3 text-left text-black">Time</th>
                  <th className="p-3 text-left text-black">Status</th>
                  <th className="p-3 text-left text-black">Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-10 text-gray-500">
                      No appointments available
                    </td>
                  </tr>
                ) : (
                  appointments.map((apt) => (
                    <tr key={apt.appointmentId} className="border-b hover:bg-gray-50">

                      <td className="p-3 text-black">{apt.appointmentId}</td>
                      <td className="p-3 text-black">{apt.patientId}</td>
                      <td className="p-3 text-black">{apt.doctorId}</td>
                      <td className="p-3 text-black">{apt.tokenNumber}</td>
                      <td className="p-3 text-black">{apt.appointmentDate}</td>
                      <td className="p-3 text-black">{apt.appointmentTime}</td>

                      <td className="p-3">
                        <StatusBadge status={apt.status} />
                      </td>

                      <td className="p-3 flex gap-2">
                        <Button size="sm">Edit</Button>
                        <Button size="sm" variant="outline">Cancel</Button>
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