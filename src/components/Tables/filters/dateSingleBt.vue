<template>
  <div :class="[classProp]">
    <div class="m-input-icon m-input-icon--left" :id="'Search'+name">
      <input
        type="text"
        :name="name"
        class="form-control m-input date-bt-vue"
        :placeholder="watermark"
        readonly
      >
      <span class="m-input-icon__icon m-input-icon__icon--left">
        <span>
          <i class="la la-calendar-check-o"></i>
        </span>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["watermark", "name", "classProp", "value"],
  mounted() {
    let _self = this;
    $(_self.$el)
      .find(".date-bt-vue")
      .datetimepicker({
        format: "yyyy-mm-dd",
        todayHighlight: true,
        autoclose: true,
        startView: 2,
        minView: 2,
        forceParse: 0,
        pickerPosition: 'bottom-left'
      })
      .change(function() {
        _self.$emit("input", _self.name, $(this).val());
      });
  },
  watch: {
    value: function(newVal) {
      $(this.$el).val(newVal);
    }
  }
};
</script>
