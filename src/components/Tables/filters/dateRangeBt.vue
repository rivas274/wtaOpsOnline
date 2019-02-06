<template>
  <div class="form-group m-form__group row align-items-center">
    <div class="col-md-4">
      <div class="m-input-icon m-input-icon--left date-bt-vue" :id="'Search'+name">
        <input
          type="text"
          :name="name"
          class="form-control m-input"
          :placeholder="watermark"
          v-model="value"
          readonly
        >
        <span class="m-input-icon__icon m-input-icon__icon--left">
          <span>
            <i class="la la-calendar-check-o"></i>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["watermark", "name"],
  mounted() {
    let _self = this;
    $(_self.$el)
      .find(".date-bt-vue")
      .daterangepicker(
        {
          buttonClasses: "m-btn btn",
          applyClass: "btn-primary",
          cancelClass: "btn-secondary",
          locale: {
            format: "YYYY-MM-DD"
          }
        },
        function(a, t) {
          $(_self.$el)
            .find(".form-control")
            .val(a.format("YYYY-MM-DD") + " / " + t.format("YYYY-MM-DD"));
          _self.$emit("input", _self.name, {
            endDate: t.format("YYYY-MM-DD"),
            startDate: a.format("YYYY-MM-DD")
          });
        }
      );
  }
};
</script>
