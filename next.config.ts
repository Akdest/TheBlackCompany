import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['media.istockphoto.com'], // ✅ External image domain allowed
  },
};

export default nextConfig;
