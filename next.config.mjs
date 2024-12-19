// Attempt to dynamically import a user-defined configuration
let userConfig = undefined;
try {
  userConfig = await import('./next.config.js');
} catch (e) {
  // Ignore the error if the user-defined config is not found
  console.warn('User-defined next.config.js not found, using default configuration.');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds
  },
  images: {
    unoptimized: true, // Use unoptimized images
    domains: [
      'barkprotocol.com',
      'uploadcare.com',
      'images.unsplash.com',
    ],
  },
  experimental: {
    webpackBuildWorker: true, // Enable webpack build worker
    parallelServerBuildTraces: true, // Enable parallel server build traces
    parallelServerCompiles: true, // Enable parallel server compiles
  },
};

// Merge the default configuration with the user configuration if available
mergeConfig(nextConfig, userConfig?.default || {});

/**
 * Merges user configuration with the default configuration
 * @param {object} nextConfig - Default Next.js configuration
 * @param {object} userConfig - User-defined configuration
 */
function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return;
  }

  for (const key in userConfig) {
    if (typeof nextConfig[key] === 'object' && !Array.isArray(nextConfig[key])) {
      // Merge nested objects
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      };
    } else {
      // Override other properties
      nextConfig[key] = userConfig[key];
    }
  }
}

export default nextConfig;
