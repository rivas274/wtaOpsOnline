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
                        :key="selectTableKey"
                        name="docType"
                        v-validate="'required'"
                        :watermark="$t('document.type')"
                        :data-vv-as="$t('document.type')"
                        :options="documentsType"
                        :selected="inputsData.docType"
                        v-on:input="setDataFilter"
                    ></select-from-table>
                    <form-error :attribute_name="'docType'" :errors_form="errors"></form-error>
                </div>
                <div v-if="isBill" class="form-group" :class="{'has-danger': errors.has('date')}">
                    <strong>{{ $t('invoice.date.service') }}</strong>
                    <date-single-bt
                        class="m-input"
                        name="date"
                        :watermark="$t('general.date')"
                        :data-vv-as="$t('general.date')"
                        v-validate="'required'"
                        v-on:input="setDataFilter"
                        :value="inputsData.date"
                    ></date-single-bt>
                    <form-error :attribute_name="'date'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('case')}" v-if="!idAssist">
                    <strong>{{ $t('assistance.code') }}</strong>
                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                        <input
                            type="text"
                            name="case"
                            class="form-control m-input"
                            :placeholder="$t('assistance.code')"
                            :data-vv-as="$t('assistance.code')"
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
                <div v-if="isBill" class="form-group" :class="{'has-danger': errors.has('amount')}">
                    <strong>{{ $t('document.amount') }}</strong>
                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                        <input
                            type="text"
                            name="amount"
                            class="form-control m-input"
                            :placeholder="$t('document.amount')"
                            :data-vv-as="$t('document.amount')"
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
                <div v-if="isBill" class="form-group">
                    <strong>{{ $t('document.currency') }}</strong>
                    <select-from-table
                        name="currency"
                        :options="currencyFromSelect"
                        :watermark="$t('document.currency')"
                        :data-vv-as="$t('document.currency')"
                        :selected="inputsData.currency"
                        v-on:input="setDataFilter"
                    ></select-from-table>
                </div>
                <div v-if="isBill" class="form-group" :class="{'has-danger': errors.has('reference')}">
                    <strong>{{ $t('assistanceBills.reference') }}</strong>
                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                        <input
                            type="text"
                            name="reference"
                            class="form-control m-input"
                            :placeholder="$t('invoice.watermark.reference')"
                            :data-vv-as="$t('assistanceBills.reference')"
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
                            :placeholder="$t('invoice.watermark.description')"
                            :data-vv-as="$t('document.description')"
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
                <div class="form-group" :class="{'has-danger': errors.has('file')}" >
                    <strong>{{ $t('document.file') }}</strong>
                    <div class="custom-file">
                        <input
                            type="file"
                            name="file"
                            class="custom-file-input"
                            id="file"
                            accept="application/pdf"
                            v-validate="'required|max_size|ext:pdf'"
                            :data-vv-as="$t('document.file')"
                            ref="file"
                            v-on:change="handleFileUpload"
                        />
                        <label
                            class="custom-file-label"
                            :class="['custom-file-'+$root.$i18n.locale]"
                            for="file"
                        >{{(typeof file =='object' &&'name' in file)?file.name:$t('document.choose')}}</label>
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
                <iframe v-if="preview" class="rounded h-100 w-100" :src="preview" />
                <h1 v-else class="m-auto d-none d-md-block">{{$t('general.preview')}}</h1>
            </div>
        </div>
    </div>
</template>
<script>
import FormError from "../FormError";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import currency from "../Labels/currency.json";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";
export default {
    components: {
        FormError,
        selectFromTable,
        dateSingleBt,
    },
    props: ["id-assist","detaill"],
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
            displayAlert: false,
            selectTableKey: 0 // Clave dinámica inicial
        };
    },
    mounted() {
        this.getDocumentsType();
    },
    watch: {
        'inputsData.date': 'updateDescription',
        'inputsData.reference': 'updateDescription',
        '$root.$i18n.locale': {
            handler(newVal) {
                this.getDocumentsType();
                this.selectTableKey += 1; // Cambia la clave para forzar la re-renderización
            },
            deep: true
        }
    },
    methods: {
        updateDescription() {
            const code = this.detaill.codeAssist;
            const nameP = this.detaill.firstName;
            const LastnameP = this.detaill.lastName;
            const { reference, date } = this.inputsData;
            this.inputsData.description = `${code} | ${reference} | ${nameP} ${LastnameP} | ${date}`;
        },
        getDocumentsType() {
            this.axios
                .get("getDocumentsType?docType[]=7&docType[]=8&docType[]=17")
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
                    if (this.idAssist) {
                        formData.append("idAssist", this.idAssist);
                    } else {
                        formData.append("case", this.inputsData.case);
                    }
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
                                        confirmButtonText: this.$t("general.ok"),
                                        cancelButtonText: this.$t("general.no")
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
                                        title: response.data.MESSAGE || "Error Form",
                                        confirmButtonText: this.$t("general.ok"),
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
        currencyFromSelect() {
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
            return URL.createObjectURL(this.file);
        },
        isBill:function(){
            let keyValTypeDoc = this.documentsType.reduce(function(acum, val) {
                acum[val['id']] = val;
                return acum;
            }, {});
            return keyValTypeDoc[this.inputsData.docType] ? keyValTypeDoc[this.inputsData.docType]['bill'] == 'Y' : false;
        }
    }
};
</script>