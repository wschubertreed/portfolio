'use client'

import { VideoPlayer } from '@/components/VideoPlayer'
import { urlFor } from '@/sanity/lib/image'

interface VideoProject {
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
  category?: string
  year?: number
  publishDate?: string
}

interface VideoSectionProps {
  videoProjects: VideoProject[]
}

export function VideoSection({ videoProjects }: VideoSectionProps) {
  return (
    <section id="video" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-[clamp(40px,8vw,80px)] font-extrabold leading-none tracking-tight text-black mb-12">
          Video
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {videoProjects.map((project) => (
            <div key={project._id} className="space-y-3">
              {/* Video Player */}
              <VideoPlayer
                url={project.videoUrl}
                videoFileUrl={project.videoFile?.asset?.url}
                platform={project.platform}
                thumbnail={project.thumbnail ? urlFor(project.thumbnail).url() : undefined}
              />

              {/* Title/Date and Description below player */}
              <div className="text-left">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-bold font-mono text-black text-lg uppercase leading-tight">
                    {project.title}
                  </h3>
                  {project.publishDate && (
                    <span className="font-mono text-sm text-black opacity-60 whitespace-nowrap">
                      {new Date(project.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="font-mono text-sm text-black opacity-80 mt-0.5">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
