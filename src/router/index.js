import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Schedules from "../views/grids/Schedules.vue";
import Procedures from "../views/grids/Procedures.vue";
import Costumers from "../views/grids/Costumers.vue";
import CostumerForm from "../views/forms/Costumer.vue";
import ScheduleForm from "../views/forms/Schedule.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/schedules",
    name: "Agendamentos",
    component: Schedules,
  },
  {
    path: "/procedures",
    name: "Procedimentos",
    component: Procedures,
  },
  {
    path: "/costumers",
    name: "Clientes",
    component: Costumers,
  },
  {
    path: "/new-costumer",
    name: "Cadastro cliente",
    component: CostumerForm,
  },
  {
    path: "/new-schedule",
    name: "Cadastro agendamento",
    component: ScheduleForm,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
