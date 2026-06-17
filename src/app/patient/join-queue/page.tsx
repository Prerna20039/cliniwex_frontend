'use client'

import { useState } from 'react'
import { Button } from '@/src/app/components/ui/button'

export default function JoinQueuePage() {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const handleJoinQueue = async () => {
    try {
      setLoading(true)

      const today = new Date().toISOString().split('T')[0]

      const payload = {
        doctor_id: 1,
        appointment_date: today,
        appointment_time: '10:00:00',
        reason,
      }

      console.log(payload)

      /*
      await axios.post(
        'http://localhost:8000/api/appointments',
        payload
      )
      */

      alert('Successfully joined queue')
    } catch (error) {
      console.error(error)
      alert('Failed to join queue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">
          Join Today's Queue
        </h1>

        <p className="text-muted-foreground mb-6">
          Appointments are only available for today.
        </p>

        <div className="space-y-4">
          <div>
            <label className="font-medium">
              Doctor
            </label>

            <div className="mt-2 p-3 border rounded-lg bg-muted">
              Dr. Michael Johnson
            </div>
          </div>

          <div>
            <label className="font-medium">
              Reason for Visit
            </label>

            <textarea
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              rows={4}
              placeholder="Enter your symptoms..."
              className="w-full border rounded-lg p-3 mt-2"
            />
          </div>

          <Button
            onClick={handleJoinQueue}
            disabled={!reason || loading}
            className="w-full"
          >
            {loading
              ? 'Joining Queue...'
              : 'Join Queue'}
          </Button>
        </div>
      </div>
    </div>
  )
}