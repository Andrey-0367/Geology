/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'geologiya-ru.ru',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.geologiya-ru.ru',
        port: '',
        pathname: '/media/**',
      }
    ],
    unoptimized: true,
  },

  
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'three/examples/jsm/controls/OrbitControls': 'three/examples/jsm/controls/OrbitControls.js',
      'three/examples/jsm/loaders/GLTFLoader': 'three/examples/jsm/loaders/GLTFLoader.js'
    };
    return config;
  }
}

module.exports = nextConfig;