import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { MusicSection } from '@/components/sections/MusicSection'
import { MammothSection } from '@/components/sections/MammothSection'
import { VideoSection } from '@/components/sections/VideoSection'
import { Footer } from '@/components/sections/Footer'
import { client } from '@/sanity/lib/client'
import {
  albumsQuery,
  filmScoresQuery,
  videoProjectsQuery,
  siteSettingsQuery,
  mammothQuery,
} from '@/sanity/lib/queries'

// Static generation with on-demand revalidation via Sanity webhook
// In dev, revalidate every 10 seconds for quick iteration
// In prod, cache indefinitely until webhook triggers revalidation
export const revalidate = process.env.NODE_ENV === 'development' ? 10 : false

async function getData() {
  const [albums, filmScores, videoProjects, siteSettings, mammoth] = await Promise.all([
    client.fetch(albumsQuery),
    client.fetch(filmScoresQuery),
    client.fetch(videoProjectsQuery),
    client.fetch(siteSettingsQuery),
    client.fetch(mammothQuery),
  ])

  return {
    albums: albums || [],
    filmScores: filmScores || [],
    videoProjects: videoProjects || [],
    siteSettings: siteSettings || {},
    mammoth: mammoth || null,
  }
}

export default async function Home() {
  const { albums, filmScores, videoProjects, siteSettings, mammoth } = await getData()

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection
        artistName={siteSettings.artistName}
        bio={siteSettings.bio}
      />
      {/* Music section with Wiley Beckett and Film Scoring */}
      {(albums.length > 0 || filmScores.length > 0) && (
        <MusicSection albums={albums} filmScores={filmScores} />
      )}
      {/* Video section */}
      {videoProjects.length > 0 && <VideoSection videoProjects={videoProjects} />}
      {/* Mammoth section */}
      <MammothSection mammoth={mammoth} />
      <Footer
        email={siteSettings.email}
        socialLinks={siteSettings.socialLinks}
      />
    </main>
  )
}
