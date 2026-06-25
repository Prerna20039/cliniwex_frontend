'use client'

interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'in-progress' | 'waiting'
  label?: string
}

export function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { bg: string; text: string }> = {
    PENDING: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
    },
    COMPLETED: {
      bg: "bg-green-100",
      text: "text-green-700",
    },
    CANCELLED: {
      bg: "bg-red-100",
      text: "text-red-700",
    },
  }

  const config = statusConfig[status] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.text}`}>
      {status}
    </span>
  )
}
