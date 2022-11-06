<script>
import axios from 'axios'
import AlertMixin from '../../mixin/AlertMixin'

export default {
    name: "delete-schedule",
    mixins: [AlertMixin],
    created() {
        let params = this.$route.params;
        if (params.selectedValues == undefined || params.selectedValues.length == 0) {
            this.$router.back();
            return this.Toast('error', 'Nenhum registro selecionado');
        }

        this.deleteJob(params.selectedValues[0]);
        this.$router.back();
    },
    methods: {
        deleteJob(id) {
            axios
                .delete(process.env.VUE_APP_BACKEND_URL + 'api/jobs/' + id, {

                })
                .then(() => {
                    this.Toast('success', 'Agendamento apagado com sucesso');
                });
        }
    }
};
</script>