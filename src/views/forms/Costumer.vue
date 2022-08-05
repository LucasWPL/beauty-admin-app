<template>
	<main>
		<div class="py-4 container-fluid">
			<div class="row">
				<div class="col-md-12">
					<div class="card">
						<form v-on:submit.prevent="onSubmit" id="formCostumer">
							<div class="card-header pb-0">
								<div class="d-flex align-items-center">
									<p class="mb-0">Cadastro cliente</p>
									<argon-button color="success" size="sm" class="ms-auto">Salvar</argon-button>
								</div>
							</div>
							<div class="card-body">
								<p class="text-uppercase text-sm">Informações pessoais</p>
								<div class="row">
									<div class="col-md-8">
										<label class="form-control-label">Nome</label>
										<argon-input type="text" name="name" :isRequired=true />
									</div>
									<div class="col-md-4">
										<label class="form-control-label">CPF</label>
										<argon-input type="text" name="cpf" :mask="'###.###.###-##'" />
									</div>
									<div class="col-md-4">
										<label class="form-control-label">Data de
											nascimento</label>
										<argon-input type="date" name="birth_date" />
									</div>
									<div class="col-md-4">
										<label class="form-control-label">Telefone</label>
										<argon-input type="text" name="phone" :isRequired=true
											:mask="['(##) ####-####', '(##) #####-####']" />
									</div>
									<div class="col-md-4">
										<label class="form-control-label">Indicação?</label>
										<select class="form-control" name="is_recommendation" :isRequired=true>
											<option value="0">Não</option>
											<option value="1">Sim</option>
										</select>
									</div>
								</div>
								<hr class="horizontal dark" />
								<p class="text-uppercase text-sm">Dados para contato</p>
								<div class="row">
									<div class="col-md-8">
										<label class="form-control-label">Endereço</label>
										<argon-input type="text" name="addressDetail"
											placeholder="Rua, número da casa, bairro..." />
									</div>
									<div class="col-md-4">
										<label class="form-control-label">CEP</label>
										<argon-input type="text" name="CEP" :mask="'#####-###'" />
									</div>
									<div class="col-md-4">
										<label class="form-control-label">Cidade</label>
										<argon-input type="text" name="city" />
									</div>
									<div class="col-md-4">
										<label class="form-control-label">Estado</label>
										<argon-input type="text" name="state" />
									</div>
									<div class="col-md-4">
										<label class="form-control-label">País</label>
										<argon-input type="text" name="country" />
									</div>
								</div>
								<hr class="horizontal dark" />
								<p class="text-uppercase text-sm">Observações</p>
								<div class="row">
									<div class="col-md-12">
										<label class="form-control-label">Observações</label>
										<argon-input type="text" name="note" />
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="col-md-4">
					<profile-card />
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
	name: "costumer",
	mixins: [AlertMixin, FormsMixin],
	components: { ArgonInput, ArgonButton },
	data() {
		return {
			formAction: process.env.VUE_APP_BACKEND_URL + 'api/costumers',
		}
	},
	methods: {
		onSubmit: function () {

			let myForm = document.getElementById('formCostumer');
			let isFormValid = myForm.checkValidity();
			let data = this.getAllData(myForm);

			if (!isFormValid) {
				myForm.reportValidity();
			} else {
				axios
					.post(this.formAction, data)
					.then(() => {
						this.$router.push('costumers');
						this.Toast('success', 'Cliente cadastrado com sucesso');
					})
					.catch(() => {
						this.Toast('error', 'Houve um erro ao tentar salvar o cliente, tente novamente');
					});
			}
		},
	}
};
</script>
