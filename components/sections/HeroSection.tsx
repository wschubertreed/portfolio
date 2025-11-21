'use client'

interface HeroSectionProps {
  artistName?: string
  bio?: string
}

export function HeroSection({ artistName = 'Wildman', bio }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary pt-20">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-[clamp(60px,12vw,160px)] font-extrabold leading-none tracking-tight text-black mb-8">
          {artistName}
        </h1>
        {bio && (
          <p className="text-xl md:text-2xl text-black max-w-3xl mx-auto leading-relaxed font-medium font-mono">
            {bio}
          </p>
        )}
        <div className="mt-12">
          <button
            onClick={() => {
              document.querySelector('#music')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-black text-lg font-semibold hover:opacity-70 transition-opacity"
          >
            ↓ Explore Work
          </button>
        </div>
      </div>
    </section>
  )
}
