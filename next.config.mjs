import { withPayload } from '@payloadcms/next/withPayload'
import { withBotId } from 'botid/next/config'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }],
    // Media filenames are stable, so keep optimized images for 31 days (default is 4 hours).
    minimumCacheTTL: 2678400,
  },
}

export default withBotId(withPayload(nextConfig))
