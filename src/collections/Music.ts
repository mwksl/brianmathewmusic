import { CollectionConfig } from 'payload';

const convertToEmbedUrl = (url: string): string => {
  try {
    const spotifyUrl = new URL(url);
    if (spotifyUrl.hostname === 'open.spotify.com') {
      // Remove query parameters
      const pathParts = spotifyUrl.pathname.split('?')[0].split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        const [type, id] = pathParts;
        return `https://open.spotify.com/embed/${type}/${id}`;
      }
    }
  } catch (_) {
    // Invalid URL - ignore error
  }
  return url;
};

export const Music: CollectionConfig = {
  slug: 'music',
  admin: {
    useAsTitle: 'about',
  },
  fields: [
    {
      name: 'about',
      type: 'text',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'spotify_embeds',
      type: 'array',
      fields: [
        {
          name: 'embedUrl',
          type: 'text',
          required: true,
          validate: (value: string | null | undefined) => {
            if (!value) return 'A Spotify URL is required';
            const embedUrl = convertToEmbedUrl(value);
            if (!embedUrl.startsWith('https://open.spotify.com/embed/')) {
              return 'Must be a valid Spotify URL (artist, album, track, or playlist)';
            }
            return true;
          },
          hooks: {
            beforeValidate: [
              ({ value }: { value?: string | null | undefined } = {}) => {
                if (!value) return '';
                return convertToEmbedUrl(value);
              },
            ],
          },
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
  ],
};
