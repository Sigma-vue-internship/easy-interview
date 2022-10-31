import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { createAuth0 } from "@auth0/auth0-vue";

import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/scss/custom.scss";

const app = createApp(App);
app.use(router);
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
    audience: import.meta.env.VITE_API_AUDIENCE,
  })
);

app.use(createPinia());

app.mount("#app");
