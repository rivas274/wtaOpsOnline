<template slot="tag" slot-scope="props">
  <div class="col-md-6">
      <Moultiselect
        v-model="value"
        :options="option"
        :multiple="true"
        label="name"
        track-by="name"
        :close-on-select="false"
        :clear-on-select="false"
        :placeholder="watermark"
        @input="changeMultiSelect"
      ></Moultiselect>
  </div>
</template>
<script>
import Moultiselect from "vue-multiselect";
export default {
  props: ["watermark", "options","values","name"],
  components: {
    Moultiselect
  },
  data: function() {
    return {
      value: [],
      results: {},
      option: (this.options||{code:'',name:'selected'})
    };
  },
  methods:{
    changeMultiSelect : function () {
        let values = this.value.map(function (value,key) {
            return value.code;
        })
        this.$emit("input", this.name, values);
    },
  },
  watch: {
    options: function(newVal) {
      this.option = newVal;
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
