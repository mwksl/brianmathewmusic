import { CollectionConfig } from 'payload';
import { revalidate } from '@/utilities/revalidate'

export const Discography: CollectionConfig = {
  slug: 'discography',
  admin: {
    useAsTitle: 'albumTitle',
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (req.payload) {
          await revalidate({
            collection: 'discography',
            doc,
            payload: req.payload,
          });
        }
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        if (req.payload) {
          await revalidate({
            collection: 'discography',
            doc,
            payload: req.payload,
          });
        }
      },
    ],
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
