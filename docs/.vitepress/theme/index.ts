import { inBrowser, useRoute } from "vitepress";
import type { EnhanceAppContext, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, onMounted, watch } from "vue";
import mediumZoom from "medium-zoom";
import "./style.css";

if (inBrowser) {
  import("./plugins/pwa");
}

const theme: Theme = {
  ...DefaultTheme,

  enhanceApp({ router }: EnhanceAppContext) {
    // ...
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
