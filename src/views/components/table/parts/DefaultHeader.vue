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
    <div class="row">
      <div :class="'bg-info'" class="icon icon-shape icon-md shadow text-center border-radius-md buttonGrid">
        <i class="opacity-10" :class="'fas fa-plus'" aria-hidden="true"></i>
      </div>
      <div :class="'bg-info'" class="icon icon-shape icon-md shadow text-center border-radius-md buttonGrid">
        <i class="opacity-10" :class="'fa fa-pencil'" aria-hidden="true"></i>
      </div>
      <div :class="'bg-info'" class="icon icon-shape icon-md shadow text-center border-radius-md buttonGrid">
        <i class="opacity-10" :class="'fa fa-check'" aria-hidden="true"></i>
      </div>
      <div :class="'bg-info'" class="icon icon-shape icon-md shadow text-center border-radius-md buttonGrid">
        <i class="opacity-10" :class="'fa fa-list'" aria-hidden="true"></i>
      </div>
      <div :class="'bg-info'" class="icon icon-shape icon-md shadow text-center border-radius-md buttonGrid">
        <i class="opacity-10" :class="'fa fa-print'" aria-hidden="true"></i>
      </div>
      <div :class="'bg-info'" class="icon icon-shape icon-md shadow text-center border-radius-md buttonGrid">
        <i class="opacity-10" :class="'fa fa-trash'" aria-hidden="true"></i>
      </div>
      <div :class="'bg-info'" class="icon icon-shape icon-md shadow text-center border-radius-md buttonGrid">
        <i class="opacity-10" :class="'fa fa-refresh'" aria-hidden="true"></i>
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