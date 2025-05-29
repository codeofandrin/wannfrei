import type { NextConfig } from "next"

module.exports = {
    webpack(config: NextConfig) {
        config.module.rules.push(
            {
                test: /\.svg$/i,
                use: ["@svgr/webpack"]
            },

            {
                test: /\.md$/,
                loader: "raw-loader"
            }
        )

        return config
    },
    async redirects() {
        return [
            {
                source: "/:path(.{1,})", // this will redirect any other paths to `/`
                destination: "/",
                permanent: true
            },
            {
                source: "/404",
                destination: "/",
                permanent: true
            }
        ]
    }
}
