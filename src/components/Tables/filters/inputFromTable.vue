<template>
  <div class="form-group m-form__group row align-items-center">
    <div class="col-md-4">
      <div class="m-input-icon m-input-icon--left">
        <input
          type="text"
          class="form-control m-input"
          :placeholder="watermark"
          :id="'Search'+name"
          :name="name"
          v-model="value" 
          @change="input" 
        >
        <span class="m-input-icon__icon m-input-icon__icon--left">
          <span>
            <i :class="'la '+ico"></i>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['watermark','name','icon'],
  data: function() {
    return {
      ico: (this.icon||'la-search'),
      value: "",
    };
  },
  methods: {
    input: function() {
      this.$emit("input", this.name, this.value);
    }
  }
};
</script>
