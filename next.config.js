/** @type {import('next').NextConfig} */
const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');

module.exports = {
  output: 'export',
  basePath: '/Geology',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {

    const outDir = join(__dirname, 'out');
    if (!existsSync(outDir)) mkdirSync(outDir);
    writeFileSync(join(outDir, '.nojekyll'), '');
    
   
    config.resolve.alias = {
      ...config.resolve.alias,
      'three/examples/jsm/controls/OrbitControls': 'three/examples/jsm/controls/OrbitControls.js',
      'three/examples/jsm/loaders/GLTFLoader': 'three/examples/jsm/loaders/GLTFLoader.js'
    };
    return config;
  }
}