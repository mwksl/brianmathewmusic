import { CollectionConfig } from 'payload'
import { revalidate } from '@/utilities/revalidate';

export const MediaWithPrefix: CollectionConfig = {
  slug: 'media-with-prefix',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        if (req.payload) {
          await revalidate({
            collection: 'media-with-prefix',
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
            collection: 'media-with-prefix',
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