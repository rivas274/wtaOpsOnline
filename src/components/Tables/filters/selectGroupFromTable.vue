<template>
    <div>
        <select
            class="form-control m-bootstrap-select m_selectpicker"
            data-live-search="true"
            data-style="form-control"
            :id="'Search'+name"
            :name="name"
            v-model="value"
            @change="input"
        >
        <optgroup v-for="group in groups" :label="group.name" :key="group.name" >
            <option
                v-for="opt in group.options"
                :value="opt.id"
                :key="opt.id"
                :data-icon="opt.icon"
            >{{ opt.name }}</option>
        </optgroup>
        </select>
    </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
    props: ["name", "groups", "selected","v-validate","watermark"],
    data: function() {
        return {
            value: this.selected
        };
    },
    mounted() {
        window.$(this.$el)
            .find(".m_selectpicker")
            .selectpicker({
                noneSelectedText : this.watermark || this.$t('general.pleaseSelect')
            });
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
        groups: function() {
            setTimeout(
                function() {
                    window.$(this.$el)
                        .find(".m_selectpicker")
                        .selectpicker("refresh");
                }.bind(this),
                200
            );
        }
    }
};
</script>