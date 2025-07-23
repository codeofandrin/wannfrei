import type { NextConfig } from "next"
import { withSentryConfig } from "@sentry/nextjs";

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

        return withSentryConfig(config, {
            org: "puncher1",
            project: "dev-srfvirus-spotify",

            // Only print logs for uploading source maps in CI
            // Set to `true` to suppress logs
            silent: !process.env.CI,

            // Automatically tree-shake Sentry logger statements to reduce bundle size
            disableLogger: true,
        })
    }
}
