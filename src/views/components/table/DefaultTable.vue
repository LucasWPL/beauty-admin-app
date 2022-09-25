<template>
  <div class="card">
    <default-header :title="this.values.header.title" :buttons="this.values.buttons"
      :selectedValues="this.values.checkbox.selected" />
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th v-if="this.values.checkbox.allowed" class="grid-checkbox-th"></th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                v-for="(value, index) in this.values.thead" :key="index">{{ value }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tds, index) in this.values.tbody" :key="index">
              <td v-if="this.values.checkbox.allowed">
                <div class="div-align-center">
                  <input type="checkbox" class="grid-checkbox"
                    @click="changeSelected(tds[this.values.checkbox.index][this.values.checkbox.type])">
                </div>
              </td>
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
import DefaultHeader from "./parts/DefaultHeader.vue";

export default {
  name: "default-table",
  props: ['values'],
  components: {
    DefaultHeader,
  },
  methods: {
    changeSelected(value) {
      let list = this.values.checkbox.selected;
      if (list.includes(value)) {
        list.pop(value);
        return;
      }

      list.push(value);
    }
  }
};
</script>
