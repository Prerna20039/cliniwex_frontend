'use client'

import Link from 'next/link'
import { Button } from '../ui/button'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl text-foreground">Clinivex</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-foreground hover:text-primary transition">Features</Link>
            <Link href="#about" className="text-foreground hover:text-primary transition">About</Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/doctor/login">
              <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
                Doctor Login
              </Button>
            </Link>
            <Link href="/patient/login">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Patient Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
