"use client";

import { Navbar } from "@/components/common/navbar";
import { FeatureCard } from "@/components/common/feature-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-white via-blue-50/30 to-white px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">

            {/* BADGE */}
            <div className="mb-6 flex justify-center lg:justify-start">
              <span className="px-4 py-2 text-xs sm:text-sm rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                Trusted by 10,000+ Doctors & Patients
              </span>
            </div>

            {/* HEADING */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
              Healthcare <br />
              <span className="text-blue-600">Simplified</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Clinivex connects doctors and patients seamlessly. Manage appointments,
              track queues, and receive real-time updates — all in one place.
            </p>

            {/* BUTTONS (FIXED ROUTES) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">

              <Link href="/doctor/register">
                <Button className="w-full sm:w-auto px-8 py-6 text-base bg-blue-600 hover:bg-blue-700 text-white">
                  For Doctors
                </Button>
              </Link>

              <Link href="/patientregister">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto px-8 py-6 text-base border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  For Patients
                </Button>
              </Link>

            </div>

            {/* FEATURES */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>📅</span> Easy Appointments
              </div>

              <div className="flex items-center gap-2">
                <span>⏱️</span> Real-time Queue
              </div>

              <div className="flex items-center gap-2">
                <span>🔒</span> Secure & Private
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end mt-10 lg:mt-0">

            <div className="relative w-full max-w-md sm:max-w-lg h-[350px] sm:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80"
                alt="Team of Doctors"
                className="w-full h-full object-cover scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              {/* FLOATING CARD */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-3 sm:p-4 flex items-center gap-3 w-[220px] sm:w-[260px]">
                <div className="text-blue-600 text-2xl">🏥</div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">
                    Multi-Speciality Doctors
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    Connected healthcare ecosystem
                  </p>
                </div>
              </div>

              {/* TOP BADGE */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-blue-600 text-white text-[10px] sm:text-xs px-3 py-1 rounded-full shadow-lg">
                Live Hospital Network
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose Clinivex?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience next-gen healthcare management with speed, clarity, and control.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          <FeatureCard icon="📅" title="Easy Appointments" description="Book and manage appointments instantly." />
          <FeatureCard icon="⏱️" title="Real-time Queue" description="Track your live queue position." />
          <FeatureCard icon="📊" title="Analytics Dashboard" description="Insights for doctors and clinics." />
          <FeatureCard icon="🔔" title="Instant Notifications" description="Stay updated in real time." />
          <FeatureCard icon="👨‍⚕️" title="Doctor Tools" description="Manage patients and schedules easily." />
          <FeatureCard icon="🔒" title="Secure System" description="Enterprise-grade data protection." />
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-secondary/30 rounded-2xl">

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 sm:mb-16 text-foreground">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">

          {[
            { step: "1", title: "Create Account", desc: "Sign up as doctor or patient in minutes." },
            { step: "2", title: "Book or Manage", desc: "Schedule appointments and manage queues." },
            { step: "3", title: "Stay Updated", desc: "Get real-time notifications instantly." },
          ].map((item) => (
            <div
              key={item.step}
              className="text-center p-6 rounded-xl hover:bg-background transition"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                {item.step}
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-foreground">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">{item.desc}</p>
            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        <div className="bg-primary rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-lg">

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Transform Healthcare?
          </h2>

          <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-sm sm:text-base">
            Join thousands of doctors and patients using Clinivex today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link href="/doctor/register">
              <Button className="w-full sm:w-auto px-8 py-6 bg-white text-primary hover:bg-gray-100 font-semibold">
                Get Started as Doctor
              </Button>
            </Link>

            <Link href="/patient-register">
              <Button className="w-full sm:w-auto px-8 py-6 bg-white/20 text-white hover:bg-white/30 border border-white/30">
                Get Started as Patient
              </Button>
            </Link>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-4 max-w-7xl mx-auto">

        <div className="text-center text-sm text-muted-foreground">
          © 2024 Clinivex. All rights reserved.
        </div>

      </footer>
    </div>
  );
}