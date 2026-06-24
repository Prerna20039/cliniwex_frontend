"use client";

import { Navbar } from "@/components/common/navbar";
import { FeatureCard } from "@/components/common/feature-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-[100svh] flex items-center bg-gradient-to-br from-white via-blue-50/30 to-white px-4 sm:px-6 lg:px-8 py-10">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">

            <div className="mb-5 flex justify-center lg:justify-start">
              <span className="px-4 py-2 text-xs sm:text-sm rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                Trusted by 10,000+ Doctors & Patients
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-5 sm:mb-6">
              Healthcare <br />
              <span className="text-blue-600">Simplified</span>
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed">
              Clinivex connects doctors and patients seamlessly. Manage appointments,
              track queues, and receive real-time updates — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8">

              <Link href="/doctor/register" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white">
                  For Doctors
                </Button>
              </Link>

              <Link href="/patient/register" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  For Patients
                </Button>
              </Link>

            </div>

            <div className="flex flex-wrap gap-3 sm:gap-5 justify-center lg:justify-start text-xs sm:text-sm text-muted-foreground">
              <div>📅 Easy Appointments</div>
              <div>⏱️ Real-time Queue</div>
              <div>🔒 Secure & Private</div>
            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">

            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg h-[280px] sm:h-[380px] md:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
                alt="Doctors"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md rounded-xl p-3 sm:p-4 flex gap-3 w-[200px] sm:w-[240px]">
                <div className="text-blue-600 text-xl">🏥</div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">
                    Multi-Speciality Doctors
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    Connected healthcare ecosystem
                  </p>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] sm:text-xs px-3 py-1 rounded-full">
                Live Network
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Why Choose Clinivex?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
          <FeatureCard icon="📅" title="Easy Appointments" description="Book and manage appointments instantly." />
          <FeatureCard icon="⏱️" title="Real-time Queue" description="Track your live queue position." />
          <FeatureCard icon="📊" title="Analytics Dashboard" description="Insights for doctors and clinics." />
          <FeatureCard icon="🔔" title="Instant Notifications" description="Stay updated in real time." />
          <FeatureCard icon="👨‍⚕️" title="Doctor Tools" description="Manage patients and schedules easily." />
          <FeatureCard icon="🔒" title="Secure System" description="Enterprise-grade data protection." />
        </div>

      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        <div className="bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 text-center shadow-lg">

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Transform Healthcare?
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">

            <Link href="/doctor/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 bg-white text-primary">
                Get Started as Doctor
              </Button>
            </Link>

            <Link href="/patient/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 bg-white/20 text-white border border-white/30">
                Get Started as Patient
              </Button>
            </Link>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12 sm:py-16 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

            {/* BRAND */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                  C
                </div>
                <span className="font-bold text-lg text-foreground">
                  Clinivex
                </span>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional healthcare management platform connecting doctors and patients seamlessly.
              </p>
            </div>

            {/* PRODUCT */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#about">How it Works</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/dashboard">Dashboard</Link></li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/security">Security</Link></li>
                <li><Link href="/support">Support</Link></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2024 Clinivex. All rights reserved.
            </p>

            <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
              <Link href="#">Twitter</Link>
              <Link href="#">LinkedIn</Link>
              <Link href="#">Facebook</Link>
              <Link href="#">Instagram</Link>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}