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
        <option
                v-for="opt in optionsProcess"
                :value="opt.id"
                :key="opt.id"
                :data-icon="opt.icon"
            >{{ opt.name }}</option>
        </select>
    </div>
</template>
<script>
export default {
    props: ["name", "options", "selected", "v-validate", "watermark"],
    data: function () {
        return {
            value: this.selected
        };
    },
    mounted() {
        let self = this;
        window.$(this.$el)
            .find(".m_selectpicker")
            .selectpicker({
                noneSelectedText: this.watermark || this.$t('general.pleaseSelect')
            })
    },
    methods: {
        input: function () {
            this.$emit("input", this.name, this.value);
        }
    },
    computed: {
        optionsProcess: function () {
            if (!Array.isArray(this.options)) {
                let options = [];
                for (var prop in this.options) {
                    options.push(
                        {
                            id: prop,
                            name: this.options[prop],
                            icon:null
                        }
                    );
                }
                return options;
            }
            return this.options;
        },
    },
    watch: {
        selected: {
            handler(newVal) {
                this.value = newVal;
                window.$(this.$el)
                    .find(".m_selectpicker")
                    .val(newVal)
                    .trigger("change");
            },
            deep: true
        },
        options: {
            handler() {
                window.setTimeout(
                    function () {
                        window.$(this.$el)
                            .find(".m_selectpicker")
                            .selectpicker("refresh");
                    }.bind(this),
                    500
                );
            },
            deep: true
        }
    }
};
</script>