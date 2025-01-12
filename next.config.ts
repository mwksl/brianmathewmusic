import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  api: {
    bodyParser: false, // Disabling body parser for streams
    responseLimit: false,
  },
};

export default withPayload(nextConfig);
