'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm'
          : 'bg-background'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP BAR */}
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl text-foreground">
              Clinivex
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="#features" className="hover:text-primary transition">
              Features
            </Link>
            <Link href="#about" className="hover:text-primary transition">
              About
            </Link>
            <Link href="#contact" className="hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="hidden md:flex items-center gap-3">

            <Link href="/doctor/login">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Doctor Login
              </Button>
            </Link>

            <Link href="/patient/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Patient Login
              </Button>
            </Link>

          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-2xl"
            aria-label="Toggle menu"
          >
            {open ? '✕' : '☰'}
          </button>

        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden pb-6 pt-2 flex flex-col gap-4 border-t border-border bg-background">

            {/* LINKS */}
            <div className="flex flex-col gap-3 text-base">

              <Link
                href="#features"
                onClick={closeMenu}
                className="py-2 hover:text-primary"
              >
                Features
              </Link>

              <Link
                href="#about"
                onClick={closeMenu}
                className="py-2 hover:text-primary"
              >
                About
              </Link>

              <Link
                href="#contact"
                onClick={closeMenu}
                className="py-2 hover:text-primary"
              >
                Contact
              </Link>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col gap-3 pt-2">

              <Link href="/doctor/login" onClick={closeMenu}>
                <Button
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Doctor Login
                </Button>
              </Link>

              <Link href="/patient/login" onClick={closeMenu}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Patient Login
                </Button>
              </Link>

            </div>

          </div>
        )}

      </div>
    </nav>
  )
}