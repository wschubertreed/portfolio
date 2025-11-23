'use client'

import { VideoPlayer } from '@/components/VideoPlayer'
import { urlFor } from '@/sanity/lib/image'

interface Album {
  _id: string
  spotifyEmbedUrl: string
  description?: string
  order?: number
}

interface FilmScore {
  _id: string
  title: string
  description?: string
  thumbnail?: any
  videoFile?: {
    asset?: {
      url: string
    }
  }
  videoUrl?: string
  platform?: string
  year?: number
  publishDate?: string
  order?: number
}

interface MusicSectionProps {
  albums: Album[]
  filmScores: FilmScore[]
}

// Convert regular Spotify URL to embed URL
function getSpotifyEmbedUrl(url: string): string {
  if (!url) return ''
  if (url.includes('/embed/')) return url
  const match = url.match(/open\.spotify\.com\/(album|track|playlist)\/([a-zA-Z0-9]+)/)
  if (match) {
    return `https://open.spotify.com/embed/${match[1]}/${match[2]}`
  }
  return url
}

export function MusicSection({ albums, filmScores }: MusicSectionProps) {
  return (
    <section id="music" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Main Heading */}
        <h2 className="text-[clamp(40px,8vw,80px)] font-extrabold leading-none tracking-tight text-black mb-16">
          Music
        </h2>

        {/* Wiley Beckett Subsection */}
        {albums.length > 0 && (
          <div className="mb-20">
            <h3 className="text-[clamp(32px,6vw,56px)] font-bold leading-none tracking-tight text-black mb-8">
              Wiley Beckett
            </h3>
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
        )}

        {/* Film Scoring Subsection */}
        {filmScores.length > 0 && (
          <div>
            <h3 className="text-[clamp(32px,6vw,56px)] font-bold leading-none tracking-tight text-black mb-8">
              Film Scoring
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {filmScores.map((film) => (
                <div key={film._id} className="space-y-3">
                  {/* Video Player */}
                  <VideoPlayer
                    url={film.videoUrl}
                    videoFileUrl={film.videoFile?.asset?.url}
                    platform={film.platform}
                    thumbnail={film.thumbnail ? urlFor(film.thumbnail).url() : undefined}
                  />

                  {/* Title/Date and Description below player */}
                  <div className="text-left">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-bold font-mono uppercase text-black text-lg leading-tight">
                        {film.title}
                      </h4>
                      {film.publishDate && (
                        <span className="font-mono text-sm text-black opacity-60 whitespace-nowrap">
                          {new Date(film.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                          })}
                        </span>
                      )}
                    </div>
                    {film.description && (
                      <p className="font-mono text-sm text-black opacity-80 mt-0.5">
                        {film.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
