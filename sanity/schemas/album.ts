import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'album',
  title: 'Music - Wiley Beckett',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
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
      title: 'title',
      spotifyUrl: 'spotifyEmbedUrl',
    },
    prepare({ title, spotifyUrl }) {
      const albumId = spotifyUrl?.split('/').pop()?.split('?')[0] || 'Unknown'
      return {
        title: title || 'Spotify Album',
        subtitle: albumId.slice(0, 22),
      }
    },
  },
})
