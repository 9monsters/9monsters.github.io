import type { VitePWAOptions } from "vite-plugin-pwa";
import fg from "fast-glob";
import { resolve } from "pathe";

export const pwa: Partial<VitePWAOptions> = {
  outDir: "../dist",
  registerType: "autoUpdate",
  // include all static assets under public/
  includeAssets: fg.sync("**/*.{png,svg,gif,ico,txt}", {
    cwd: resolve(__dirname, "../../public"),
  }),
  manifest: {},
};
