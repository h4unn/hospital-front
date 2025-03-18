import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://52.79.233.55:4000/api/:path*",
      },
      {
        source: "/api/auth/:path*",
        destination: "http://52.79.233.55:4000/api/:path*",
      },
      {
        source: "/api/auth/login/:path*",
        destination: "http://52.79.233.55:4000/api/:path*",
      },
    ];
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default nextConfig;
