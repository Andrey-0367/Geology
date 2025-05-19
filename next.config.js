/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/Geology',
  
  output: 'export',
  
  distDir: 'out',
  
  images: {
    unoptimized: true,
  },
  
  trailingSlash: true,
  
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