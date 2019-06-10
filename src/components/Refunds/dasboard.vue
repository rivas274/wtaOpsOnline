<template>
  <div class="m-content">
    <sweetAlert :display="displayAlert"/>
    <div class="row">
      <div class="col-lg-12">
        <div class="m-portlet">
          <div class="m-portlet__body m-portlet__body--no-padding">
            <div class="m-invoice-2">
              <div class="m-invoice__wrapper">
                <div
                  class="m-invoice__head"
                  style="background-image: url(../../assets/app/media/img//logos/bg-6.jpg);"
                >
                  <div class="m-invoice__container m-invoice__container--centered">
                    <div class="m-invoice__logo" style="padding-top: 40px;">
                      <a href="#">
                        <h1>REFUNDS</h1>
                      </a>
                      <a href="#">
                        <img
                          width="180px"
                          src="https://wtaops.com/app/admin/pictures/thumbnail/1logo_empresa201712080920245063.png"
                        >
                      </a>
                    </div>

                    <div class="m-demo__preview" style="padding: 20px 0px 0px 0px;">
                      <div
                        class="m-demo"
                        data-code-preview="true"
                        data-code-html="true"
                        data-code-js="false"
                      >
                        <div
                          class="m-demo__preview"
                          style="padding: 5px;text-align: center; background: #36a3f7;"
                        >
                          <ul class="m-nav m-nav--inline">
                            <li class="m-nav__item">
                              <a href class="m-nav__link">
                                <i class="m-nav__link-icon flaticon-suitcase"></i>
                                <span class="m-nav__link-text">{{results.clientName}}</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a href class="m-nav__link">
                                <i class="m-nav__link-icon flaticon-shapes"></i>
                                <span class="m-nav__link-text">{{results.codeAssist}}</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a href class="m-nav__link">
                                <i class="m-nav__link-icon flaticon-interface-5"></i>
                                <span class="m-nav__link-text">{{code}}</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a href class="m-nav__link">
                                <i class="m-nav__link-icon flaticon-profile"></i>
                                <span
                                  class="m-nav__link-text"
                                >{{results.fisrtName+' '+results.lastName}}</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a href class="m-nav__link">
                                <i class="m-nav__link-icon flaticon-calendar-1"></i>
                                <span class="m-nav__link-text">{{results.registeredDate.date}}</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a href class="m-nav__link">
                                <i class="m-nav__link-icon flaticon-lifebuoy"></i>
                                <span class="m-nav__link-text">{{ping}}</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="m-invoice__items" style="padding:2rem 0 3rem;">
                      <div class="col-md-12">
                        <!--begin::Portlet-->
                        <div class="m-portlet m-portlet--tab">
                          <div class="m-portlet__head">
                            <div class="m-portlet__head-caption">
                              <div class="m-portlet__head-title">
                                <span class="m-portlet__head-icon m--hide">
                                  <i class="la la-gear"></i>
                                </span>
                                <h3 class="m-portlet__head-text">Information Refunds</h3>
                              </div>
                            </div>
                          </div>
                          <!--begin::Form-->
                          <form
                            class="m-form m-form--fit m-form--label-align-right"
                            @submit.prevent="validRefunds"
                            enctype="multipart/form-data"
                            ref="form"
                          >
                            <div class="m-portlet__body">
                              <!-- <div class="form-group m-form__group">
                                                            <label>
                                                                Ping
                                                            </label>
                                                            <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                                                <input type="text" class="form-control m-input m-input--pill" readonly :value=ping>
                                                                <span class="m-input-icon__icon m-input-icon__icon--left">
                                                                    <span>
                                                                        <i class="la la-tag"></i>
                                                                    </span>
                                                                </span>
                                                            </div>
                              </div>-->
                              <div class="form-group m-form__group">
                                <label>Fecha</label>
                                <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                  <input
                                    type="text"
                                    class="form-control m-input m-input--pill"
                                    :v-model="results.registeredDate.date"
                                    v-model.lazy="inputsData.date"
                                    readonly
                                  >
                                  <span class="m-input-icon__icon m-input-icon__icon--left">
                                    <span>
                                      <i class="la la-tag"></i>
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <div class="form-group m-form__group">
                                <label>Client</label>
                                <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                  <input
                                    type="text"
                                    class="form-control m-input m-input--pill"
                                    :v-model="inputsData.clientName"
                                    v-model.lazy="inputsData.clientName"
                                    readonly
                                  >
                                  <span class="m-input-icon__icon m-input-icon__icon--left">
                                    <span>
                                      <i class="la la-tag"></i>
                                    </span>
                                  </span>
                                </div>
                              </div>
                              <div class="form-group m-form__group">
                                <label>Price</label>
                                <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                  <input
                                    type="text"
                                    name="price"
                                    class="form-control m-input m-input--pill"
                                    placeholder="Indicate Price"
                                    v-validate="'required|min:1|max:10|'"
                                    v-model.lazy="inputsData.price"
                                    ref="price"
                                  >
                                  <span class="m-input-icon__icon m-input-icon__icon--left">
                                    <span>
                                      <i class="la la-tag"></i>
                                    </span>
                                  </span>
                                </div>
                                <form-error :attribute_name="'price'" :errors_form="errors"></form-error>
                              </div>
                              <div class="form-group m-form__group">
                                <label>Currency</label>
                                <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                  <input
                                    type="text"
                                    name="currency"
                                    class="form-control m-input m-input--pill"
                                    placeholder="Indicate Currency"
                                    v-validate="'required|min:1|max:40|'"
                                    v-model.lazy="inputsData.currency"
                                    ref="currency"
                                  >
                                  <span class="m-input-icon__icon m-input-icon__icon--left">
                                    <span>
                                      <i class="la la-tag"></i>
                                    </span>
                                  </span>
                                </div>
                                <form-error :attribute_name="'currency'" :errors_form="errors"></form-error>
                              </div>
                              <div class="form-group m-form__group">
                                <label>Reference</label>
                                <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                  <input
                                    type="text"
                                    name="reference"
                                    class="form-control m-input m-input--pill"
                                    placeholder="Indicate Reference"
                                    v-validate="'required|min:2|max:40|'"
                                    v-model.lazy="inputsData.reference"
                                    ref="reference"
                                  >
                                  <span class="m-input-icon__icon m-input-icon__icon--left">
                                    <span>
                                      <i class="la la-tag"></i>
                                    </span>
                                  </span>
                                </div>
                                <form-error :attribute_name="'reference'" :errors_form="errors"></form-error>
                              </div>
                              <div class="form-group m-form__group">
                                <label>File Document</label>
                                <div class="custom-file">
                                  <input
                                    type="file"
                                    name="file"
                                    class="custom-file-input"
                                    id="file"
                                    v-validate="'required'"
                                    ref="file"
                                    v-on:change="handleFileUpload"
                                  >
                                  <label class="custom-file-label" for="customFile">Choose file</label>
                                </div>
                                <form-error :attribute_name="'file'" :errors_form="errors"></form-error>
                              </div>
                            </div>
                            <div
                              class="m-portlet__foot m-portlet__foot--fit"
                              style="text-align: center;"
                            >
                              <div class="m-form__actions">
                                <button
                                  :disabled="disableForm"
                                  :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                                  type="submit"
                                  class="btn btn-primary"
                                >Submit</button>
                              </div>
                            </div>
                          </form>
                          <!--end::Form-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="m-invoice__footer" style="padding: 0px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FormError from "../FormError";
