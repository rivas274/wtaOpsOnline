<style scoped>
textarea {
  min-height: 75px;
  resize: none;
}
textarea.v-center {
  padding: 30px 0 0 0;
}
.preview {
  min-height: 400px;
  border: 0;
}
</style>

<template>
  <div class="m-content">
    <sweetAlert :display="displayAlert"/>
    <div class="m-grid__item m-grid__item--fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="m-portlet__body m-portlet__body--no-padding">
            <div class="m-invoice-2">
              <div class="m-invoice__wrapper">
                <div class="m-invoice__head">
                  <div class="m-invoice__container m-invoice__container--centered">
                    <div class="m-invoice__logo" style="padding-top: 0px; margin-top:40px;">
                      <a>
                        <h1>REFUNDS</h1>
                      </a>
                      <a>
                        <custom-img
                          height="65"
                          :src="baseUrlApi()+'app/admin/pictures/thumbnail/1logo_empresa201712080920245063.png'"
                        ></custom-img>
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
                              <a class="m-nav__link" v-tooltip:top="'Client'">
                                <i class="m-nav__link-icon flaticon-suitcase"></i>
                                <span class="m-nav__link-text">{{results.clientName}}</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a class="m-nav__link" v-tooltip:top="'Code Assist'">
                                <i class="m-nav__link-icon flaticon-shapes"></i>
                                <span class="m-nav__link-text">{{results.codeAssist}}</span>
                              </a>
                            </li>
                            <li class="m-nav__item" v-if="results.codeAssist!=results.codigo">
                              <a class="m-nav__link" v-tooltip:top="'Voucher'">
                                <i class="m-nav__link-icon flaticon-interface-5"></i>
                                <span class="m-nav__link-text">{{results.codigo}}</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a class="m-nav__link" v-tooltip:top="'Name of Passenger'">
                                <i class="m-nav__link-icon flaticon-profile"></i>
                                <span
                                  class="m-nav__link-text"
                                >{{results.fisrtName+' '+results.lastName}}</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a class="m-nav__link" v-tooltip:top="'Date of Case'">
                                <i class="m-nav__link-icon flaticon-calendar-1"></i>
                                <span class="m-nav__link-text">{{results.registeredDate.date}}</span>
                              </a>
                            </li>
                            <li class="m-nav__item">
                              <a class="m-nav__link" v-tooltip:top="'Birthdate'">
                                <i class="m-nav__link-icon flaticon-lifebuoy"></i>
                                <span class="m-nav__link-text">{{results.birthDate}}</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="m-invoice__items" style="padding:2rem 0 3rem;">
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
                        <div>
                          <div class="row">
                            <form
                              class="m-form m-form--fit m-form--label-align-right"
                              :class="[preview?'col-lg-6':'col-lg-12']"
                              @submit.prevent="validRefunds"
                              enctype="multipart/form-data"
                              ref="form"
                            >
                              <div class="m-portlet__body">
                                <div class="form-group m-form__group">
                                  <strong>Fecha</strong>
                                  <date-single-bt
                                    class-prop="m-input m-input--pill"
                                    name="date"
                                    watermark="date"
                                    v-on:input="setDataFilter"
                                    :value="inputsData.date"
                                  ></date-single-bt>
                                </div>
                                <div
                                  class="form-group m-form__group"
                                  :class="{'has-danger': errors.has('price')}"
                                >
                                  <strong>Amount</strong>
                                  <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                    <input
                                      type="number"
                                      name="price"
                                      class="form-control m-input m-input--pill"
                                      placeholder="Indicate Price"
                                      v-validate="'required|min:1|max:10|decimal:2'"
                                      v-model.lazy="inputsData.price"
                                      ref="price"
                                    >
                                    <span class="m-input-icon__icon m-input-icon__icon--left">
                                      <span>
                                        <i class="la la-money"></i>
                                      </span>
                                    </span>
                                  </div>
                                  <form-error :attribute_name="'price'" :errors_form="errors"></form-error>
                                </div>
                                <div class="form-group m-form__group">
                                  <strong>Currency</strong>
                                  <select-from-table
                                    name="currency"
                                    :options="currencyFromSelect"
                                    :selected="inputsData.currency"
                                    v-on:input="setDataFilter"
                                  ></select-from-table>
                                </div>
                                <div
                                  class="form-group m-form__group"
                                  :class="{'has-danger': errors.has('reference')}"
                                >
                                  <strong>Reference</strong>
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
                                <div
                                  class="form-group m-form__group"
                                  :class="{'has-danger': errors.has('Description')}"
                                >
                                  <strong>Description</strong>
                                  <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                    <textarea
                                      name="Description"
                                      class="form-control m-input m-input--pill"
                                      :class="{'v-center':inputsData.description.toString().split('').length==0}"
                                      placeholder="Description of Refund"
                                      v-validate="'required|min:2|max:255|'"
                                      v-model="inputsData.description"
                                      ref="Description"
                                    ></textarea>
                                    <span class="m-input-icon__icon m-input-icon__icon--left">
                                      <span>
                                        <i class="la la-pencil-square-o"></i>
                                      </span>
                                    </span>
                                  </div>
                                  <form-error :attribute_name="'reference'" :errors_form="errors"></form-error>
                                </div>
                                <div
                                  class="form-group m-form__group"
                                  :class="{'has-danger': errors.has('file')}"
                                >
                                  <strong>File Document</strong>
                                  <div class="custom-file">
                                    <input
                                      type="file"
                                      name="file"
                                      class="custom-file-input"
                                      id="file"
                                      v-validate="'required|ext:jpeg,jpg,pdf,png,gif,bmp'"
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
                            <iframe
                              class="col-lg-6 preview h-100"
                              v-if="preview=='pdf'"
                              :src="previewSrc"
                            />
                            <img
                              class="col-lg-6 preview h-100"
                              v-if="preview=='image'"
                              :src="previewSrc"
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
import customImg from "../Element/custom-img";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import currency from "../Labels/currency.json";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";

export default {
  components: {
    FormError,
    sweetAlert,
    customImg,
    selectFromTable,
    dateSingleBt
  },

  data() {
    return {
      code: this.$route.params.code,
      results: {},
      uploadPercentage: 0,
      disableForm: false,
      inputsData: {
        reference: "",
        currency: "USD",
        price: "",
        description: "",
        clientName: "",
        date: ""
      },
      file: null,
      previewSrc: null,
      displayAlert: false
    };
  },
  mounted() {
    this.getAssistance();
  },
  methods: {
    getAssistance: function() {
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
                },
                onUploadProgress: function(progressEvent) {
                  this.uploadPercentage = parseInt(
                    Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    )
                  );
                }.bind(this)
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
    setDataFilter: function(campo, value) {
      this.inputsData[campo] = value;
    },
    handleFileUpload: function(event) {
      this.file = event.target.files[0];
    }
  },
  computed: {
    currencyFromSelect: function() {
      var self = this;
      return currency.reduce(function(m, e) {
        m.push({
          id: e.code,
          name: e.code + "-" + e.name
        });
        return m;
      }, []);
    },
    preview: function() {
      if (!this.file) {
        return false;
      }
      var type = false;
      type = this.file.type.match("image.*") ? "image" : type;
      type = this.file.type.match("[*]{0,}(pdf)") ? "pdf" : type;
      if (type) {
        var reader = new FileReader();
        reader.onload = function(e) {
          switch (type) {
            case "pdf":
              this.previewSrc = URL.createObjectURL(this.file);
              break;
            case "image":
              this.previewSrc = e.target.result;
              break;
          }
        }.bind(this);
        reader.readAsDataURL(this.file);
      }
      return type;
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
