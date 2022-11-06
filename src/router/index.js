import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Schedules from "../views/grids/Schedules.vue";
import Procedures from "../views/grids/Procedures.vue";
import Costumers from "../views/grids/Costumers.vue";
import CostumerForm from "../views/forms/Costumer.vue";
import ProcedureForm from "../views/forms/Procedure.vue";
import ScheduleForm from "../views/forms/Schedule.vue";
import DeleteSchedule from "../views/actions/Schedule/DeleteSchedule.vue";
import FinishSchedule from "../views/actions/Schedule/FinishSchedule.vue";
import DeleteProcedure from "../views/actions/DeleteProcedure.vue";
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
    path: "/add-procedure",
    name: "add-procedure",
    component: ProcedureForm,
  },
  {
    path: "/edit-procedure",
    name: "edit-procedure",
    component: ProcedureForm,
  },
  {
    path: "/delete-procedure",
    name: "delete-procedure",
    component: DeleteProcedure,
  },
  {
    path: "/costumers",
    name: "Clientes",
    component: Costumers,
  },
  {
    path: "/add-costumer",
    name: "add-costumer",
    component: CostumerForm,
  },
  {
    path: "/edit-costumer",
    name: "edit-costumer",
    component: CostumerForm,
  },
  {
    path: "/add-schedule",
    name: "add-schedule",
    component: ScheduleForm,
  },
  {
    path: "/finish-schedule",
    name: "finish-schedule",
    component: FinishSchedule,
  },
  {
    path: "/delete-schedule",
    name: "delete-schedule",
    component: DeleteSchedule,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
    meta: { guest: true }
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { guest: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