import sweetAlert from "../Element/sweetAlert";
export default {
  components: {
    FormError,
    sweetAlert
  },

  data() {
    return {
      code: this.$route.params.code,
      /* ping: this.$route.query.ping, */
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
    getAssistance: function() {
      console.log(this.code);
      this.axios
        .get("getAssistancePublic", {
          params: {
            codeAssist: this.code
          }
        })
        .then(response => {
          this.results = response.data.RESPONSE.RESULTS[0];
          this.inputsData.clientName = this.results.clientName;
          this.inputsData.date = this.results.registeredDate.date;
        });
    },
    validRefunds: function() {
      if (!this.disableForm) {
        this.$validator.validateAll().then(result => {
          let formData = new FormData();
          formData.append("file", this.file);
          formData.append("reference", this.inputsData.reference);
          formData.append("currency", this.inputsData.currency);
          formData.append("price", this.inputsData.price);
          formData.append("client", this.inputsData.client);
          if (result) {
            this.disableForm = true;
            this.axios
              .post("addRefund", formData, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
              .then(response => {
                this.disableForm = false;
                if (response.data.STATUS == "OK") {
                  this.displayAlert = true;
                }
              });
          }
        });
      }
    },
    handleFileUpload: function() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>
<style>
.m-nav .m-nav__item > .m-nav__link .m-nav__link-text {
  color: #f8f9fc;
  font-weight: 700;
}
.m-nav .m-nav__item > .m-nav__link .m-nav__link-icon {
  color: #f8f9fc;
}
</style>
