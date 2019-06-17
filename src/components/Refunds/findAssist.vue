<template>
  <div class="m-content">
    <div class="row">
      <div class="col-lg-12">
        <div class="m-portlet">
          <div class="m-portlet__body m-portlet__body--no-padding">
            list
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormError from "../FormError";
export default {
  components: {
    FormError,
  },

  data() {
    return {
      results: {},
      date: "",
      disableForm: false,
      inputsData: {
        reference: "",
        currency: "",
        price: "",
        clientName: "",
        date: ""
      },
      file: "",
      displayAlert: false
    };
  },
  mounted() {
    this.getAssistance();
  },
  methods: {
  }
};
</script>
