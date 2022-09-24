<template>
  <div class="card-header pb-0">
    <div class="row">
      <div class="col-6 d-flex align-items-center">
        <h6>{{ this.title }}</h6>
      </div>
      <div class="col-6 text-end">
      </div>
    </div>
    <div class="row">
      <div class="icon icon-shape icon-md shadow text-center border-radius-md button-grid bg-info"
        :class="button.hoverClass" v-for="button, index in this.buttons" :key="index" @click="getClickFunction(button)">
        <i class="opacity-10" :class="button.icon" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "default-header",
  props: [
    'title',
    'buttons'
  ],
  methods: {
    getClickFunction(buttonInfo) {
      if (buttonInfo.link) {
        return this.$router.push(buttonInfo.link);
      }
      if (buttonInfo.reloadPage) {
        return this.$router.go();
      }

      return;
    }
  }
};
</script>