<template>
  <div :class="[bindingclass]">
      <select
        class="form-control m-bootstrap-select m_selectpicker" data-live-search="true"
        :placeholder="watermark"
        :id="'Search'+name"
        :name="name"
        v-model="value" 
        @change="input"
      >
        <option v-for="opt in options" 
                :value="opt.id" 
                :key="opt.id"
                :data-icon="opt.icon">{{ opt.name }}</option>
      </select>
  </div>
</template>
<script>
export default {
  props: ["name", "class", "options", "selected"],
  data: function() {
    return {
      value: "",
      bindingclass: this.class
    };
  },
  mounted(){
    let _self = this;
    $(_self.$el)
      .find(".m_selectpicker").selectpicker()
  },
  methods: {
    input: function() {
      this.$emit("input", this.name, this.value);
    }
  }
};
</script>