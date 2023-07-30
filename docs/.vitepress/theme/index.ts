import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faBilibili } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { inBrowser, useRoute } from "vitepress";
import type { EnhanceAppContext, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, onMounted, watch } from "vue";
import mediumZoom from "medium-zoom";
import busuanzi from "busuanzi.pure.js";

import googleAnalytics from "./plugins/googleAnalytics";
import {
  registerAnalytics,
  siteIds,
  trackPageview,
} from "./plugins/baidutongji";

import "./styles/main.less";

library.add(faUserSecret, faBilibili);

if (inBrowser) {
  import("./plugins/pwa");
}

const theme: Theme = {
  ...DefaultTheme,

  enhanceApp({ app, router }: EnhanceAppContext): void {
    app.component("FontAwesomeIcon", FontAwesomeIcon);
    googleAnalytics({
      id: "G-aaa",
    });
    if (inBrowser) {
      registerAnalytics(siteIds);

      window.addEventListener("hashchange", () => {
        const { href: url } = window.location;
        trackPageview(siteIds, url);
      });

      router.onAfterRouteChanged = (to) => {
        trackPageview(siteIds, to);
        busuanzi.fetch();
      };
    }
  },

  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom(".main img", { background: "var(--vp-c-bg)" }); // Should there be a new?
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom()),
    );
  },
};

export default theme;
