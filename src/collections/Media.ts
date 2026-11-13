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
  upload: {
    // Cap stored originals: some uploads were 8+ MB, which slows every first (uncached) image load.
    // next/image still generates smaller sizes per device from this.
    resizeOptions: { width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true },
  },
}