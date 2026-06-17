'use client'

import { useState } from 'react'
import DoctorSidebar from '@/components/doctor/sidebar'
import StatusBadge from '@/components/common/status-badge'
import { Button } from '@/components/ui/button'

interface QueueItem {
  queueId: number
  appointmentId: number
  tokenNumber: number
  status: 'WAITING' | 'COMPLETED'
  createdAt: string
}

export default function DoctorQueue() {
  const [queue] = useState<QueueItem[]>([])

  return (
    <div className="min-h-screen flex bg-gray-50">

      <DoctorSidebar />

      <div className="flex-1 ml-64 p-6 overflow-auto">

        <h1 className="text-3xl font-bold mb-6 text-black">
          Queue Management
        </h1>

        <div className="bg-white rounded-xl border shadow overflow-hidden">

          <div className="overflow-auto max-h-[70vh]">

            <table className="min-w-[800px] w-full">

              <thead className="sticky top-0 bg-blue-50">
                <tr>
                  <th className="p-3 text-left text-black">Queue ID</th>
                  <th className="p-3 text-left text-black">Appointment</th>
                  <th className="p-3 text-left text-black">Token</th>
                  <th className="p-3 text-left text-black">Status</th>
                  <th className="p-3 text-left text-black">Created</th>
                  <th className="p-3 text-left text-black">Action</th>
                </tr>
              </thead>

              <tbody>
                {queue.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-gray-500">
                      No queue data
                    </td>
                  </tr>
                ) : (
                  queue.map((q) => (
                    <tr key={q.queueId} className="border-b hover:bg-gray-50">

                      <td className="p-3 text-black">{q.queueId}</td>
                      <td className="p-3 text-black">{q.appointmentId}</td>
                      <td className="p-3 text-black">{q.tokenNumber}</td>

                      <td className="p-3">
                        <StatusBadge status={q.status} />
                      </td>

                      <td className="p-3 text-black">{q.createdAt}</td>

                      <td className="p-3">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
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