<template>
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" :class="
    this.$store.state.isRTL ? 'top-0 position-sticky z-index-sticky' : ''
  " v-bind="$attrs" id="navbarBlur" data-scroll="true">
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" textWhite="text-white" />

      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
        :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'" id="navbar">
        <div class="pe-md-3 d-flex align-items-center" :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'">
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <span @click="toggleSidebar" class="p-0 nav-link text-white" id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
              </div>
            </span>
          </li>
          <li class="px-3 nav-item d-flex align-items-center">
            <a class="p-0 nav-link text-white">
              <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
            </a>
          </li>
          <li class="nav-item d-flex align-items-center" style="cursor:pointer">
            <div @click="logout()" class="px-0 nav-link font-weight-bold text-white">
              <i class="fa-solid fa-right-to-bracket me-sm-2"></i>
              <span class="d-sm-inline d-none">Sair</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import Breadcrumbs from "../Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";
import AlertMixin from '../../views/mixin/AlertMixin'
import axios from 'axios';

export default {
  name: "navbar",
  mixins: [AlertMixin],
  data() {
    return {
      showMenu: false
    };
  },
  props: ["minNav", "textWhite"],
  created() {
    this.minNav;
  },
  methods: {
    ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
    ...mapActions(["toggleSidebarColor"]),

    toggleSidebar() {
      this.toggleSidebarColor("bg-white");
      this.navbarMinimize();
    },
    logout() {
      axios
        .post(process.env.VUE_APP_BACKEND_URL + 'api/logout')
        .then(() => {
          this.Toast('success', 'At?? logo');
          localStorage.removeItem('accessToken');
          this.$router.push('signin');
        })
        .catch(() => {
          this.Toast('error', 'Houve um erro ao tentar sair do sistema');
        });
    }
  },
  components: {
    Breadcrumbs
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>
