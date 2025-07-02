/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'liangchow.github.io',
                port: '',
                pathname: '/assets/img/profile/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
