/** @type {import('next').NextConfig} */
const nextConfig = {
 
  basePath: '/Geology',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_TO: process.env.EMAIL_TO,
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