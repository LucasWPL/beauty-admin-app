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
                                        <argon-input type="text" name="description" required="true" />
                                    </div>
                                    <div class="col-md-2">
                                        <label class="form-control-label">Duração (hh:mm)</label>
                                        <argon-input type="text" name="duration" required="true"
                                            :mask="this.maskHourAndMinutes" />
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-control-label">Dificuldade</label>
                                        <select class="form-control" name="dificulty" required="true">
                                            <option value="simples">Simples</option>
                                            <option value="normal" selected>Normal</option>
                                            <option value="complexo">Complexo</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <label class="form-control-label">Valor</label>
                                        <argon-input type="text" name="value" required="true" :mask="this.maskCoin" />
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

export default {
    name: "procedure",
    mixins: [AlertMixin, FormsMixin],
    components: { ArgonInput, ArgonButton },
    data() {
        return {
            formSubmitUrl: process.env.VUE_APP_BACKEND_URL + 'api/procedures',
        }
    },
    created() {
        if (this.getAction() == 'PUT') {
            let params = this.$route.params;
            if (params.selectedValues == undefined || params.selectedValues.length == 0) {
                this.$router.back();
                return this.Toast('error', 'Nenhum registro selecionado');
            }

            this.id = params.selectedValues[0];
            this.formSubmitUrl += '/' + this.id;
            let opt = {
                'value': 'moeda',
                'duration': 'time'
            };

            this.loadFormValuesFromInputNames('api/procedures/' + this.id, opt);
        }
    },
    methods: {
        onSubmit: function () {
            let myForm = document.getElementById('formProcedure');
            let isFormValid = myForm.checkValidity();

            if (!isFormValid) {
                myForm.reportValidity();
            } else {
                this.sendForm(
                    this.formSubmitUrl,
                    this.getAllData(myForm),
                    'procedures',
                    'Procedimento cadastrado com sucesso',
                    'Houve um erro ao tentar salvar o procedimento, tente novamente',
                );
            }
        }
    }
};
</script>
