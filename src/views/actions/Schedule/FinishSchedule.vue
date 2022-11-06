<script>
import axios from 'axios'
import AlertMixin from '../../mixin/AlertMixin'

export default {
    name: "finish-schedule",
    mixins: [AlertMixin],
    created() {
        let params = this.$route.params;
        if (params.selectedValues == undefined || params.selectedValues.length == 0) {
            this.$router.back();
            return this.Toast('error', 'Nenhum registro selecionado');
        }

        this.finishJob(params.selectedValues[0]);
        this.$router.back();
    },
    methods: {
        finishJob(id) {
            axios
                .put(process.env.VUE_APP_BACKEND_URL + 'api/jobs/finish/' + id, {

                })
                .then(() => {
                    this.Toast('success', 'Agendamento finalizado com sucesso');
                });
        }
    }
};
</script>