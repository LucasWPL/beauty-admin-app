import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const alertMixin = {
    data() {
        return {
        }
    },
    methods: {
        Toast(type, message) {
            Toast.fire({
                icon: type,
                title: message
            })
        }
    }
};

export default alertMixin;