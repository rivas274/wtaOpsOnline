<style>
.locale-changer {
    width: 130px;
}
.locale-changer .filter-option {
    padding: 6px !important;
}
.locale-changer img {
    max-height: 22px !important;
    max-width: 40px !important;
    margin-right: 4px;
}
</style>
<template>
    <div class="locale-changer" :class="[classProp||'']">
        <select
            v-model="selected"
            class="form-control m-bootstrap-select m_selectpicker"
            :data-style="dataStyle||'btn-light'"
            @change="setLang"
        >
            <option
                v-for="(lang, i) in langs"
                :key="`Lang${i}`"
                :data-content="`<img src='${path}${lang.flag}.svg'><span>${lang.desc}</span>`"
                :value="lang.lang"
            >{{ lang.lang }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: ["data-style", "class-prop"],
    mounted() {
        $(this.$el)
            .find(".m_selectpicker")
            .selectpicker();
    },
    data() {
        return {
            langs: [
                {
                    lang: "en",
                    desc: "English",
                    flag: "us"
                },
                {
                    lang: "es",
                    desc: "Español",
                    flag: "es"
                },
                {
                    lang: "pt",
                    desc: "Portugues",
                    flag: "br"
                }
            ],
            path: this.baseUrlApi() + "app/images/flags_iso/svg/",
            selected: this.$root.$i18n.locale
        };
    },
    methods: {
        setLang: function() {
            this.$root.$i18n.locale = this.selected;
            this.$validator.localize(this.selected);
            this.$router.replace({
                params: {
                    lang: this.$root.$i18n.locale
                }
            });
        }
    }
};
</script>