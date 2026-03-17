import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // outputFileTracingRoot: path.resolve(__dirname, '../../'),
  /* config options here */
  output: 'standalone', // Docker部署必需
  allowedDevOrigins: ['*.dev.coze.site'],
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lf-coze-web-cdn.coze.cn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.volces.com', // 火山引擎对象存储
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.tos-cn-beijing.volces.com', // 火山引擎TOS
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
