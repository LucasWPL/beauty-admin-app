const formatterMixin = {
    data() {
        return {
        }
    },
    methods: {
        makeCoin(value) {
            return 'R$ ' + new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(value);
        },
        convertToHoursMins(value) {
            let hours = parseInt(value / 60);
            let minutes = value % 60;
            if (hours == 0) {
                minutes = value;
            }

            return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0')
        },
        ucFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
};

export default formatterMixin;