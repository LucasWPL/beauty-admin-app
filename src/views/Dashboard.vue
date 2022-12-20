<template>
	<div class="py-4 container-fluid">
		<div class="row">
			<div class="col-lg-12">
				<div class="row">
					<div class="col-lg-3 col-md-6 col-12">
						<card :title="stats.costumers.title" :value="stats.costumers.value"
							:percentage="stats.costumers.percentage" :iconClass="stats.costumers.iconClass"
							:iconBackground="stats.costumers.iconBackground"
							:percentageColor="stats.costumers.percentageColor" :detail="stats.costumers.detail"
							directionReverse>
						</card>
					</div>
					<div class="col-lg-3 col-md-6 col-12">
						<card :title="stats.jobs.title" :value="stats.jobs.value" :percentage="stats.jobs.percentage"
							:iconClass="stats.jobs.iconClass" :iconBackground="stats.jobs.iconBackground"
							:percentageColor="stats.jobs.percentageColor" :detail="stats.jobs.detail" directionReverse>
						</card>
					</div>
					<div class="col-lg-3 col-md-6 col-12">
						<card :title="stats.returns.title" :value="stats.returns.value"
							:percentage="stats.returns.percentage" :iconClass="stats.returns.iconClass"
							:iconBackground="stats.returns.iconBackground"
							:percentageColor="stats.returns.percentageColor" :detail="stats.returns.detail"
							directionReverse></card>
					</div>
					<div class="col-lg-3 col-md-6 col-12">
						<card :title="stats.records.title" :value="stats.records.value"
							:percentage="stats.records.percentage" :iconClass="stats.records.iconClass"
							:iconBackground="stats.records.iconBackground"
							:percentageColor="stats.records.percentageColor" :detail="stats.records.detail"
							directionReverse></card>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-7 mb-lg">
						<!-- line chart -->
						<div class="card z-index-2">
							<gradient-line-chart />
						</div>
					</div>
					<div class="col-lg-5">
						<carousel />
					</div>
				</div>
				<div class="row mt-4">
					<div class="col-lg-12 mb-lg-0 mb-4">
						<div class="card">
							<div class="p-3 pb-0 card-header">
								<div class="d-flex justify-content-between">
									<h6 class="mb-2">Agenda do dia</h6>
								</div>
							</div>
							<div class="table-responsive">
								<table class="table align-items-center">
									<tbody>
										<tr v-for="(job, index) in jobs_done" :key="index">
											<td class="w-30">
												<div class="px-2 py-1 d-flex align-items-center">
													<div>
													</div>
													<div class="ms-4">
														<p class="mb-0 text-xs font-weight-bold">Cliente:</p>
														<h6 class="mb-0 text-sm">{{ job.name }}</h6>
													</div>
												</div>
											</td>
											<td>
												<div class="w-30">
													<p class="mb-0 text-xs font-weight-bold">Procedimento(s):</p>
													<h6 class="mb-0 text-sm">{{ job.procedures_list }}</h6>
												</div>
											</td>
											<td>
												<div class="w-30">
													<p class="mb-0 text-xs font-weight-bold">Status:</p>
													<h6 class="mb-0 text-sm">{{ this.ucFirst(job.status) }}</h6>
												</div>
											</td>
											<td>
												<div class="w-20">
													<p class="mb-0 text-xs font-weight-bold">Valor:</p>
													<h6 class="mb-0 text-sm">{{ this.makeCoin(job.procedures_value) }}
													</h6>
												</div>
											</td>
											<td class="text-sm align-middle">
												<div class="w-20 col">
													<p class="mb-0 text-xs font-weight-bold">Horário:</p>
													<h6 class="mb-0 text-sm">
														{{ this.fixDate(job.time) }}
													</h6>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<!-- <div class="col-lg-5">
						<categories-card />
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/views/charts/Dashboard/JobsChart.vue";
import Carousel from "./components/Carousel.vue";
import FormatterMixin from './mixin/FormatterMixin';
// import CategoriesCard from "./components/CategoriesCard.vue";
import axios from 'axios'
import moment from 'moment'

export default {
	name: "dashboard",
	data() {
		return {
			token: localStorage.getItem('accessToken'),
			stats: {
				costumers: {
					title: "Clientes hoje",
					value: '...',
					percentage: '...',
					iconClass: "ni ni-single-02",
					iconBackground: "bg-gradient-danger",
					detail: "neste mês",
				},
				jobs: {
					title: "Procedimentos hoje",
					value: '...',
					percentage: '...',
					iconClass: "ni ni-calendar-grid-58",
					iconBackground: "bg-gradient-success",
					detail: "neste mês",
				},
				returns: {
					title: "Retornos hoje",
					value: '...',
					percentage: '...',
					iconClass: "ni ni-curved-next",
					iconBackground: "bg-gradient-warning",
					detail: "neste mês",
				},
				records: {
					title: "Clientes totais",
					value: '...',
					percentage: '...',
					iconClass: "fa fa-plus",
					detail: "neste mês",
					iconBackground: "bg-gradient-primary",
				},
			},
			jobs_done: {
			},
		};
	},
	mixins: [FormatterMixin],
	components: {
		Card,
		GradientLineChart,
		Carousel
		// CategoriesCard,
	},
	mounted() {
		axios
			.get(process.env.VUE_APP_BACKEND_URL + 'api/dashboard')
			.then(response => {
				this.loadCardsValues(response.data.cards);

				let proceduresToday = response.data.procedures_today;
				if (proceduresToday.length > 0 && proceduresToday[0].id != null) {
					this.jobs_done = proceduresToday;
				}
			});
	},
	methods: {
		fixDate(value) {
			return moment(value).format('DD/MM/YYYY hh:mm')
		},
		loadCardsValues(cards) {
			this.stats.costumers.value = cards.costumers.today
			this.stats.costumers.percentage = cards.costumers.inMonth
			this.stats.costumers.percentageColor = "text-success"
			if (this.stats.costumers.percentage < 0) {
				this.stats.costumers.percentageColor = "text-danger"
			}

			this.stats.jobs.value = cards.jobs.today
			this.stats.jobs.percentage = cards.jobs.inMonth
			this.stats.jobs.percentageColor = "text-success"
			if (this.stats.jobs.percentage < 0) {
				this.stats.jobs.percentageColor = "text-danger"
			}

			this.stats.returns.value = cards.returns.today
			this.stats.returns.percentage = cards.returns.inMonth
			this.stats.returns.percentageColor = "text-success"
			if (this.stats.returns.percentage < 0) {
				this.stats.returns.percentageColor = "text-danger"
			}

			this.stats.records.value = cards.records.today
			this.stats.records.percentage = cards.records.inMonth
			this.stats.records.percentageColor = "text-success"
			if (this.stats.records.percentage < 0) {
				this.stats.records.percentageColor = "text-danger"
			}
		}
	},
};
</script>
