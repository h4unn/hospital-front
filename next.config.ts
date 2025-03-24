const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://3.35.2.159:4000/api/:path*`,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
  },
};
export default nextConfig;
