<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <form v-on:submit.prevent="onSubmit" id="formShedule">
                            <div class="card-header pb-0">
                                <div class="d-flex align-items-center">
                                    <p class="mb-0">Cadastro agendamento</p>
                                    <argon-button color="success" size="sm" class="ms-auto">Salvar</argon-button>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="example-text-input" class="form-control-label">Cliente</label>
                                        <Select2 :name="'costumer_id'" :options="allCostumers" class="form-control"
                                            required />
                                    </div>
                                    <div class="col-md-6">
                                        <label for="example-text-input" class="form-control-label">Data do
                                            agendamento</label>
                                        <argon-input type="datetime-local" name="time" required />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import AlertMixin from '../mixin/AlertMixin'
import FormsMixin from '../mixin/FormsMixin'
import axios from 'axios'
import Select2 from 'vue3-select2-component';

export default {
    name: "costumer",
    mixins: [AlertMixin, FormsMixin],
    components: { ArgonInput, ArgonButton, Select2 },
    data() {
        return {
            formAction: process.env.VUE_APP_BACKEND_URL + 'api/jobs',
            allCostumers: [],
        }
    },
    created() {
        this.setAllCostumersList();
    },
    methods: {
        setAllCostumersList() {
            axios
                .get(process.env.VUE_APP_BACKEND_URL + 'api/costumers')
                .then(response => {
                    let list = [];

                    response.data.map(function (value) {
                        let listValue = { id: value.id, text: value.name };

                        list.push(listValue);
                    });

                    this.allCostumers = list;
                });
        },
        onSubmit: function () {
            let myForm = document.getElementById('formShedule');
            let isFormValid = myForm.checkValidity();
            let data = this.getAllData(myForm);

            console.log(data);

            if (!isFormValid) {
                myForm.reportValidity();
            } else {
                axios
                    .post(this.formAction, data)
                    .then(() => {
                        this.$router.push('schedules');
                        this.Toast('success', 'Agendamento cadastrado com sucesso');
                    })
                    .catch(() => {
                        this.Toast('error', 'Houve um erro ao tentar salvar o agendamento, tente novamente');
                    });
            }
        },
    }
};
</script>
