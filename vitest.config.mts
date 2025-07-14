import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    watch: false,
    dir: "./testing/unit",
    reporters: ["default", "html"],
    outputFile: "./.vitest/report/html/index.html"
  }
})
