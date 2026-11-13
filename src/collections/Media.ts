import type { CollectionConfig } from 'payload'
import { revalidateHooks } from '@/utilities/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: revalidateHooks('media'),
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}