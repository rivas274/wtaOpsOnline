<template>
    <custom-img
        :title="nameCountry.name"
        :src="path+flag"
        :default="path+'_unknown.svg'"
        :height="(height||30)"
        :width="(width||40)"
    ></custom-img>
</template>
<script>
import customImg from "../Element/custom-img.vue";
import countries from "../Labels/countries.json";
export default {
    components: {
        customImg
    },
    props: ["iso", "height", "width"],
    data: function() {
        return {
            flag: (this.iso||'').toString().toLowerCase() + ".svg",
            iso3: (this.iso||'').toString().toUpperCase(),
            path: this.baseUrlApi() + "app/images/flags_iso/svg/"
        };
    },
    computed: {
        nameCountry: function() {
            var self = this;
            return (
                countries.filter(function(value) {
                    return value.code == self.iso3;
                })[0] || { name: "_unknown" }
            );
        }
    }
};
</script>
