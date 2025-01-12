import { CollectionConfig } from 'payload';

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
      name: 'spotifyEmbeds',
      type: 'array',
      fields: [
        {
          name: 'embedUrl',
          type: 'text',
          required: true,
          validate: (value) => {
            if (!value.startsWith('https://open.spotify.com/embed/')) {
              return 'Must be a valid Spotify embed URL';
            }
            return true;
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
