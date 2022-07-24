<template>
    <div>
        <argon-pagination size="md">
            <argon-pagination-item prev @click="$emit('change-page', this.current - 1)" />
            <argon-pagination-item v-for="n in this.pages" :key="n" v-bind:label="n" v-bind:active="n == this.current"
                @click="$emit('change-page', n)" />
            <argon-pagination-item next @click="$emit('change-page', this.current + 1)" />
        </argon-pagination>
    </div>
</template>

<script>
import ArgonPagination from "@/components/ArgonPagination.vue";
import ArgonPaginationItem from "@/components/ArgonPaginationItem.vue";

export default {
    name: "pagination",
    emits: ['change-page'],
    props: ['pages', 'current'],
    components: {
        ArgonPagination,
        ArgonPaginationItem,
    },
};
</script>
