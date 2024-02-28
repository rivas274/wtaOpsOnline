<template>
    <div>
        <div class="input-group"
            :class="[size?'input-group-'+size:'']"
            >
            <input
                type="text"
                class="form-control m-input"
                :placeholder="watermark"
                :id="'Search' + name"
                :name="name"
                v-model="valInput"
                @change="input"
            />
            <div class="input-group-append" v-if="$slots.default">
                <slot></slot>
            </div>
        </div>
        <slot name="error"></slot>
    </div>
</template>
<script>
export default {
    props: ["watermark", "name", "icon", "value","size"],
    data: function () {
        return {
            ico: this.icon || "la la-search",
            valInput: this.value
        };
    },
    methods: {
        input: function () {
            this.$emit("input", this.name, this.valInput);
        }
    },
    watch: {
        value: function (newVal) {
            this.valInput = newVal;
        }
    }
};
</script>
