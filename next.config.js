module.exports = {
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    async headers() {
        return [
            {
                // Sets security headers for all routes
                source: '/(.*)?',
                headers: [
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), geolocation=(), microphone=()',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                ],
            },
        ];
    },
    optimizeFonts: false,
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.pdf/,
            type: 'asset/resource',
            generator: {
                filename: 'static/[hash][ext]',
            },
            parser: { amd: false }
        });
        return config;
    },
    staticPageGenerationTimeout: 1000,
    output: 'standalone',
};
