import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '30mb' 
    },
    responseLimit: '30mb'
  }
};

export default withPayload(nextConfig);
