<template>
    <div>
        <div class="m-input-icon m-input-icon--left">
            <input
                type="text"
                class="form-control m-input"
                :class="[size?'form-control-'+size:'']"
                :placeholder="watermark"
                :id="'Search'+name"
                :name="name"
                v-model="valInput"
                @change="input"
                :readonly="readonly?'readonly':false"
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
    props: ["watermark", "name", "icon", "value","readonly","size"],
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
