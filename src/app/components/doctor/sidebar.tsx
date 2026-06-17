'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'

export function DoctorSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/doctor/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/doctor/appointments', label: 'Appointments', icon: '📅' },
    { href: '/doctor/queue', label: 'Queue Management', icon: '⏱️' },
    { href: '/doctor/analytics', label: 'Analytics', icon: '📈' },
    { href: '/doctor/profile', label: 'Profile', icon: '👤' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 rounded-lg bg-primary text-white"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed left-0 top-0 h-screen w-64 bg-card border-r border-border transition-transform duration-300 z-30 md:z-auto`}>
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-bold text-lg text-foreground">Clinivex</span>
          </Link>

          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(link.href)
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                <span>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full border-border text-foreground hover:bg-secondary"
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
