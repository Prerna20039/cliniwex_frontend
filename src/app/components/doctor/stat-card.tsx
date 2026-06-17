'use client'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  description?: string
}

export function StatCard({ icon, label, value, description }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
        </div>
        <div className="text-primary text-2xl">{icon}</div>
      </div>
    </div>
  )
}
