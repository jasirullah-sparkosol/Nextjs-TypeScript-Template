/** @type {import('next').NextConfig} */

const NODE_ENV = process.env.NODE_ENV;

const nextConfig = {
    modularizeImports: {
        '@mui/material': {
            transform: '@mui/material/{{member}}',
        }, '@mui/lab': {
            transform: '@mui/lab/{{member}}',
        },
    }, images: {
        remotePatterns: [{
            protocol: 'https', hostname: 'flagcdn.com', pathname: '**',
        }],
    }, env: {
        // Version
        NEXT_APP_VERSION: process.env.REACT_APP_VERSION,
        NEXT_APP_NAME: process.env.REACT_APP_NAME || 'Next.js-TypeScript-Template',

        // Backend API URL
        NEXT_APP_API_URL: NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_LIVE : process.env.REACT_APP_API_URL_LOCAL,

        // Next Auth
        NEXTAUTH_URL: NODE_ENV === 'production' ? process.env.NEXTAUTH_URL_LIVE : process.env.NEXTAUTH_URL_LOCAL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET_KEY,
        NEXTAUTH_SECRET_KEY: process.env.NEXTAUTH_SECRET_KEY,

        // JWT
        NEXT_APP_JWT_SECRET: process.env.REACT_APP_JWT_SECRET,
        NEXT_APP_JWT_TIMEOUT: process.env.REACT_APP_JWT_TIMEOUT,
    },
};

module.exports = nextConfig;
