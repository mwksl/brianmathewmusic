import { CollectionConfig } from 'payload/types'

export const MediaWithPrefix: CollectionConfig = {
  slug: 'media-with-prefix',
  access: {
    read: () => true,
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
