// @ts-check
import { defineConfig } from "astro/config";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";
import relativeLinks from "astro-relative-links";

const __dirname = path.resolve();

// https://astro.build/config
export default defineConfig({
  integrations: [relativeLinks()],
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, "./src/scripts/*.js"),
            dest: path.resolve(__dirname, "./dist/js"),
          },
          {
            src: path.resolve(__dirname, "./src/fonts"),
            dest: path.resolve(__dirname, "./dist/"),
          },
          {
            src: path.resolve(__dirname, "./src/styles"),
            dest: path.resolve(__dirname, "./dist/"),
          },
        ],
      }),
    ],
  },
  publicDir: "./src/public",
  build: {
    format: "file",
    inlineStylesheets: `never`,
  },
  devToolbar: {
    enabled: false,
  },
});
