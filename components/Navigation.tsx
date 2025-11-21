'use client'

import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { label: 'Music', href: '#music' },
  { label: 'Video', href: '#video' },
  { label: 'Mammoth', href: '#mammoth' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b-2 border-black">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight text-black">
            WILDMAN
          </h1>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="text-black hover:bg-primary-light font-semibold"
                onClick={() => scrollToSection(item.href)}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="outline"
                className="bg-primary-light border-black text-black font-semibold rounded-xl w-full"
                onClick={() => scrollToSection(item.href)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
