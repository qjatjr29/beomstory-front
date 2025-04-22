/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/user-service/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_END_POINT}/user-service/:path*`,
        },
      ]
    },
  };
  
  export default nextConfig;