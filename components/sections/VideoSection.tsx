'use client'

import { Card } from '@/components/ui/card'
import { VideoPlayer } from '@/components/VideoPlayer'
import { urlFor } from '@/sanity/lib/image'

interface VideoProject {
  _id: string
  title: string
  description?: string
  thumbnail: any
  videoUrl: string
  platform: string
  category?: string
  year?: number
}

interface VideoSectionProps {
  videoProjects: VideoProject[]
}

export function VideoSection({ videoProjects }: VideoSectionProps) {
  return (
    <section id="video" className="min-h-screen py-20 bg-primary-light">
      <div className="container mx-auto px-6">
        <h2 className="text-[clamp(40px,8vw,80px)] font-extrabold leading-none tracking-tight text-black mb-12">
          Video
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoProjects.map((project) => (
            <Card key={project._id} className="bg-primary rounded-2xl shadow-sm p-6 space-y-4 border-2 border-black">
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold text-black">{project.title}</h3>
                  {project.category && (
                    <span className="text-xs uppercase font-semibold text-black opacity-60 px-2 py-1 bg-primary-light rounded">
                      {project.category}
                    </span>
                  )}
                </div>
                {project.year && (
                  <p className="text-sm text-black opacity-60 mb-3">{project.year}</p>
                )}
                {project.description && (
                  <p className="text-sm text-black mb-4">{project.description}</p>
                )}
              </div>
              <VideoPlayer
                url={project.videoUrl}
                platform={project.platform}
                thumbnail={project.thumbnail ? urlFor(project.thumbnail).width(800).height(450).url() : undefined}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
