'use client'

import Link from 'next/link'
import { Button } from '@/src/app/components/ui/button'
import { StatCard } from '@/src/app/components/common/stats-card'
import { StatusBadge } from '@/src/app/components/common/status-badge'

type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'in-progress'
  | 'waiting'

export default function PatientDashboard() {
  // Later replace with API data
  const queueData = {
    patientName: 'John',
    tokenNumber: 12,
    currentToken: 8,
    patientsAhead: 4,
    estimatedWait: '20 mins',
    doctorStatus: 'Available',
    doctorName: 'Dr. Michael Johnson',
    clinicHours: '09:00 AM - 06:00 PM',
  }

  const stats = [
    {
      icon: '🎟️',
      label: 'Your Token',
      value: `#${queueData.tokenNumber}`,
      description: 'Today',
    },
    {
      icon: '👨‍⚕️',
      label: 'Current Token',
      value: `#${queueData.currentToken}`,
      description: 'Now Serving',
    },
    {
      icon: '👥',
      label: 'Patients Ahead',
      value: queueData.patientsAhead,
      description: 'In Queue',
    },
    {
      icon: '⏱️',
      label: 'Estimated Wait',
      value: queueData.estimatedWait,
      description: 'Approximate',
    },
  ]

  const appointments: {
    id: number
    doctor: string
    date: string
    time: string
    status: AppointmentStatus
  }[] = [
    {
      id: 1,
      doctor: queueData.doctorName,
      date: 'Today',
      time: '10:30 AM',
      status: 'confirmed',
    },
  ]

  const recentVisits = [
    {
      id: 1,
      date: '15 May 2026',
      reason: 'General Consultation',
    },
    {
      id: 2,
      date: '20 Apr 2026',
      reason: 'Follow-up Visit',
    },
    {
      id: 3,
      date: '02 Mar 2026',
      reason: 'Fever Checkup',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8">
      {/* Hero Section */}
      <div className="rounded-3xl bg-primary text-white p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome, {queueData.patientName} 👋
            </h1>

            <p className="mt-2 text-white/80">
              Track your live queue status and appointment updates.
            </p>

            <div className="mt-6 flex flex-wrap gap-6">
              <div>
                <p className="text-sm text-white/70">Your Token</p>
                <p className="text-3xl font-bold">
                  #{queueData.tokenNumber}
                </p>
              </div>

              <div>
                <p className="text-sm text-white/70">Now Serving</p>
                <p className="text-3xl font-bold">
                  #{queueData.currentToken}
                </p>
              </div>

              <div>
                <p className="text-sm text-white/70">Wait Time</p>
                <p className="text-3xl font-bold">
                  {queueData.estimatedWait}
                </p>
              </div>
            </div>
          </div>

          <Link href="/patient/queue-status">
            <Button
              variant="secondary"
              className="font-semibold"
            >
              View Live Queue
            </Button>
          </Link>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Queue Progress */}
        <div className="xl:col-span-2 bg-card border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">
            Queue Progress
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Current Token</span>
              <span className="font-semibold">
                #{queueData.currentToken}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Your Token</span>
              <span className="font-semibold">
                #{queueData.tokenNumber}
              </span>
            </div>

            <div className="w-full bg-secondary rounded-full h-4">
              <div
                className="bg-primary h-4 rounded-full"
                style={{
                  width: `${Math.min(
                    (queueData.currentToken /
                      queueData.tokenNumber) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>

            <p className="text-sm text-muted-foreground">
              {queueData.patientsAhead} patients ahead of you
            </p>

            <div className="rounded-xl border p-4 bg-secondary/30">
              <p className="font-semibold mb-2">
                🔔 Queue Notification
              </p>
              <p className="text-sm text-muted-foreground">
                Your turn is approaching. Please stay near
                the clinic reception.
              </p>
            </div>
          </div>
        </div>

        {/* Doctor Status */}
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">
            Doctor Status
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="font-medium">
                {queueData.doctorStatus}
              </span>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Doctor
              </p>
              <p className="font-semibold">
                {queueData.doctorName}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Clinic Hours
              </p>
              <p>{queueData.clinicHours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment + Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Today's Appointment */}
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">
            Today's Appointment
          </h2>

          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="border rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-semibold">
                  {apt.doctor}
                </p>
                <p className="text-sm text-muted-foreground">
                  {apt.date} • {apt.time}
                </p>
              </div>

              <StatusBadge status={apt.status} />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-3">
            <Link href="/patient/join-queue">
              <Button className="w-full">
                Join Queue
              </Button>
            </Link>

            <Link href="/patient/queue-status">
              <Button
                variant="outline"
                className="w-full"
              >
                Check Queue Status
              </Button>
            </Link>

            <Link href="/patient/my-appointments">
              <Button
                variant="outline"
                className="w-full"
              >
                My Appointments
              </Button>
            </Link>

            <Link href="/patient/profile">
              <Button
                variant="outline"
                className="w-full"
              >
                My Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Visits */}
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">
          Recent Visits
        </h2>

        <div className="space-y-3">
          {recentVisits.map((visit) => (
            <div
              key={visit.id}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div>
                <p className="font-medium">
                  {visit.reason}
                </p>
                <p className="text-sm text-muted-foreground">
                  {visit.date}
                </p>
              </div>

              <span className="text-sm text-muted-foreground">
                Completed
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}