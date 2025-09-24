import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    devIndicators: false,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `http://10.0.0.87:7777/:path*`,
            },
        ]
    },
}

export default nextConfig
