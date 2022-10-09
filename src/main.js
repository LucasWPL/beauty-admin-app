import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";
import Maska from "maska";
import axios from 'axios'

function loggedIn() {
    return localStorage.getItem('accessToken');
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.guest)) {
        next()
    } else {
        if (!loggedIn()) {
            next({
                path: '/signin',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
            axios.defaults.headers.common['Authorization'] = `Bearer ${loggedIn()}`
        }
    }
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        localStorage.removeItem('accessToken');
        router.push('/signin');
    } else {
        return Promise.reject(error);
    }
});

const appInstance = createApp(App);
appInstance.use(store);
appInstance.use(router);
appInstance.use(Maska);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
