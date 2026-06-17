'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl text-foreground">Clinivex</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="hover:text-primary transition">Features</Link>
            <Link href="#about" className="hover:text-primary transition">About</Link>
            <Link href="#contact" className="hover:text-primary transition">Contact</Link>
          </div>

          {/* LOGIN BUTTONS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-3">

            <Link href="/doctor/login">
              <Button
                variant="outline"
                className="text-primary border-primary hover:bg-primary hover:text-white"
              >
                Doctor Login
              </Button>
            </Link>

            <Link href="/patient/login">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Patient Login
              </Button>
            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl text-foreground"
          >
            ☰
          </button>

        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden flex flex-col gap-4 pb-4">

            <Link
              href="#features"
              onClick={() => setOpen(false)}
              className="py-2"
            >
              Features
            </Link>

            <Link
              href="#about"
              onClick={() => setOpen(false)}
              className="py-2"
            >
              About
            </Link>

            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="py-2"
            >
              Contact
            </Link>

            <div className="flex flex-col gap-3 pt-2">

              <Link href="/doctor/login" onClick={() => setOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full text-primary border-primary"
                >
                  Doctor Login
                </Button>
              </Link>

              <Link href="/patient/login" onClick={() => setOpen(false)}>
                <Button className="w-full bg-primary text-white">
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