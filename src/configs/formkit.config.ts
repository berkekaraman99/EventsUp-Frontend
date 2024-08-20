import { defaultConfig } from "@formkit/vue";
import { tr } from "@formkit/i18n";
import { createFloatingLabelsPlugin, createMultiStepPlugin } from "@formkit/addons";
import "@formkit/themes/genesis";
import "@formkit/addons/css/multistep";

export const formkitConfig = defaultConfig({
  plugins: [
    createMultiStepPlugin(),
    createFloatingLabelsPlugin({
      useAsDefault: false,
    }),
  ],
  locales: { tr },
  locale: "tr",
});
