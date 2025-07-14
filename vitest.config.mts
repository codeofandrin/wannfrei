import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: "jsdom",
        watch: true,
        dir: "./testing/unit",
        setupFiles: "./testing/vitest-setup.ts",
        reporters: ["default"],
    }
})
