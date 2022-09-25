<template>
    <div class="py-4 container-fluid">
        <div class=" row">
            <div class="col-12">
                <default-table :values="defaultTableValues" />
            </div>
        </div>
        <pagination :pages="pagination.totalOfPages" :current="pagination.currentPage" @change-page="changePage" />
    </div>
</template>

<script>
import DefaultTable from "./../components/table/DefaultTable.vue";
import Pagination from "./parts/Pagination.vue";
import FormatterMixin from '../mixin/FormatterMixin';
import axios from 'axios'

export default {
    name: "tables",
    mixins: [FormatterMixin],
    components: {
        DefaultTable,
        Pagination,
    },
    data() {
        return {
            defaultTableValues: {
                header: {
                    title: "Lista de procedimentos",
                },
                thead: [
                    'Nome',
                    'Dificuldade',
                    'Duração média',
                    'Valor',
                ],
                tbody: [],
                config: {
                    checkbox: {
                        allowed: false,
                    }
                }
            },
            pagination: {
                maxInPage: 10,
                currentPage: 1,
                totalOfPages: 0
            },
        };
    },
    created() {
        this.generateTableValues();
    },
    methods: {
        changePage(page) {
            if (page == 0 || page > this.pagination.totalOfPages) {
                return;
            }

            this.pagination.currentPage = page;
            this.generateTableValues();
        },
        generateTableValues() {
            this.getData()
                .then(data => {

                    let list = [];

                    data.filtred.map((value) => {
                        let listValue = [
                            {
                                h6: value.description,
                            },
                            {
                                p1: this.ucFirst(value.dificulty),
                            },
                            {
                                p1: this.convertToHoursMins(value.duration),
                            },
                            {
                                p1: this.makeCoin(value.value),
                            },
                        ];

                        list.push(listValue);
                    });

                    this.defaultTableValues.tbody = list;
                    this.pagination.totalOfPages = data.pages;
                });
        },
        getData() {
            return axios
                .get(process.env.VUE_APP_BACKEND_URL + 'api/procedures', {
                    params: {
                        maxInPage: this.pagination.maxInPage,
                        currentPage: this.pagination.currentPage,
                    }
                })
                .then(response => response.data);
        }
    }
};
</script>
