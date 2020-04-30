<template>
    <div :class="[classProp]">
        <select
            class="form-control m-bootstrap-select m_selectpicker"
            data-live-search="true"
            data-style="form-control"
            :id="'Search'+name"
            :name="name"
            v-model="value"
            @change="input"
        >
            <option
                v-for="opt in options"
                :value="opt.id"
                :key="opt.id"
                :data-icon="opt.icon"
            >{{ opt.name }}</option>
        </select>
    </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
    props: ["name", "classProp", "options", "selected"],
    data: function() {
        return {
            value: this.selected
        };
    },
    mounted() {
        window.$(this.$el)
            .find(".m_selectpicker")
            .selectpicker();
    },
    methods: {
        input: function() {
            this.$emit("input", this.name, this.value);
        }
    },
    watch: {
        selected: function(newVal) {
            this.value = newVal;
            window.$(this.$el)
                .find(".m_selectpicker")
                .val(newVal)
                .trigger("change");
        },
        options: function() {
            setTimeout(
                function() {
                    window.$(this.$el)
                        .find(".m_selectpicker")
                        .selectpicker("refresh");
                }.bind(this),
                500
            );
        }
    }
};
</script>