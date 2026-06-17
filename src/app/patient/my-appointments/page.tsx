'use client'

import { StatusBadge } from '@/src/app/components/common/status-badge'

export default function VisitHistoryPage() {
  const visits = [
    {
      id: 1,
      date: '2026-06-10',
      reason: 'Fever',
      status: 'completed' as const,
    },
    {
      id: 2,
      date: '2026-06-05',
      reason: 'Headache',
      status: 'completed' as const,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">
          Visit History
        </h1>

        <div className="space-y-4">
          {visits.map((visit) => (
            <div
              key={visit.id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {visit.reason}
                </p>

                <p className="text-sm text-muted-foreground">
                  {visit.date}
                </p>
              </div>

              <StatusBadge
                status={visit.status}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}