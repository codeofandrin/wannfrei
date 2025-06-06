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
    }
}
