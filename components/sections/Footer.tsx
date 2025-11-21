'use client'

import { Button } from '@/components/ui/button'
import { Instagram, Music, Youtube, Mail } from 'lucide-react'

interface SocialLinks {
  instagram?: string
  spotify?: string
  youtube?: string
  vimeo?: string
  twitter?: string
  website?: string
}

interface FooterProps {
  email?: string
  socialLinks?: SocialLinks
}

export function Footer({ email, socialLinks }: FooterProps) {
  return (
    <footer id="contact" className="py-16 bg-primary border-t-2 border-black">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-4xl font-extrabold text-black mb-8 text-center">
            Get in Touch
          </h2>

          {email && (
            <div className="mb-8 text-center">
              <a
                href={`mailto:${email}`}
                className="text-lg font-semibold text-black hover:opacity-70 transition-opacity"
              >
                {email}
              </a>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {socialLinks?.instagram && (
              <Button
                variant="outline"
                className="bg-primary-light border-black text-black font-medium rounded-xl"
                asChild
              >
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </a>
              </Button>
            )}
            {socialLinks?.spotify && (
              <Button
                variant="outline"
                className="bg-primary-light border-black text-black font-medium rounded-xl"
                asChild
              >
                <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer">
                  <Music className="w-4 h-4 mr-2" />
                  Spotify
                </a>
              </Button>
            )}
            {socialLinks?.youtube && (
              <Button
                variant="outline"
                className="bg-primary-light border-black text-black font-medium rounded-xl"
                asChild
              >
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube
                </a>
              </Button>
            )}
            {email && (
              <Button
                variant="outline"
                className="bg-primary-light border-black text-black font-medium rounded-xl"
                asChild
              >
                <a href={`mailto:${email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </a>
              </Button>
            )}
          </div>

          <div className="mt-12 text-center text-sm text-black opacity-60">
            <p>© {new Date().getFullYear()} Wildman. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
