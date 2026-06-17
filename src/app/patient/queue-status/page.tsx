'use client'

import { StatusBadge } from '@/src/app/components/common/status-badge'

export default function QueueStatusPage() {
  const queue = {
    token: 18,
    currentToken: 14,
    patientsAhead: 4,
    estimatedWait: 20,
    status: 'waiting' as const,
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-card border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">
          Queue Status
        </h1>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="border rounded-lg p-4">
            <p className="text-muted-foreground">
              Your Token
            </p>

            <p className="text-4xl font-bold">
              #{queue.token}
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-muted-foreground">
              Current Token
            </p>

            <p className="text-4xl font-bold">
              #{queue.currentToken}
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <p className="text-muted-foreground">
            Patients Ahead
          </p>

          <p className="text-3xl font-bold">
            {queue.patientsAhead}
          </p>
        </div>

        <div className="border rounded-lg p-4 mb-4">
          <p className="text-muted-foreground">
            Estimated Wait Time
          </p>

          <p className="text-3xl font-bold">
            {queue.estimatedWait} mins
          </p>
        </div>

        <StatusBadge status={queue.status} />
      </div>
    </div>
  )
}