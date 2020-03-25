<template>
  <div :class="[classProp]">
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
  props: ["watermark", "options", "selected", "name","classProp"],
  components: {
    Moultiselect
  },
  data: function() {
    return {
      value: [],
      results: {},
      option: this.options || { code: "", name: "selected" }
    };
  },
  methods: {
    changeMultiSelect: function() {
      let values = this.value.map(function(value) {
        return value.code;
      });
      this.$emit("input", this.name, values);
    }
  },
  watch: {
    options: function(newVal) {
      this.option = newVal;
    },
    selected: function(newVal) {
      this.value=this.option.filter(element => newVal.includes(element.code));
    },
  }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
/* .multiselect {
  z-index: 98;
} */
.multiselect__tags {
  min-height: 35px;
  padding: 6px 40px 0 8px;
  font-size: 1rem;
}
.multiselect * {
  font-size: 1rem !important;
}
.multiselect__placeholder {
  padding-top: 0px;
  margin-bottom: 7px;
}
.multiselect {
  min-height: 35px;
}
.multiselect__select {
  height: 35px;
}
.multiselect__tag {
  margin-bottom: 0px;
  font-size: 1rem;
}
</style>
