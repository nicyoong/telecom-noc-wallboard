/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Auto-optimize for large screen rendering
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
