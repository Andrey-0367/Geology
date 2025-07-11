/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  trailingSlash: true,
  output: "export",
  trailingSlash: true,

  images: {
    unoptimized: true,
    domains: ["api.geologiya-ru.ru", "geologiya-ru.ru", "www.geologiya-ru.ru"],
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "three/examples/jsm/controls/OrbitControls":
        "three/examples/jsm/controls/OrbitControls.js",
      "three/examples/jsm/loaders/GLTFLoader":
        "three/examples/jsm/loaders/GLTFLoader.js",
    };
    return config;
  },
};

module.exports = nextConfig;
