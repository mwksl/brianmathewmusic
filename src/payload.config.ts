// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig, inMemoryKVAdapter } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { MediaWithPrefix } from './collections/MediaWithPrefix'
import { Pages } from './collections/Pages'
import { Discography } from './collections/Discography'
import { Navigation } from './collections/Navigation'
import { Studio } from './collections/Studio'
import { Music } from './collections/Music'
import { Forms } from './collections/Forms'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, MediaWithPrefix, Pages, Discography, Navigation, Studio, Music, Forms],
  editor: lexicalEditor(),
  // Default KV adapter needs a payload_kv table that prod doesn't have (see Users.ts).
  kv: inMemoryKVAdapter(),
  secret: process.env.PAYLOAD_SECRET || '',
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || '',
    defaultFromName: 'Brian Mathew Music',
    defaultFromAddress: 'hello@contact.brianmathewmusic.com', // Using verified domain
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
        'media-with-prefix': {
          prefix: 'bmm',
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
