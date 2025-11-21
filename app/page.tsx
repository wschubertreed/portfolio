import { Navigation } from '@/components/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { MusicSection } from '@/components/sections/MusicSection'
import { FilmSection } from '@/components/sections/FilmSection'
import { VideoSection } from '@/components/sections/VideoSection'
import { Footer } from '@/components/sections/Footer'
import { client } from '@/sanity/lib/client'
import {
  albumsQuery,
  filmScoresQuery,
  videoProjectsQuery,
  siteSettingsQuery,
} from '@/sanity/lib/queries'

async function getData() {
  const [albums, filmScores, videoProjects, siteSettings] = await Promise.all([
    client.fetch(albumsQuery),
    client.fetch(filmScoresQuery),
    client.fetch(videoProjectsQuery),
    client.fetch(siteSettingsQuery),
  ])

  return {
    albums: albums || [],
    filmScores: filmScores || [],
    videoProjects: videoProjects || [],
    siteSettings: siteSettings || {},
  }
}

export default async function Home() {
  const { albums, filmScores, videoProjects, siteSettings } = await getData()

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection
        artistName={siteSettings.artistName}
        bio={siteSettings.bio}
      />
      {albums.length > 0 && <MusicSection albums={albums} />}
      {filmScores.length > 0 && <FilmSection filmScores={filmScores} />}
      {videoProjects.length > 0 && <VideoSection videoProjects={videoProjects} />}
      <Footer
        email={siteSettings.email}
        socialLinks={siteSettings.socialLinks}
      />
    </main>
  )
}
