<template>
	<div class="py-4 container-fluid">
		<div class="row">
			<div class="col-12">
				<default-table :values="defaultTableValues" @reload-values="generateTableValues" />
			</div>
		</div>
		<pagination :pages="pagination.totalOfPages" :current="pagination.currentPage" @change-page="changePage" />
	</div>
</template>

<script>
import DefaultTable from "./../components/table/DefaultTable.vue";
import Pagination from "./parts/Pagination.vue";
import axios from 'axios'

export default {
	name: "Costumers",
	components: {
		DefaultTable,
		Pagination,
	},
	data() {
		return {
			defaultTableValues: {
				header: {
					title: "Clientes",
				},
				thead: [
					'ID',
					'Cliente',
					'Telefone',
					'Agendamentos futuros',
				],
				tbody: [
				],
				buttons: [
					{
						icon: 'fas fa-plus',
						routeName: 'add-costumer',
						title: 'Adicionar',
					},
					{
						icon: 'fas fa-edit',
						routeName: 'edit-costumer',
						title: 'Editar',
					},
					{
						icon: 'fas fa-print',
						title: 'Imprimir',
					},
					{
						icon: 'fas fa-delete-left',
						title: 'Deletar',
					},
					{
						icon: 'fas fa-arrows-rotate',
						reloadPage: true,
						title: 'Recarregar',
					},
				],
				checkbox: {
					allowed: true,
					index: 0,
					type: 'p1',
					selected: []
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

					data.filtred.map(function (value) {
						let listValue = [
							{
								p1: value.id,
							},
							{
								h6: value.name,
							},
							{
								p1: value.phone,
							},
							{
								p1: '...',
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
				.get(process.env.VUE_APP_BACKEND_URL + 'api/costumers', {
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
