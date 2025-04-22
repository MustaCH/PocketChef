import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  // runtimeCaching: [], // Opcional: estrategias de caching
}

const nextConfig: NextConfig = withPWA(pwaConfig)({
  // Aquí van tus configuraciones de Next.js
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Otras configuraciones de Next.js...
})

export default nextConfig