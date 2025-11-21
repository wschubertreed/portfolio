'use client'

import { Card } from '@/components/ui/card'
import { VideoPlayer } from '@/components/VideoPlayer'
import { urlFor } from '@/sanity/lib/image'

interface FilmScore {
  _id: string
  title: string
  description?: string
  thumbnail: any
  videoUrl: string
  platform: string
  year?: number
}

interface FilmSectionProps {
  filmScores: FilmScore[]
}

export function FilmSection({ filmScores }: FilmSectionProps) {
  return (
    <section id="film" className="min-h-screen py-20 bg-primary-light">
      <div className="container mx-auto px-6">
        <h2 className="text-[clamp(40px,8vw,80px)] font-extrabold leading-none tracking-tight text-black mb-12">
          Film Scores
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filmScores.map((film) => (
            <Card key={film._id} className="bg-primary rounded-2xl shadow-sm p-6 space-y-4 border-2 border-black">
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">{film.title}</h3>
                {film.year && (
                  <p className="text-sm text-black opacity-60 mb-3">{film.year}</p>
                )}
                {film.description && (
                  <p className="text-sm text-black mb-4">{film.description}</p>
                )}
              </div>
              <VideoPlayer
                url={film.videoUrl}
                platform={film.platform}
                thumbnail={film.thumbnail ? urlFor(film.thumbnail).width(800).height(450).url() : undefined}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
