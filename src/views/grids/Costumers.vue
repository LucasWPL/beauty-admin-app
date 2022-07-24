<template>
	<div class="py-4 container-fluid">
		<div class="row">
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
				]
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
