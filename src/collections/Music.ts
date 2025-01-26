import { CollectionConfig } from 'payload'

const convertToEmbedUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname === 'open.spotify.com') {
      const path = urlObj.pathname
      return `https://open.spotify.com/embed${path}`
    }
    if (urlObj.hostname === 'spotify.link') {
      // Handle Spotify short links
      return url.replace('spotify.link', 'open.spotify.com/embed')
    }
  } catch (e) {
    // If URL parsing fails, return original
    return url
  }
  return url
}

export const Music: CollectionConfig = {
  slug: 'music',
  admin: {
    useAsTitle: 'about',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false, // Making this optional for now
      admin: {
        description: 'Title for the music page',
      },
    },
    {
      name: 'about',
      type: 'textarea',
      required: true,
    },
    {
      name: 'spotify_embeds',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'embedUrl',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    // Adding new fields as optional
    {
      name: 'spotifyEmbed',
      type: 'textarea',
      label: 'Spotify Embed Code',
      admin: {
        description: 'Paste the Spotify embed code here',
      },
      required: false,
    },
    {
      name: 'spotifyUrl',
      type: 'text',
      label: 'Spotify Profile URL',
      required: false,
    },
    {
      name: 'instagramUrl',
      type: 'text',
      label: 'Instagram Profile URL',
      required: false,
    },
    {
      name: 'bandcampUrl',
      type: 'text',
      label: 'Bandcamp Profile URL',
      required: false,
    },
    {
      name: 'appleMusicUrl',
      type: 'text',
      label: 'Apple Music Profile URL',
      required: false,
    },
  ],
}

export default Music
