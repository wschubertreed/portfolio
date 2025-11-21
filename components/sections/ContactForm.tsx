'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Your name"
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="your@email.com"
          disabled={status === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 bg-white border-2 border-black rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black resize-none"
          placeholder="Tell me about your project..."
          disabled={status === 'loading'}
        />
      </div>

      <Button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-black text-white hover:bg-gray-800 font-semibold py-3 rounded-xl transition-colors"
      >
        <Mail className="w-4 h-4 mr-2" />
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>

      {status === 'success' && (
        <div className="p-4 bg-green-100 border-2 border-green-500 rounded-xl text-green-800 font-medium text-center">
          Message sent successfully! I&apos;ll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-100 border-2 border-red-500 rounded-xl text-red-800 font-medium text-center">
          {errorMessage}
        </div>
      )}
    </form>
  )
}
