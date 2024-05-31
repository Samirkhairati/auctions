/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com",
            },
            {
                hostname: "res.cloudinary.com",
            }
        ]
    },
    reactStrictMode: false,
};

export default nextConfig;
