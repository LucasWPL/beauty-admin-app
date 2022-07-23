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
import DefaultTable from "./components/table/DefaultTable.vue";
import axios from 'axios'

export default {
    name: "Costumers",
    components: {
        DefaultTable,
    },
    data() {
        return {
            defaultTableValues: {
                header: {
                    title: "Clientes",
                    action: {
                        color: 'info',
                        iconClass: 'fas fa-plus me-2',
                        text: 'Cadastrar cliente',
                        url: '/new-costumer',
                    }
                },
                thead: [
                    'Cliente',
                    'Agendamentos futuros',
                    'Ações',
                ],
                tbody: [
                ],
            },
        };
    },
    created() {
        axios
            .get(process.env.VUE_APP_BACKEND_URL + 'api/costumers')
            .then(response => {
                let list = [];

                response.data.map(function (value) {
                    let listValue = [
                        {
                            h6: value.name,
                            p1: value.phone,
                        },
                        {
                            p1: '...',
                        },
                        {}
                    ];

                    list.push(listValue);
                });

                this.defaultTableValues.tbody = list;
            });
    }
};
</script>
