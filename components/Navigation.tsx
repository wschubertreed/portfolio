'use client'

import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Music', href: '#music' },
  { label: 'Mammoth', href: '#mammoth' },
  { label: 'Video', href: '#video' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b-2 border-black">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight text-black">
            WILDMAN
          </h1>
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
        </div>
      </div>
    </nav>
  )
}
