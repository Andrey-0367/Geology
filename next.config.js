/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/Geology',
  
  output: 'export',
  
  distDir: 'out',
  
  images: {
    unoptimized: true,
  },
  
  trailingSlash: true,
}

module.exports = nextConfig;