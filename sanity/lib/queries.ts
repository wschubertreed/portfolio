import { groq } from 'next-sanity'

export const albumsQuery = groq`
  *[_type == "album"] | order(order asc, year desc) {
    _id,
    title,
    artist,
    year,
    albumArt,
    spotifyEmbedUrl,
    description,
    order
  }
`

export const filmScoresQuery = groq`
  *[_type == "filmScore"] | order(order asc, year desc) {
    _id,
    title,
    description,
    thumbnail,
    videoFile {
      asset-> {
        url
      }
    },
    videoUrl,
    platform,
    year,
    order
  }
`

export const videoProjectsQuery = groq`
  *[_type == "videoProject"] | order(order asc, year desc) {
    _id,
    title,
    description,
    thumbnail,
    videoFile {
      asset-> {
        url
      }
    },
    videoUrl,
    platform,
    category,
    year,
    order
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    artistName,
    bio,
    profileImage,
    email,
    socialLinks
  }
`

export const mammothQuery = groq`
  *[_type == "mammoth"][0] {
    image,
    title,
    description
  }
`
