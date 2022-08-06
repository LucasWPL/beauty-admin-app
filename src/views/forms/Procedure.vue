<template>
    <main>
        <div class="py-4 container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <form v-on:submit.prevent="onSubmit" id="formProcedure">
                            <div class="card-header pb-0">
                                <div class="d-flex align-items-center">
                                    <p class="mb-0">Cadastro procedimento</p>
                                    <argon-button color="success" size="sm" class="ms-auto">Salvar</argon-button>
                                </div>
                            </div>
                            <div class="card-body">
                                <p class="text-uppercase text-sm">Dados cadastrais</p>
                                <div class="row">
                                    <div class="col-md-4">
                                        <label class="form-control-label">Procedimento</label>
                                        <argon-input type="text" name="description" isRequired="true" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-control-label">Duração (hh:mm)</label>
                                        <argon-input type="text" name="duration" isRequired="true"
                                            :mask="this.maskHourAndMinutes" />
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-control-label">Dificuldade</label>
                                        <select class="form-control" name="dificulty" isRequired="true">
                                            <option value="simples">Simples</option>
                                            <option value="normal" selected>Normal</option>
                                            <option value="complexo">Complexo</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-control-label">Valor</label>
                                        <argon-input type="text" name="value" isRequired="true" :mask="this.maskCoin" />
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

export default {
    name: "procedure",
    mixins: [AlertMixin, FormsMixin],
    components: { ArgonInput, ArgonButton },
    data() {
        return {
            formAction: process.env.VUE_APP_BACKEND_URL + 'api/procedures',
        }
    },
    created() {
    },
    methods: {
        onSubmit: function () {
            let myForm = document.getElementById('formProcedure');
            let isFormValid = myForm.checkValidity();
            let data = this.getAllData(myForm);

            if (!isFormValid) {
                myForm.reportValidity();
            } else {
                axios
                    .post(this.formAction, data)
                    .then(() => {
                        this.$router.push('procedures');
                        this.Toast('success', 'Procedimento cadastrado com sucesso');
                    })
                    .catch(() => {
                        this.Toast('error', 'Houve um erro ao tentar salvar o procedumento, tente novamente');
                    });
            }
        },
    }
};
</script>
