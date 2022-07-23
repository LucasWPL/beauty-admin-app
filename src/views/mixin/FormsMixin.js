const formsMixin = {
    data() {
        return {
        }
    },
    methods: {
        getAllData(element) {
            let formData = new FormData(element);
            const data = {};

            for (let [key, val] of formData.entries()) {
                Object.assign(data, { [key]: val })
            }
            return data;
        }
    }
};

export default formsMixin;