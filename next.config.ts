import withPWA from 'next-pwa'

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  // runtimeCaching: [], // Opcional: estrategias de caching
}

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Otras configuraciones de Next.js...
}

export default withPWA(pwaConfig)(nextConfig)