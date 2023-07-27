import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { description, name } from "./meta";
import { pwa } from "./plugins/pwa";

// https://vitepress.dev/reference/site-config
export default withPwa(
  defineConfig({
    pwa,
    outDir: "../dist",
    title: name,
    description,
    lastUpdated: true,
    useWebFonts: false,
    markdown: {
      lineNumbers: true,
    },
    locales: {
      root: { label: "简体中文", lang: "zh-CN" },
    },
    themeConfig: {},

    async buildEnd(siteConfig) {
      // await sitemap({ hostname: "https://alili.fun/" });
      // await genFeed(siteConfig);
    },
  }),
);
