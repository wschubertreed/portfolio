'use client'

import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })

interface VideoPlayerProps {
  url: string
  platform?: string
  thumbnail?: string
}

export function VideoPlayer({ url, platform, thumbnail }: VideoPlayerProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-black bg-black">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        light={thumbnail}
        playing={false}
        config={{
          youtube: {
            playerVars: { showinfo: 1 }
          },
          vimeo: {
            playerOptions: { byline: false }
          }
        }}
      />
    </div>
  )
}
