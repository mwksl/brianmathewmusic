import { withPayload } from '@payloadcms/next/withPayload'
import { withBotId } from 'botid/next/config'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
}

export default withBotId(withPayload(nextConfig))
