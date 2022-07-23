<template>
  <div class="card-header pb-0">
    <div class="row">
      <div class="col-6 d-flex align-items-center">
        <h6>{{ this.title }}</h6>
      </div>
      <div class="col-6 text-end" v-if="this.action">
        <router-link :to="this.action.url">
          <argon-button :color="this.action.color" variant="gradient">
            <i :class="this.action.iconClass"></i>
            {{ this.action.text }}
          </argon-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "default-header",
  props: [
    'title',
    'action'
  ],
  components: {
    ArgonButton,
  }
};
</script>