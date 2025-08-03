// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"

if (!process.env.IS_DEV) {
    console.log("sentry.server.config")
    Sentry.init({
        dsn: "https://c64596854d74d7ae5a99917f8786625c@o4508083247382528.ingest.de.sentry.io/4509717546532944",

        // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
        tracesSampleRate: 1,

        // Setting this option to true will print useful information to the console while you're setting up Sentry.
        debug: false,

        // set environment
        environment: process.env.IS_DEV ? "development" : process.env.NODE_ENV
    })
}
