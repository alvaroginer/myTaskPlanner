import { createApp } from "vue";
import { store } from "./lib/store";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Iconos opcionales (Material Design Icons)
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
});

await store.dispatch("initFirebaseAuth");

createApp(App).use(router).use(store).use(vuetify).mount("#app");
