<style scoped>
textarea {
    min-height: 75px;
    resize: none;
}
.preview-container iframe {
    min-height: 350px;
    border: 0;
    overflow-x: none;
}
.has-danger .custom-file-label,
.has-danger + .custom-file-label {
    border-color: #dc3545;
}
.has-danger .custom-file-label::after,
.has-danger + .custom-file-label::after {
    color: #f8f9fa;
    background-color: #dc3545;
    height: 2.6rem;
}
</style>
<template>
    <div>
        <div class="row mx-0">
            <form
                class="m-form col-md-6"
                @submit.prevent="validRefunds"
                enctype="multipart/form-data"
                ref="form"
            >
                <div class="form-group" :class="{'has-danger': errors.has('docType')}">
                    <strong>{{ $t('document.type') }}</strong>
                    <select-from-table
                        name="docType"
                        v-validate="'required'"
                        :options="documentsType"
                        :selected="inputsData.docType"
                        v-on:input="setDataFilter"
                    ></select-from-table>
                    <form-error :attribute_name="'docType'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('date')}">
                    <strong>{{ $t('general.date') }}</strong>
                    <date-single-bt
                        class-prop="m-input"
                        name="date"
                        watermark="Date"
                        v-validate="'required'"
                        v-on:input="setDataFilter"
                        :value="inputsData.date"
                    ></date-single-bt>
                    <form-error :attribute_name="'date'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('case')}">
                    <strong>{{ $t('assistance.code') }}</strong>
                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                        <input
                            type="text"
                            name="case"
                            class="form-control m-input"
                            :placeholder="$t('assistance.code')"
                            v-validate="'required'"
                            v-model.lazy="inputsData.case"
                            ref="case"
                        />
                        <span class="m-input-icon__icon m-input-icon__icon--left">
                            <span>
                                <i class="fa fa-life-ring"></i>
                            </span>
                        </span>
                    </div>
                    <form-error :attribute_name="'case'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('amount')}">
                    <strong>{{ $t('document.amount') }}</strong>
                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                        <input
                            type="text"
                            name="amount"
                            class="form-control m-input"
                            :placeholder="$t('document.amount')"
                            v-validate="'required|min:1|max:10|decimal:2'"
                            v-model.lazy="inputsData.amount"
                            ref="amount"
                        />
                        <span class="m-input-icon__icon m-input-icon__icon--left">
                            <span>
                                <i class="la la-money"></i>
                            </span>
                        </span>
                    </div>
                    <form-error :attribute_name="'amount'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group">
                    <strong>{{ $t('document.currency') }}</strong>
                    <select-from-table
                        name="currency"
                        :options="currencyFromSelect"
                        :selected="inputsData.currency"
                        v-on:input="setDataFilter"
                    ></select-from-table>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('reference')}">
                    <strong>{{ $t('refund.reference') }}</strong>
                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                        <input
                            type="text"
                            name="reference"
                            class="form-control m-input"
                            :placeholder="$t('refund.reference')"
                            v-validate="'required|min:2|max:40|'"
                            v-model.lazy="inputsData.reference"
                            ref="reference"
                        />
                        <span class="m-input-icon__icon m-input-icon__icon--left">
                            <span>
                                <i class="la la-tag"></i>
                            </span>
                        </span>
                    </div>
                    <form-error :attribute_name="'reference'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('Description')}">
                    <strong>{{ $t('document.description') }}</strong>
                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                        <textarea
                            name="Description"
                            class="form-control m-input"
                            :placeholder="$t('document.description')"
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
                    <form-error :attribute_name="'Description'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('file')}">
                    <strong>{{ $t('document.file') }}</strong>
                    <div class="custom-file">
                        <input
                            type="file"
                            name="file"
                            class="custom-file-input"
                            id="file"
                            accept="application/pdf"
                            v-validate="'required|ext:pdf'"
                            ref="file"
                            v-on:change="handleFileUpload"
                        />
                        <label
                            class="custom-file-label"
                            for="file"
                        >{{(typeof file =='object' &&'name' in file)?file.name:'Choose File'}}</label>
                    </div>
                    <div class="progress" v-if="uploadPercentage>0">
                        <div
                            class="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar"
                            :aria-valuenow="uploadPercentage"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            :style="{width: uploadPercentage+'%'}"
                        ></div>
                    </div>
                    <form-error :attribute_name="'file'" :errors_form="errors"></form-error>
                </div>
                <button
                    :disabled="disableForm"
                    :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                    type="submit"
                    class="btn btn-primary col-md-12 mt-3"
                >{{ $t('general.send') }}</button>
            </form>
            <div class="col-md-6 bg-secondary d-flex preview-container p-0">
                <h1 v-if="!preview" class="m-auto d-none d-md-block">Vista Previa</h1>
                <iframe class="rounded h-100 w-100" v-if="preview" :src="preview" />
            </div>
        </div>
    </div>
