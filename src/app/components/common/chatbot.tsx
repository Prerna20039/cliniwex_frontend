'use client'

import { useState, useRef, useEffect } from 'react'

const BASE_URL = 'https://cliniwexbackend-production.up.railway.app'

type Message = {
  role: 'user' | 'ai'
  text: string
}

export default function AIAgentBox() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hi! I am your AI Receptionist. How can I help you today?' }
  ])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const chatEndRef = useRef<HTMLDivElement | null>(null)

  // auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')

    // 1. add user message
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: userMessage }
    ])

    setLoading(true)

    try {
      const res = await fetch(`${BASE_URL}/api/agent/join-when-live`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          patientId: Number(localStorage.getItem('patientId')),
          doctorId: 1,
        }),
      })

      const text = await res.text()

      // 2. add AI response
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text }
      ])

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: 'Something went wrong. Please try again.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md border rounded-2xl shadow-lg bg-white flex flex-col h-[500px]">

      {/* Header */}
      <div className="p-3 border-b font-bold text-center bg-blue-600 text-white rounded-t-2xl">
        AI Receptionist
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-3 py-2 rounded-xl max-w-[75%] text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-500">AI is processing...</div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  )
}