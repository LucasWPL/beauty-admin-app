<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <default-table :values="defaultTableValues" />
      </div>
    </div>
  </div>
</template>

<script>
import DefaultTable from "./../components/table/DefaultTable.vue";

export default {
  name: "tables",
  components: {
    DefaultTable,
  },
  data() {
    return {
      defaultTableValues: {
        header: {
          title: "Procedimentos agendados",
          action: {
            color: 'info',
            iconClass: 'fas fa-plus me-2',
            text: 'Novo agendamento',
            url: '/new-schedule',
          }
        },
        thead: [
          'Cliente',
          'Procedimentos',
          'Horário',
          'Ações',
        ],
        tbody: [
          [
            {
              h6: "Cliente 01",
              p1: "(84) 99957-9009",
            },
            {
              p1: "Micropigmentação",
            },
            {
              h6: "15:30",
              p2: "Duração: 40 minutos",
            },
            {},
          ],
          [
            {
              h6: "Cliente 02",
              p1: "(84) 99957-9009",
            },
            {
              p1: "Micropigmentação",
            },
            {
              h6: "15:30",
              p2: "Duração: 40 minutos",
            },
            {},
          ]
        ],
      },
    };
  },
};
</script>
