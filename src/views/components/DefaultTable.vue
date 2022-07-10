<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-6 d-flex align-items-center">
           <h6>{{ table.title }}</h6>
        </div>
        <div class="col-6 text-end">
          <argon-button color="dark" variant="gradient">
            <i class="fas fa-plus me-2"></i>
            Novo agendamento
          </argon-button>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
                <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                    v-for="(value, index) in table.thead" :key="index"
                >{{ value }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tds, index) in table.tbody" :key="index">
              <td v-for="(td, indexTd) in tds" :key="indexTd">
                <div class="d-flex px-3 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ td.h6 }}</h6>
                    <p class="text-xs font-weight-bold mb-0">{{ td.p1 }}</p>
                    <p class="text-xs text-secondary mb-0">{{ td.p2 }}</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import ArgonButton from "@/components/ArgonButton.vue";

export default {
    name: "default-table",
    props: ['values'],
    components: {
      ArgonButton,
    },
    mounted: function () {
        console.log(this.values.tbody[0]);
    },
    data() {
    return {
        table: this.values,
    };
    }
};
</script>
