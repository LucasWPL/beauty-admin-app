<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.costumers.title"
              :value="stats.costumers.value"
              :percentage="stats.costumers.percentage"
              :iconClass="stats.costumers.iconClass"
              :iconBackground="stats.costumers.iconBackground"
              :detail="stats.costumers.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.jobs.title"
              :value="stats.jobs.value"
              :percentage="stats.jobs.percentage"
              :iconClass="stats.jobs.iconClass"
              :iconBackground="stats.jobs.iconBackground"
              :percentageColor="stats.jobs.percentageColor"
              :detail="stats.jobs.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.return.title"
              :value="stats.return.value"
              :percentage="stats.return.percentage"
              :iconClass="stats.return.iconClass"
              :iconBackground="stats.return.iconBackground"
              :detail="stats.return.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.records.title"
              :value="stats.records.value"
              :percentage="stats.records.percentage"
              :iconClass="stats.records.iconClass"
              :iconBackground="stats.records.iconBackground"
              :detail="stats.records.detail"
              directionReverse
            ></card>
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
          <div class="col-lg-7 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">Procedimentos realizados hoje</h6>
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
                            <h6 class="mb-0 text-sm">{{ job.costumer }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="w-30">
                          <p class="mb-0 text-xs font-weight-bold">Procedimento(s):</p>
                          <h6 class="mb-0 text-sm">{{ job.jobs }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="w-20">
                          <p class="mb-0 text-xs font-weight-bold">Valor:</p>
                          <h6 class="mb-0 text-sm">{{ job.value }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="w-20 col">
                          <p class="mb-0 text-xs font-weight-bold">Duração:</p>
                          <h6 class="mb-0 text-sm">{{ job.duration }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <categories-card />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/views/charts/Dashboard/JobsChart.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesCard from "./components/CategoriesCard.vue";

export default {
  name: "dashboard",
  data() {
    return {
      stats: {
        records: {
          title: "Clientes totais",
          value: "100",
          percentage: "+55%",
          iconClass: "fa fa-plus",
          detail: "neste mês",
          iconBackground: "bg-gradient-primary",
        },
        costumers: {
          title: "Clientes hoje",
          value: "3",
          percentage: "+3",
          iconClass: "ni ni-single-02",
          iconBackground: "bg-gradient-danger",
          detail: "desde a última semana",
        },
        jobs: {
          title: "Procedimentos hoje",
          value: "7",
          percentage: "+4",
          iconClass: "ni ni-calendar-grid-58",
          percentageColor: "text-success",
          iconBackground: "bg-gradient-success",
          detail: "desde a última semana",
        },
        return: {
          title: "Retornos hoje",
          value: "3",
          percentage: "+5",
          iconClass: "ni ni-curved-next",
          iconBackground: "bg-gradient-warning",
          detail: "desde a última semana",
        },
      },
      jobs_done: {
        job_1: {
          costumer: "Cliente cliente 1",
          jobs: "Micropigmentação",
          value: "R$ 250",
          duration: "50 minutos",
        },
        job_2: {
          costumer: "Cliente cliente 2",
          jobs: "Micropigmentação",
          value: "R$ 300",
          duration: "01 hora e 30 minutos",
        },
        job_3: {
          costumer: "Cliente cliente 3",
          jobs: "Design de sobrancelhas",
          value: "R$ 200",
          duration: "30 minutos",
        },
        job_4: {
          costumer: "Cliente cliente 4",
          jobs: "Depilação",
          value: "R$ 100",
          duration: "01 hora e 20 minutos",
        },
      },
    };
  },
  components: {
    Card,
    GradientLineChart,
    Carousel,
    CategoriesCard,
  },
};
</script>
