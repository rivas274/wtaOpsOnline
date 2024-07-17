<template>
    <div class="locale-changer">
        <select
            v-model="selected"
            class="form-control m-bootstrap-select m_selectpicker"
            :data-style="dataStyle || 'btn-light'"
            @change="setLang"
        >
            <option
                v-for="(lang, i) in langsToShow"
                :key="`Lang${i}`"
                :data-content="`<img src='${path}${lang.flag}.svg'><span>${lang.desc}</span>`"
                :value="lang.lang"
            >
                {{ lang.lang }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: ["data-style", "active-langs"],
    mounted() {
        window.$(this.$el)
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
        setLang: function () {
            this.$root.$i18n.locale = this.selected;
            this.$validator.localize(this.selected);
            this.$session.set('lang',this.selected);
            this.setLangApi(this.selected);
            this.$router.replace({
                params: {
                    lang: this.$root.$i18n.locale
                }
            });
        },
        setLangApi: function (lang) {
            if(this.$session.exists()){
                this.axios.post("setLang", {
                    lang: lang,
                    user: this.$session.get("user")
                });
            }
        }
    },
    computed: {
        langsToShow: function () {
            if (!Array.isArray(this.activeLangs)) {
                return this.langs;
            }
            return this.langs.filter(item => {
                return this.activeLangs.includes(item.lang)
            })
        }
    }
};
</script>