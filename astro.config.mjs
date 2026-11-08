// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// The organisation's site, served by GitHub Pages at the root of kastoria-dev-core.github.io.
// Greek at /, English at /en/.
export default defineConfig({
  site: "https://kastoria-dev-core.github.io",
  i18n: {
    defaultLocale: "el",
    locales: ["el", "en"],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
