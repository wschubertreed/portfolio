'use client'

import { Card } from '@/components/ui/card'

interface Album {
  _id: string
  spotifyEmbedUrl: string
  description?: string
  order?: number
}

interface MusicSectionProps {
  albums: Album[]
}

// Convert regular Spotify URL to embed URL
function getSpotifyEmbedUrl(url: string): string {
  if (!url) return ''

  // If already an embed URL, return as is
  if (url.includes('/embed/')) return url

  // Convert regular URL to embed URL
  // https://open.spotify.com/album/ID -> https://open.spotify.com/embed/album/ID
  const match = url.match(/open\.spotify\.com\/(album|track|playlist)\/([a-zA-Z0-9]+)/)
  if (match) {
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}`
  }

  return url
}

export function MusicSection({ albums }: MusicSectionProps) {
  return (
    <section id="music" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-[clamp(40px,8vw,80px)] font-extrabold leading-none tracking-tight text-black mb-12">
          Music
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {albums.map((album) => {
            const embedUrl = getSpotifyEmbedUrl(album.spotifyEmbedUrl)
            return (
              <div key={album._id} className="space-y-4">
                {album.description && (
                  <div>
                    <p className="text-sm text-black font-medium">{album.description}</p>
                  </div>
                )}

                {/* Spotify Embed */}
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={embedUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
