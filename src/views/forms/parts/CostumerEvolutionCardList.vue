<template>
    <div class="row">
        <div class="col-md-12">
            <div class="card-body p-3">
                <ul class="list-group">
                    <li v-for="evolution, index in this.evolutionList" :key="index"
                        class="list-group-item border-0 mb-2 bg-gray-100 border-radius-lg">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="mb-2 text-xs text-dark font-weight-bold">
                                    Antes
                                </div>
                                <input class="btn" type="file" :id="'before-input-' + index"
                                    accept="image/png, image/jpeg, image/jpg"
                                    @change="$emit('change-img-evolution', index, 'before')" />
                                <div class="preview-img">
                                    <img v-if="evolution.urlBefore" :src="evolution.urlBefore" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="mb-2 text-xs text-dark font-weight-bold">
                                    Depois
                                </div>
                                <input class="btn" type="file" :id="'after-input-' + index"
                                    accept="image/png, image/jpeg, image/jpg"
                                    @change="$emit('change-img-evolution', index, 'after')" />
                                <div class="preview-img">
                                    <img v-if="evolution.urlAfter" :src="evolution.urlAfter" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <label class="form-control-label">Data</label>
                                <argon-input type="date" :id="'data-evolution-' + index" />
                            </div>
                            <div class="col-md-7">
                                <label class="form-control-label">Informações sobre os procedimentos</label>
                                <argon-input :id="'info-evolution-' + index" />
                            </div>
                            <div class="col-md-2 div-align-center">
                                <label class="fake-label">.</label>
                                <div>
                                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"
                                        @click="$emit('delete-evolution', index)">
                                        <i class="far fa-trash-alt me-2" aria-hidden="true"></i>Remover
                                    </a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import FormatterMixin from '../../mixin/FormatterMixin';
import ArgonInput from "@/components/ArgonInput.vue";

export default {
    name: "pagination",
    mixins: [FormatterMixin],
    components: { ArgonInput },
    emits: ['delete-evolution'],
    props: ['evolutionList'],
};
</script>

<style>
.preview-img {
    display: flex;
    justify-content: center;
    align-items: center;
}

.preview-img img {
    max-width: 100%;
    max-height: 500px;
}
</style>