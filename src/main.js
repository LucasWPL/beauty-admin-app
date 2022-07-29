import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import Maska from "maska";

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(Maska);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
