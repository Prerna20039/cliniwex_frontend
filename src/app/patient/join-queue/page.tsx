'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/src/app/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from "axios";

export default function JoinQueuePage() {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [patientName, setPatientName] = useState('')
  const router = useRouter()

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('patientName')

    if (!token) {
      router.push('/patient/login') // Redirect if not logged in
      return
    }

    setPatientName(name || 'Patient')
  }, [router])

  const handleJoinQueue = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');

      if (!token) {
        alert("Please login first!");
        router.push('/patient/login');
        return;
      }

      // Check if token expired
      const expiry = localStorage.getItem('tokenExpiry')
      if (expiry && Date.now() > parseInt(expiry)) {
        localStorage.clear()
        alert("Session expired. Please login again.")
        router.push('/patient/login')
        return
      }

      const now = new Date();

      const payload = {
        doctorId: 1,
        appointmentDate: now.toISOString().split("T")[0],
        appointmentTime: now.toTimeString().split(" ")[0],
        reason: reason,
      };

      const response = await axios.post(
        "https://cliniwexbackend-production.up.railway.app/api/appointments/book",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      alert(`Successfully joined queue! Token: ${response.data.tokenNumber}`);
      setReason('') // Clear form
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);

        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 401 || status === 403) {
          localStorage.clear();
          alert("Session expired. Please login again.");
          router.push('/patient/login');
        } else if (status === 409) {
          alert(message || "You already have an appointment today");
        } else {
          alert(message || "Something went wrong");
        }
      } else {
        console.log("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-card border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">
          Join Today's Queue
        </h1>

        <p className="text-muted-foreground mb-6">
          Welcome, {patientName}. Appointments are only available for today.
        </p>

        <div className="space-y-4">
          <div>
            <label className="font-medium">Doctor</label>
            <div className="mt-2 p-3 border rounded-lg bg-muted">
              Dr. Michael Johnson
            </div>
          </div>

          <div>
            <label className="font-medium">Reason for Visit</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              placeholder="Enter your symptoms..."
              className="w-full border rounded-lg p-3 mt-2"
              required
            />
          </div>

          <Button
            onClick={handleJoinQueue}
            disabled={loading || !reason.trim()}
          >
            {loading ? "Joining..." : "Join Queue"}
          </Button>
        </div>
      </div>
    </div>
  )
}