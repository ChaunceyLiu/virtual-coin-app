import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["gmgn.ai"],
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "gmgn.ai",
      port: "",
      pathname: "/static/**",
    },
  ],
};

export default nextConfig;
