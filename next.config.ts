import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mupdf"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hngtpbvmmsnwaxwlxsgh.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default nextConfig;
