/** @type {import('next').NextConfig} */
const nextConfig = {
    // Pin the file-tracing root to this project so the Netlify/standalone build
    // doesn't get confused by other lockfiles higher up the tree.
    outputFileTracingRoot: import.meta.dirname,
    // Ensure LOG.md is bundled into the /log server function (it reads the file at request time).
    outputFileTracingIncludes: {
        "/log": ["./LOG.md"],
    },
    experimental: {
        optimizePackageImports: ["@untitledui/icons", "@untitledui-pro/icons"],
    },
};

export default nextConfig;
