

/** @type {import('next').NextConfig} */


import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: 'public',
    cacheOnFrontEndNav: true,
    aggressiveFrontendNavCaching: true,
    reloadOnOnline: true,
    swcMinify: true,
    disable: false,
    workboxOptions: {
        disableDevLogs: true
    },
})

export default withPWA({
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
});


// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 hostname: "lh3.googleusercontent.com",
//             },
//             {
//                 hostname: "res.cloudinary.com",
//             }
//         ]
//     },
//     reactStrictMode: false,
// };

// export default nextConfig;
