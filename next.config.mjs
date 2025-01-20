/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  productionBrowserSourceMaps: true,
  webpack: (config, { dev }) => {
    if (!dev) {
      config.optimization.minimize = false;
      config.optimization.splitChunks = false;
      config.optimization.runtimeChunk = false;
    }
    return config;
  }
};

export default nextConfig;
