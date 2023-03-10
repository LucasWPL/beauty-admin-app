
import axios from 'axios'
import $ from 'jquery'

const formsMixin = {
    data() {
        return {
            maskCoin: [
                '',
                '#,##',
                '##,##',
                '###,##',
                '#.###,##',
                '##.###,##',
                '###.###,##',
                '#.###.###,##',
                '##.###.###,##',
                '###.###.###,##',
                '#.###.###.###,##',
                '##.###.###.###,##',
                '###.###.###.###,##',
            ],
            maskHourAndMinutes: [
                "",
                "#",
                "##",
                "#:##",
                "##:##",
            ]
        }
    },
    methods: {
        elementById(id) {
            return document.getElementById(id);
        },
        elementValue(id) {
            return document.getElementById(id).value;
        },
        clearElementValue(id) {
            document.getElementById(id).value = '';
        },
        cleanElements(elements) {
            elements = [].concat(elements);
            elements.forEach((value) => {
                document.getElementById(value).value = '';
            });
        },
        getAllData(element) {
            let formData = new FormData(element);
            const data = {};

            for (let [key, val] of formData.entries()) {
                Object.assign(data, { [key]: val })
            }
            return data;
        },
        getFormData(object) {
            const formData = new FormData();

            console.log(object);

            Object.keys(object).forEach(key => {
                console.log(key, object[key]);
                formData.append(key, object[key])
            });
            return formData;
        },
        setAllProceduresList() {
            axios
                .get(process.env.VUE_APP_BACKEND_URL + 'api/procedures')
                .then(response => {
                    let list = [];

                    response.data.map(function (value) {
                        let listValue = { id: value.id, text: value.description };

                        list.push(listValue);
                    });

                    this.allProcedures = list;
                });
        },
        setAllCostumersList() {
            axios
                .get(process.env.VUE_APP_BACKEND_URL + 'api/costumers')
                .then(response => {
                    let list = [];

                    response.data.map(function (value) {
                        let listValue = { id: value.id, text: value.name };

                        list.push(listValue);
                    });

                    this.allCostumers = list;
                });
        },
        getAction: function () {
            return this.$route.path.startsWith("/edit-") ? 'PUT' : 'POST';
        },
        sendForm: function (url, data, redirectTo, successMessage, errorMessage, options = {}, forceMethod = null) {
            let method = forceMethod ?? this.getAction();
            const methodToBeCalled = method == 'PUT' ? axios.put : axios.post;
            console.log(data, method);

            methodToBeCalled(url, data, options)
                .then(() => {
                    this.$router.push(redirectTo);
                    this.Toast('success', successMessage);
                })
                .catch(() => {
                    this.Toast('error', errorMessage);
                });
        },
        loadFormValuesFromInputNames: function (url, opt = {}) {
            axios
                .get(process.env.VUE_APP_BACKEND_URL + url)
                .then(response => {
                    let values = response.data[0];
                    $.each(values, (index, value) => {
                        if (index in opt) {
                            if (opt[index] == 'moeda') {
                                let aux = parseFloat(value);
                                value = aux.toLocaleString('pt-br', { minimumFractionDigits: 2 });
                            }
                            if (opt[index] == 'time') {
                                value = this.minutesToDatetime(value);
                            }
                        }

                        $('[name=' + index + ']').val(value);
                    })
                }).catch(() => {
                    this.Toast('error', 'Houve um erro ao carregar os dados');
                    this.$router.back();
                });
        },
        minutesToDatetime(value) {
            let hours = parseInt(value / 60);
            let remainingMinutes = String(value - (hours * 60));

            if (hours == 0) {
                return value;
            }

            return hours + ":" + remainingMinutes.padStart(2, '0');
        }
    }
};

export default formsMixin;