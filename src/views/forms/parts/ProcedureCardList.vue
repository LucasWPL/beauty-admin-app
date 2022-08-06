<template>
    <div class="row">
        <div class="card-body p-3">
            <ul class="list-group">
                <li v-for="procedure, index in this.procedureList" :key="index"
                    class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                    <div class="d-flex flex-column">
                        <h6 class="mb-3 text-sm"> {{ procedure.description }}</h6>
                        <span class="mb-2 text-xs">
                            Dificuldade:
                            <span class="text-dark font-weight-bold ms-sm-2">{{ this.ucFirst(procedure.dificulty)
                            }}</span>
                        </span>
                        <span class="mb-2 text-xs">
                            Duração média:
                            <span class="text-dark font-weight-bold ms-sm-2">{{ procedure.duration }}</span>
                        </span>
                        <span class="mb-2 text-xs">
                            Valor:
                            <span class="text-dark ms-sm-2 font-weight-bold">R$ {{ procedure.value }}</span>
                        </span>
                    </div>
                    <div class="ms-auto text-end">
                        <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"
                            @click="$emit('delete-procedure', index)">
                            <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Remover
                        </a>
                        <!--
                        <a class="btn btn-link text-dark px-3 mb-0" href="javascript:;">
                            <i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit
                        </a>
                        -->
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import FormatterMixin from '../../mixin/FormatterMixin'

export default {
    name: "pagination",
    mixins: [FormatterMixin],
    emits: ['delete-procedure'],
    props: ['procedureList'],
};
</script>