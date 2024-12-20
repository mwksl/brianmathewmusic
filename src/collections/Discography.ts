import { CollectionConfig } from 'payload';

export const Discography: CollectionConfig = {
  slug: 'discography',
  admin: {
    useAsTitle: 'albumTitle',
  },
  fields: [
    {
      name: 'albumTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'artist',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'array',
      fields: [
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Mixer', value: 'mixer' },
            { label: 'Master', value: 'master' },
            { label: 'Producer', value: 'producer' },
            { label: 'Engineer', value: 'engineer' },
          ],
        },
      ],
    },
    {
      name: 'spotifyUrl',
      type: 'text',
      required: true,
    },
    {
      name: 'coverArt',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
};
