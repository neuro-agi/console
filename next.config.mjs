/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.externals = {
        react: 'React',
        'react-dom': 'ReactDOM',
      };
    }
    return config;
  },
};

export default nextConfig;
