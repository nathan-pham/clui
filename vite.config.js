import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxImportSource: "@emotion/react",
            babel: {
                plugins: ["@emotion/babel-plugin"],
            },
        }),
    ],
    esbuild: {
        jsxFactory: `jsx`,
        jsxInject: `import { jsx, css } from "@emotion/react"`,
    },
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "./src/components")
        }
    }
});
