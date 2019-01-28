<template>
    <span v-show="errors_form.has(attribute_name)" class="form-control-feedback">{{ errors_form.first(attribute_name) }}</span>
</template>

<script>
    export default {
        props: ['attribute_name', 'errors_form']
    }
</script>