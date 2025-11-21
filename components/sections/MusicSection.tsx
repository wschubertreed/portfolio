'use client'

import { Card } from '@/components/ui/card'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

interface Album {
  _id: string
  title: string
  artist: string
  year: number
  albumArt: any
  spotifyEmbedUrl: string
  description?: string
}

interface MusicSectionProps {
  albums: Album[]
}

export function MusicSection({ albums }: MusicSectionProps) {
  return (
    <section id="music" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-[clamp(40px,8vw,80px)] font-extrabold leading-none tracking-tight text-black mb-12">
          Music
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {albums.map((album) => (
            <Card key={album._id} className="bg-primary rounded-2xl shadow-sm p-6 space-y-6 border-2 border-black">
              <div className="flex gap-6">
                {album.albumArt && (
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden border-2 border-black">
                    <Image
                      src={urlFor(album.albumArt).width(300).height(300).url()}
                      alt={album.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black mb-1">{album.title}</h3>
                  <p className="font-semibold text-black opacity-80">{album.artist}</p>
                  <p className="text-sm text-black opacity-60">{album.year}</p>
                  {album.description && (
                    <p className="text-sm text-black mt-3">{album.description}</p>
                  )}
                </div>
              </div>

              {/* Spotify Embed */}
              <div className="rounded-xl overflow-hidden border-2 border-black">
                <iframe
                  src={album.spotifyEmbedUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
