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
                                <p class="text-uppercase text-sm">Dados cadastrais</p>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label class="form-control-label">Cliente</label>
                                        <Select2 :name="'costumer_id'" :options="allCostumers" class="form-control"
                                            required />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-control-label">Data do
                                            agendamento</label>
                                        <argon-input type="datetime-local" name="time" required />
                                    </div>
                                </div>

                                <p class="text-uppercase text-sm mt-3">Procedimentos
                                </p>

                                <div class="row">
                                    <div class="col-md-4">
                                        <label class="form-control-label">Procedimento</label>
                                        <Select2 :id="'procedure_id'" :options="allProcedures" class="form-control"
                                            @update:modelValue="setProcedureValuesFromId" />
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-control-label">Duração</label>
                                        <argon-input type="number" id="duration" />
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-control-label">Valor</label>
                                        <argon-input type="text" id="value" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="fake-label">.</label>
                                        <argon-button :fullWidth="true" type="button" @click="addProcedure">Adicionar
                                            procedimento
                                        </argon-button>
                                    </div>
                                </div>

                                <p class="text-uppercase text-sm mt-3" v-if="this.procedureList.length">Lista de
                                    procedimentos
                                </p>

                                <procedure-card-list @delete-procedure="deleteProcedure" :procedureList="procedureList">
                                </procedure-card-list>
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
import ProcedureCardList from "./parts/ProcedureCardList.vue";

export default {
    name: "costumer",
    mixins: [AlertMixin, FormsMixin],
    components: { ArgonInput, ArgonButton, Select2, ProcedureCardList },
    data() {
        return {
            formAction: process.env.VUE_APP_BACKEND_URL + 'api/jobs',
            allCostumers: [],
            allProcedures: [],
            procedureList: []
        }
    },
    created() {
        this.setAllCostumersList();
        this.setAllProceduresList();
    },
    methods: {
        setProcedureValuesFromId(id) {
            // todo
            console.log(id);
        },
        addProcedure() {
            // todo
            this.procedureList.push({});
        },
        deleteProcedure(index) {
            this.procedureList.splice(index, 1)
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
