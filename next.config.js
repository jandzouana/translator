/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_KEY: process.env.API_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY
    },
}

module.exports = nextConfig
