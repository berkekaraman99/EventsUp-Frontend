import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { plugin as formKitPlugin } from "@formkit/vue";
import { formkitConfig } from "./configs/formkit.config";
import { i18n } from "./configs/i18n.config";
import TheToast from "@/components/shared/TheToast.vue";

//THEME OR CSS
import "@/assets/css/style.scss";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(formKitPlugin, formkitConfig);
app.use(i18n);

app.component("the-toast", TheToast);

app.mount("#app");
