<template>
    <div>
        <select
            class="form-control m-bootstrap-select m_selectpicker"
            :class="[size?'form-control-'+size:'']"
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
import $ from '@/custom/jquery-custom';

export default {
    props: ["name", "groups", "selected","v-validate","watermark","size"],
    data: function() {
        return {
            value: this.selected
        };
    },
    mounted() {
        $(this.$el)
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
            $(this.$el)
                .find(".m_selectpicker")
                .val(newVal)
                .trigger("change");
        },
        groups: function() {
            window.setTimeout(
                function() {
                    $(this.$el)
                        .find(".m_selectpicker")
                        .selectpicker("refresh");
                }.bind(this),
                200
            );
        }
    }
};
</script>