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
                                    <input type="hidden" name="pre_registration" v-bind:value="this.preRegistration">
                                    <div class="col-md-5"
                                        v-bind:style='{ "display": (!this.preRegistration ? "block" : "none") }'>
                                        <label class="form-control-label">Cliente</label>
                                        <Select2 :name="'costumer_id'" :options="allCostumers" class="form-control"
                                            v-bind:required="!this.preRegistration" />
                                    </div>
                                    <div class="col-md-3"
                                        v-bind:style='{ "display": (this.preRegistration ? "block" : "none") }'>
                                        <label class="form-control-label">Nome do cliente</label>
                                        <argon-input :name="'costumer_name'" v-bind:required="this.preRegistration" />
                                    </div>
                                    <div class="col-md-2"
                                        v-bind:style='{ "display": (this.preRegistration ? "block" : "none") }'>
                                        <label class="form-control-label">Telefone do cliente</label>
                                        <argon-input :name="'costumer_phone'" v-bind:required="this.preRegistration"
                                            :mask="['(##) ####-####', '(##) #####-####']" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="fake-label">.</label>
                                        <argon-button :fullWidth="true" class="'form-control'" type="button"
                                            id="botao-novo-cliente"
                                            v-bind:style='{ "display": (!this.preRegistration ? "block" : "none") }'
                                            @click="switchPreRegistration">
                                            <i class="fas fa-plus me-2"></i>
                                            Novo cliente
                                        </argon-button>
                                        <argon-button :fullWidth="true" class="'form-control'" type="button"
                                            id="botao-cliente-existente"
                                            v-bind:style='{ "display": (this.preRegistration ? "block" : "none") }'
                                            @click="switchPreRegistration">
                                            <i class="fa-solid fa-arrow-rotate-right"></i>
                                            Cliente existente
                                        </argon-button>
                                    </div>
                                    <div class="col-md-5">
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
                                        <label class="form-control-label">Dura????o</label>
                                        <argon-input type="text" id="duration" :mask="this.maskHourAndMinutes"
                                            :value="this.procedure.duration" />
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-control-label">Valor</label>
                                        <argon-input type="text" id="value" :mask="this.maskCoin"
                                            :value="procedure.value" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="fake-label">.</label>
                                        <argon-button :fullWidth="true" type="button" @click="addProcedure">
                                            <i class="fa-solid fa-down-long"></i>
                                            Adicionar procedimento
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
import FormatterMixin from '../mixin/FormatterMixin'
import axios from 'axios'
import Select2 from 'vue3-select2-component';
import ProcedureCardList from "./parts/ProcedureCardList.vue";

export default {
    name: "costumer",
    mixins: [AlertMixin, FormsMixin, FormatterMixin],
    components: { ArgonInput, ArgonButton, Select2, ProcedureCardList },
    data() {
        return {
            formSubmitUrl: process.env.VUE_APP_BACKEND_URL + 'api/jobs',
            procedure: {
                description: '',
                duration: '',
                value: '',
            },
            allProcedures: [],
            procedureList: [],
            allCostumers: [],
            preRegistration: false,
        }
    },
    created() {
        this.setAllCostumersList();
        this.setAllProceduresList();
    },
    methods: {
        switchPreRegistration() {
            this.preRegistration = !this.preRegistration;
        },
        setProcedureValuesFromId(id) {
            axios
                .get(process.env.VUE_APP_BACKEND_URL + 'api/procedures/' + id)
                .then((response) => {
                    let procedure = response.data[0];

                    this.procedure.procedure_id = procedure.id;
                    this.procedure.description = procedure.description;
                    this.procedure.dificulty = procedure.dificulty;
                    this.procedure.duration = this.convertToHoursMins(procedure.duration.toString());
                    this.procedure.value = this.makeCoin(procedure.value.toString());
                })
                .catch(() => {
                    this.Toast('error', 'Houve um problema ao tentar carregar o procedimento, tente novamente');
                });
        },
        addProcedure() {
            this.procedureList.push({
                description: this.procedure.description,
                dificulty: this.procedure.dificulty,
                procedure_id: this.procedure.procedure_id,
                duration: this.elementValue('duration'),
                value: this.elementValue('value'),
            });
        },
        deleteProcedure(index) {
            this.procedureList.splice(index, 1)
        },
        onSubmit: function () {
            let myForm = document.getElementById('formShedule');
            let isFormValid = myForm.checkValidity();
            let data = this.getAllData(myForm);

            data.procedureList = this.procedureList;

            if (!isFormValid) {
                myForm.reportValidity();
            } else {
                this.sendForm(
                    this.formSubmitUrl,
                    data,
                    'schedules',
                    'Agendamento cadastrado com sucesso',
                    'Houve um erro ao tentar salvar o agendamento, tente novamente',
                );
            }
        }
    }
};
</script>