</template>
<script>
import FormError from "../FormError";
import customImg from "../Element/custom-img";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import currency from "../Labels/currency.json";
import localeChanger from "../locales/locale-changer.vue";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";
export default {
    components: {
        FormError,
        customImg,
        selectFromTable,
        dateSingleBt,
        localeChanger
    },
    data() {
        return {
            uploadPercentage: 0,
            disableForm: false,
            inputsData: {
                docType: "",
                date: "",
                case: "",
                amount: "",
                currency: "USD",
                reference: "",
                description: ""
            },
            documentsType: [],
            file: false,
            previewSrc: null,
            displayAlert: false
        };
    },
    mounted() {
        this.getDocumentsType();
    },
    methods: {
        getDocumentsType: function() {
            this.axios
                .get("getDocumentsType?docType[]=4&docType[]=5&docType[]=8")
                .then(response => {
                    this.documentsType = response.data.RESPONSE.RESULTS;
                });
        },
        validRefunds: function() {
            if (!this.disableForm) {
                this.$validator.validateAll().then(result => {
                    window.console.log("validateAll", result);
                    const formData = new FormData();
                    formData.append("file", this.file);
                    formData.append("reference", this.inputsData.reference);
                    formData.append("description", this.inputsData.description);
                    formData.append("currency", this.inputsData.currency);
                    formData.append("date", this.inputsData.date);
                    formData.append("amount", this.inputsData.amount);
                    formData.append("case", this.inputsData.case);
                    formData.append("docType", this.inputsData.docType);
                    formData.append(
                        "idProvider",
                        this.$session.get("provider").id
                    );
                    if (result) {
                        this.disableForm = true;
                        this.axios
                            .post("addInvoice", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                },
                                onUploadProgress: function(progressEvent) {
                                    this.uploadPercentage = parseInt(
                                        Math.round(
                                            (progressEvent.loaded * 100) /
                                                progressEvent.total
                                        )
                                    );
                                }.bind(this)
                            })
                            .then(response => {
                                window.console.log("addInvoice", response);
                                this.disableForm = false;
                                if (response.data.STATUS == "OK") {
                                    this.inputsData.reference = "";
                                    this.inputsData.amount = "";
                                    this.inputsData.case = "";
                                    this.inputsData.date = "";
                                    this.inputsData.description = "";
                                    this.inputsData.docType = "";
                                    this.inputsData.currency = "USD";
                                    this.file = false;
                                    this.$refs.file.value = null;
                                    this.$emit("addInvoice", response.data.RESPONSE);
                                    window.Swal.fire({
                                        title: this.$t("document.send"),
                                        text: this.$t("document.uploaded"),
                                        type: "success",
                                        showCancelButton: true,
                                        confirmButtonText: "Ok"
                                    });
                                } else {
                                    if (response.data.ERRORS) {
                                        for (var prop in response.data.ERRORS) {
                                            this.errors.add({
                                                field: prop,
                                                msg: response.data.ERRORS[prop]
                                            });
                                        }
                                    }
                                    window.Swal.fire({
                                        title: response.data.MESSAGE||"Error Form",
                                        type: "error"
                                    });
                                }
                                this.uploadPercentage = 0;
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
        },
        onCaptchaVerified: function(recaptchaToken) {
            this.captcha = recaptchaToken;
        },
        onCaptchaExpired: function() {
            this.captcha = "";
            this.$refs.recaptcha.reset();
        }
    },
    computed: {
        currencyFromSelect: function() {
            return currency.reduce(function(m, e) {
                m.push({
                    id: e.code,
                    name: e.code + "-" + e.name
                });
                return m;
            }, []);
        },
        preview: function() {
            if (!this.file || this.errors.has("file")) {
                return false;
            }
            return URL.createObjectURL(this.file);
        }
    }
};
</script>