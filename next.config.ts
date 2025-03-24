const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://52.79.233.55:4000/api/:path*",
      },
    ];
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
