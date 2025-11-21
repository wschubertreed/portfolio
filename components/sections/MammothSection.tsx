'use client'

import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

interface MammothData {
  image?: any
  title?: string
  description?: string
}

interface MammothSectionProps {
  mammoth: MammothData | null
}

export function MammothSection({ mammoth }: MammothSectionProps) {
  if (!mammoth || !mammoth.image || !mammoth.title) {
    return null
  }

  return (
    <section id="mammoth" className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-[clamp(40px,8vw,80px)] font-extrabold leading-none tracking-tight text-black mb-12">
          Mammoth
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image on the left */}
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border-2 border-black">
            <Image
              src={urlFor(mammoth.image).width(800).height(800).url()}
              alt={mammoth.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Text on the right */}
          <div className="space-y-4">
            <h3 className="font-bold font-mono uppercase text-black text-2xl leading-tight">
              {mammoth.title}
            </h3>
            {mammoth.description && (
              <p className="font-mono text-base text-black opacity-80 whitespace-pre-wrap">
                {mammoth.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
