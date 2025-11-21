import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Release Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'albumArt',
      title: 'Album Artwork',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'spotifyEmbedUrl',
      title: 'Spotify Embed URL',
      type: 'url',
      description: 'The Spotify embed URL (e.g., https://open.spotify.com/embed/album/...)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artist',
      media: 'albumArt',
    },
  },
})
