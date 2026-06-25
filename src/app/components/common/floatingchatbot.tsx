'use client'

import { useState } from 'react'
import AIAgentBox from '@/src/app/components/common/chatbot'

export default function FloatingAIChat() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition"
        >
          💬
        </button>
      )}

      {/* Expanded Chat */}
      {open && (
        <div className="fixed bottom-6 right-6 w-[350px]">
          
          <div className="relative">
            
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 bg-red-500 text-white w-7 h-7 rounded-full text-sm"
            >
              ✕
            </button>

            {/* Chat Box */}
            <AIAgentBox />
          </div>

        </div>
      )}
    </>
  )
}