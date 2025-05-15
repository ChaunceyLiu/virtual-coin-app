import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gmgn.ai",
        port: "",
        pathname: "/external-res/**", // 精确匹配图片路径
      },
      // 备用方案：允许所有路径
      {
        protocol: "https",
        hostname: "gmgn.ai",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
