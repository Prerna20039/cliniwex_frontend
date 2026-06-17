'use client'

import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/doctor/stat-card'
import StatusBadge  from '@/components/common/status-badge'
import DoctorSidebar from '@/components/doctor/sidebar'

export default function DoctorProfile() {
  return (
    <div className="min-h-screen flex bg-background">

      {/* SIDEBAR */}
      <DoctorSidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 px-4 md:px-8 py-6">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your professional information
          </p>
        </div>

        {/* STATUS BAR */}
        <div className="flex flex-wrap gap-3 mb-6">
          <StatusBadge status="PENDING" />
          <StatusBadge status="ACCEPTED" />
          <StatusBadge status="COMPLETED" />
          <StatusBadge status="CANCELLED" />
        </div>

        {/* PROFILE CARD */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">

            <div className="w-20 h-20 md:w-24 md:h-24 bg-primary rounded-xl flex items-center justify-center text-3xl">
              👨‍⚕️
            </div>

            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Dr. Michael Johnson
              </h2>

              <p className="text-primary font-semibold mb-2">
                Cardiologist
              </p>

              <p className="text-muted-foreground mb-6">
                Experienced cardiologist with 15+ years of practice.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-xs text-muted-foreground">License</p>
                  <p className="font-semibold">LIC-001234</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                  <p className="font-semibold">15+ Years</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Fee</p>
                  <p className="font-semibold">$50</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                  <p className="font-semibold">4.8/5</p>
                </div>
              </div>

              <Button className="bg-primary text-white">
                Edit Profile
              </Button>
            </div>

          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            icon="👥"
            label="Total Patients"
            value="324"
            description="Registered with you"
          />

          <StatCard
            icon="📅"
            label="Consultations"
            value="1,240"
            description="All-time"
          />
        </div>

        {/* PRACTICE DETAILS */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-8">
          <h2 className="text-lg font-bold mb-6">Practice Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="input border border-border p-2 rounded" defaultValue="Heart Care Clinic" />
            <input className="input border border-border p-2 rounded" defaultValue="+1 555 123 4567" />
            <input className="input border border-border p-2 rounded" defaultValue="123 Medical Plaza" />
            <input className="input border border-border p-2 rounded" defaultValue="9 AM - 6 PM" />
          </div>
        </div>

        {/* SETTINGS */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8">
          <h2 className="text-lg font-bold mb-6">Settings</h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Appointment alerts
                </p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Queue updates
                </p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>

          </div>

          <div className="mt-6 flex gap-3">
            <Button className="bg-primary text-white">
              Save Changes
            </Button>

            <Button variant="outline">
              Cancel
            </Button>
          </div>
        </div>

      </main>
    </div>
  )
}