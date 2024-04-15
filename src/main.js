import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./routes/Routes.js";
import { createPinia } from "pinia";
import { Quasar, Notify, Dialog } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import axios from "axios";
import { createPersistedState } from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();
pinia.use(
  createPersistedState({
    storage: sessionStorage,
  })
);

app.use(Quasar, {
  plugins: {
    Notify,
    Dialog,
  },
});

app.use(pinia);

app.use(router);
  // axios.defaults.baseURL = "https://backendproyectofinal-1avx.onrender.com/api/";
  axios.defaults.baseURL ="http://localhost:4000/api/"

app.mount("#app");
