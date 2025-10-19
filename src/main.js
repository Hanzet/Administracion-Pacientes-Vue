import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// PrimeVue
import PrimeVue from "primevue/config";
import lara from "@primevue/themes/lara";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: lara,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false, // Deshabilitamos cssLayer para evitar conflictos
    },
  },
});
app.use(ToastService);
app.mount("#app");
