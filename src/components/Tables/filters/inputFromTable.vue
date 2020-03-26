<template>
    <div :class="[classProp]">
        <div class="m-input-icon m-input-icon--left">
            <input
                type="text"
                class="form-control m-input"
                :placeholder="watermark"
                :id="'Search'+name"
                :name="name"
                v-model="valInput"
                @change="input"
            />
            <span class="m-input-icon__icon m-input-icon__icon--left">
                <span>
                    <i :class="[ico]"></i>
                </span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    props: ["watermark", "name", "icon", "classProp", "value"],
    data: function() {
        return {
            ico: this.icon || "la la-search",
            valInput: this.value
        };
    },
    methods: {
        input: function() {
            this.$emit("input", this.name, this.valInput);
        }
    },
    watch: {
        value: function(newVal) {
            this.valInput = newVal;
        }
    }
};
</script>
