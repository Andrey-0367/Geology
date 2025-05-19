/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');

module.exports = {
  output: 'export',
  basePath: '/Geology',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    // Создаем папку out, если её нет
    const outDir = path.join(__dirname, 'out');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    
    // Создаем .nojekyll файл
    fs.writeFileSync(path.join(outDir, '.nojekyll'), '');
    
    config.resolve.alias = {
      ...config.resolve.alias,
      'three/examples/jsm/controls/OrbitControls': 'three/examples/jsm/controls/OrbitControls.js',
      'three/examples/jsm/loaders/GLTFLoader': 'three/examples/jsm/loaders/GLTFLoader.js'
    };
    return config;
  }
}