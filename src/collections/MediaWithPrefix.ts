import { CollectionConfig } from 'payload'
import { revalidateHooks } from '@/utilities/revalidate'

export const MediaWithPrefix: CollectionConfig = {
  slug: 'media-with-prefix',
  access: {
    read: () => true,
  },
  hooks: revalidateHooks('media-with-prefix'),
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}