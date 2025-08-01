/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true, // This might already be here
    // Add the images configuration block
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '', // Keep empty for default port
            pathname: '/do5lofza7/image/upload/**', // Be more specific if you want
        }, ],
    },
};

export default nextConfig;