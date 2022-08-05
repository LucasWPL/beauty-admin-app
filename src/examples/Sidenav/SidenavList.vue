<template>
  <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item url="/dashboard" :class="getRoute() === 'dashboard' ? 'active' : ''" :navText="'Dashboard'">
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/costumers" :class="getRoute() === 'costumers' ? 'active' : ''" :navText="'Clientes'">
          <template v-slot:icon>
            <i class="ni ni-single-02 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/schedules" :class="getRoute() === 'schedules' ? 'active' : ''" :navText="'Agendamentos'">
          <template v-slot:icon>
            <i class="ni ni-calendar-grid-58 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item url="/procedures" :class="getRoute() === 'procedures' ? 'active' : ''" :navText="'Procedimentos'">
          <template v-slot:icon>
            <i class="ni ni-bullet-list-67 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
  <div class="pt-3 mx-3 mt-3 sidenav-footer">
    <sidenav-card :class="cardBg" textPrimary="Need Help?" textSecondary="Please check our docs" />
  </div>
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Argon Dashboard 2",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem,
    SidenavCard
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    }
  }
};
</script>
