<template>
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
           <h6>{{ this.title }}</h6>
        </div>
        <div class="col-6 text-end">
          <argon-button :color="this.action.color" variant="gradient" v-if="this.action.text != ''">
            <i :class="this.action.iconClass"></i>
            {{this.action.text}}
          </argon-button>
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
    },
    data() {
      return {
      };
    }
};
</script>