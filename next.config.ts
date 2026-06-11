/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/uploads/**',
      },
    ],
  },

  // 🌟 ফিক্সড প্রক্সি: শুধুমাত্র ব্যাকএন্ডের এন্ডপয়েন্টগুলো রিরাইট হবে, NextAuth সুরক্ষিত থাকবে
  async rewrites() {
    return [
      {
        source: '/api/user/:path*', // /api/user/all বা /api/user/email এটার আওতায় পড়বে
        destination: 'http://localhost:8080/user/:path*',
      },
      {
        source: '/api/delete/:path*', // /api/delete/1 এটার আওতায় পড়বে
        destination: 'http://localhost:8080/delete/:path*',
      },
    ];
  },
};

export default nextConfig;