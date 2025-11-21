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

// Revalidate every 10 seconds in development, 60 seconds in production
export const revalidate = process.env.NODE_ENV === 'development' ? 10 : 60

async function getData() {
  const [albums, filmScores, videoProjects, siteSettings, mammoth] = await Promise.all([
    client.fetch(albumsQuery, {}, { cache: 'no-store' }),
    client.fetch(filmScoresQuery, {}, { cache: 'no-store' }),
    client.fetch(videoProjectsQuery, {}, { cache: 'no-store' }),
    client.fetch(siteSettingsQuery, {}, { cache: 'no-store' }),
    client.fetch(mammothQuery, {}, { cache: 'no-store' }),
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
      {/* Mammoth section */}
      <MammothSection mammoth={mammoth} />
      {/* Video section */}
      {videoProjects.length > 0 && <VideoSection videoProjects={videoProjects} />}
      <Footer
        email={siteSettings.email}
        socialLinks={siteSettings.socialLinks}
      />
    </main>
  )
}
