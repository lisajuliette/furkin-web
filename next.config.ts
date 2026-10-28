import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  // A package-lock.json in the parent folder would otherwise be treated as the workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
