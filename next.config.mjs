/** @type {import('next').NextConfig} */
const nextConfig = {
    // Pin the file-tracing root to this project so the Netlify/standalone build
    // doesn't get confused by other lockfiles higher up the tree.
    outputFileTracingRoot: import.meta.dirname,
    experimental: {
        optimizePackageImports: ["@untitledui/icons", "@untitledui-pro/icons"],
    },
};

export default nextConfig;
