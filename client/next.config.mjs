/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    const base = process.env.NEXT_PUBLIC_API_URL;
    if (!base) return [];
    const origin = base.replace(/\/$/, "");
    return [
      {
        source: "/api/content/:path*",
        destination: `${origin}/content/:path*`,
      },
    ];
  },
};

export default nextConfig;
