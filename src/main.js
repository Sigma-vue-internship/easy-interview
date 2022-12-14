import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { createAuth0 } from "@auth0/auth0-vue";
import App from "./App.vue";

// import "./assets/scss/custom.scss";

import components from "@/components/common";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFilter,
  faBars,
  faMagnifyingGlass,
  faTrashCan,
  faUserPlus,
  faCircleInfo,
  faCircleCheck,
  faCircleQuestion,
  faArrowDownShortWide,
  faTags,
  faCalendarDays,
  faUser,
  faChevronDown,
  faSquareXmark,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faFaceFrown, faClock, faSquareMinus,
  faSquarePlus, } from "@fortawesome/free-regular-svg-icons";
import "./assets/fonts/css/fontello.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/scss/custom.scss";
import axiosInstance from "./service/axiosInstance";
import RadialProgressBar from "vue3-radial-progress";

const app = createApp(App);
const pinia = createPinia();
pinia.use(() => ({ $axios: axiosInstance }));

app.use(pinia);
app.use(RadialProgressBar);

library.add(
  faFilter,
  faLinkedin,
  faBars,
  faMagnifyingGlass,
  faTrashCan,
  faUserPlus,
  faFaceFrown,
  faCircleInfo,
  faSquarePlus,
  faSquareMinus,
  faArrowDownShortWide,
  faCircleCheck,
  faCircleQuestion,
  faTags,
  faCalendarDays,
  faClock,
  faUser,
  faChevronDown,
  faSquareXmark,
  faPencil,
);

app.use(router);
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
    audience: import.meta.env.VITE_API_AUDIENCE,
  }),
);

components.forEach(component => {
  app.component(component.name, component);
});
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
