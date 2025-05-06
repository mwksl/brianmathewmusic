import type { CollectionConfig } from 'payload'
import { revalidate } from '@/utilities/revalidate';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (req.payload) {
          await revalidate({
            collection: 'media',
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
            collection: 'media',
            doc,
            payload: req.payload,
          });
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}