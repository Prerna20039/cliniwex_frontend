'use client'

import DoctorSidebar from '@/components/doctor/sidebar'
import { StatCard } from '@/components/doctor/stat-card'

export default function DoctorDashboard() {
  // Temporary dummy data
  const dashboard = {
    totalAppointments: 120,
    pendingAppointments: 15,
    acceptedAppointments: 80,
    completedAppointments: 20,
    cancelledAppointments: 5,
    patientsInQueue: 8,
  }

  /*
  // ================= BACKEND CODE =================

  const [dashboard, setDashboard] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    acceptedAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
    patientsInQueue: 0,
  })

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          'https://cliniwexbackend-production.up.railway.app/api/doctor/dashboard'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch dashboard')
        }

        const data = await response.json()
        setDashboard(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDashboard()
  }, [])

  // =================================================
  */

  const stats = [
    {
      icon: '📅',
      label: 'Total Appointments',
      value: dashboard.totalAppointments,
      description: 'All appointments',
    },
    {
      icon: '⏳',
      label: 'Pending Appointments',
      value: dashboard.pendingAppointments,
      description: 'Awaiting approval',
    },
    {
      icon: '✅',
      label: 'Accepted Appointments',
      value: dashboard.acceptedAppointments,
      description: 'Approved appointments',
    },
    {
      icon: '✔️',
      label: 'Completed Appointments',
      value: dashboard.completedAppointments,
      description: 'Finished consultations',
    },
    {
      icon: '❌',
      label: 'Cancelled Appointments',
      value: dashboard.cancelledAppointments,
      description: 'Cancelled bookings',
    },
    {
      icon: '👥',
      label: 'Patients In Queue',
      value: dashboard.patientsInQueue,
      description: 'Currently waiting',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DoctorSidebar />

      <main className="md:ml-64 p-8">
        <div className="max-w-7xl mx-auto">

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome Back Doctor!
            </h1>

            <p className="text-muted-foreground">
              Overview of appointments and queue status
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                description={stat.description}
              />
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}

