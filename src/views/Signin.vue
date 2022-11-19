<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Login</h4>
                  <p class="mb-0">Insira o seu e-mail e senha para entrar</p>
                </div>
                <div class="card-body">
                  <form role="form" id="formLogin" v-on:submit.prevent="onSubmit">
                    <div class="mb-3">
                      <argon-input type="email" placeholder="Email" name="email" size="lg" :required=true />
                    </div>
                    <div class="mb-3">
                      <argon-input type="password" placeholder="Password" name="password" size="lg" :required=true />
                    </div>
                    <argon-switch id="rememberMe">Me mantenha conectado</argon-switch>

                    <div class="text-center">
                      <argon-button class="mt-4" variant="gradient" color="success" fullWidth size="lg">Login
                      </argon-button>
                    </div>
                    <input name="device_name" value="browser" type="hidden">
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Esqueceu sua senha?
                    <a href="javascript:;" class="text-success text-gradient font-weight-bold">Recuperar senha</a>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column">
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('https://www.datocms-assets.com/46127/1618962601-latisse-banner.jpg?auto=format,compress&w=1440');
          background-size: cover;">
                <span class="mask bg-gradient-info opacity-6
                "></span>
                <h2 class="mt-5 text-white font-weight-bolder position-relative">Seja bem vindo (a)</h2>
                <p class="text-white position-relative">Um novo conceito de administrar o seu espaço</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
const body = document.getElementsByTagName("body")[0];

import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import FormsMixin from './mixin/FormsMixin'
import AlertMixin from './mixin/AlertMixin'
import axios from 'axios'

export default {
  name: "signin",
  mixins: [AlertMixin, FormsMixin],
  components: {
    ArgonInput,
    ArgonSwitch,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods: {
    onSubmit: function () {
      let myForm = document.getElementById('formLogin');
      let isFormValid = myForm.checkValidity();
      let data = this.getAllData(myForm);

      if (!isFormValid) {
        myForm.reportValidity();
      } else {
        axios
          .post(process.env.VUE_APP_BACKEND_URL + 'api/login', data)
          .then((response) => {
            localStorage.setItem('accessToken', response.data);
            this.$router.push('dashboard');
          })
          .catch(() => {
            this.Toast('error', 'Login ou senha inválido, tente novamente');
          });
      }
    },
  }
};
</script>
