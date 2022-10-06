
import axios from 'axios'

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
        elementValue(id) {
            return document.getElementById(id).value;
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
        sendForm: function (url, data, redirectTo, successMessage, errorMessage) {
            const methodToBeCalled = this.getAction == 'PUT' ? axios.put : axios.post;
            methodToBeCalled(url, data)
                .then(() => {
                    this.$router.push(redirectTo);
                    this.Toast('success', successMessage);
                })
                .catch(() => {
                    this.Toast('error', errorMessage);
                });
        },
    }
};

export default formsMixin;