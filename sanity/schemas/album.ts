import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'album',
  title: 'Music - Wiley Beckett',
  type: 'document',
  fields: [
    defineField({
      name: 'spotifyEmbedUrl',
      title: 'Spotify URL',
      type: 'url',
      description: 'Paste any Spotify album/track/playlist URL (e.g., https://open.spotify.com/album/6QOtppixtmohxxNgvWggeP). It will automatically convert to embed format.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'text',
      rows: 3,
      description: 'Add context or notes about this album (appears above the player)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      spotifyUrl: 'spotifyEmbedUrl',
      description: 'description',
    },
    prepare({ spotifyUrl, description }) {
      const albumId = spotifyUrl?.split('/').pop()?.split('?')[0] || 'Unknown'
      return {
        title: description || 'Spotify Album',
        subtitle: albumId.slice(0, 22),
      }
    },
  },
})
