import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  
  devIndicators: false,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: new URL(process.env.NEXT_PUBLIC_API_HOST!).hostname,
        port: new URL(process.env.NEXT_PUBLIC_API_HOST!).port,
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig