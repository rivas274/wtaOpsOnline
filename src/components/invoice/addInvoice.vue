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
                        :data-vv-as="$t('document.type')"
                        :watermark="$t('document.type')"
                        :options="documentsType"
                        :selected="inputsData.docType"
                        v-on:input="setDataFilter"
                    ></select-from-table>
                    <form-error :attribute_name="'docType'" :errors_form="errors"></form-error>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('date')}">
                    <strong>{{ $t('general.date') }}</strong>
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
                <div class="form-group" :class="{'has-danger': errors.has('amount')}">
                    <strong>{{ $t('document.amount') }}</strong>
                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                        <input
                            type="number"
                            step="0.01"
                            name="amount"
                            class="form-control m-input"
                            :placeholder="$t('document.amount')"
                            :data-vv-as="$t('document.amount')"
                            v-validate="'required|min:1|max:13|decimal:2'"
                            v-model.lazy="inputsData.amount"
                            ref="amount"
                            @input="sanitizeAmount"
                            @paste="handlePaste"
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
                        :watermark="$t('document.currency')"
                        :data-vv-as="$t('document.currency')"
                        :selected="inputsData.currency"
                        v-on:input="setDataFilter"
                    ></select-from-table>
                </div>
                <div class="form-group" :class="{'has-danger': errors.has('reference')}">
                    <strong>{{ $t('reimbursement.reference') }}</strong>
                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                        <input
                            type="text"
                            name="reference"
                            class="form-control m-input"
                            :placeholder="$t('reimbursement.reference')"
                            :data-vv-as="$t('reimbursement.reference')"
                            v-validate="'required|min:2|max:60|'"
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
<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield; /* Estándar */
}
</style>
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
    props: ["id-assist"],
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
        sanitizeAmount(event) {
            // Aquí puedes validar y ajustar el valor si es necesario
            let value = event.target.value;

            // Por ejemplo, asegurarte de que no haya más de dos decimales
            if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
                value = parseFloat(value).toFixed(2);
                event.target.value = value;
                this.inputsData.amount = value;
            }
        },
        handlePaste(event) {
            event.preventDefault(); // Previene el comportamiento por defecto del pegado

            // Obtiene el valor del portapapeles
            let pasteValue = (event.clipboardData || window.clipboardData).getData('text');

            // Normaliza el valor pegado
            const normalizedValue = this.normalizeAmount(pasteValue);

            // Inserta el valor normalizado en el campo de entrada y en el modelo
            event.target.value = normalizedValue;
            this.inputsData.amount = normalizedValue;
        },
        normalizeAmount(value) {
            // Elimina espacios y caracteres no numéricos excepto los que se usan para la separación de decimales y miles
            value = value.replace(/[^\d.,]/g, '');

            const commaCount = value.indexOf(',');
            const dotCount = value.indexOf('.');

            // Si hay más comas que puntos, asumimos que la coma es el separador decimal
            if (commaCount > dotCount) {
                value = value.replace(/\./g, ''); // Elimina los puntos
                value = value.replace(/,/g, '.'); // Reemplaza comas con puntos
            } else {
                value = value.replace(/,/g, ''); // Elimina las comas
            }

            // Convierte el valor a float y luego a formato con dos decimales
            const floatValue = parseFloat(value) || 0;

            return floatValue.toFixed(2); // Formatea a dos decimales
        },
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
                                        title: response.data.MESSAGE||"Error Form",
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
            if (!this.file) {
                return false;
            }
            return URL.createObjectURL(this.file);
        }
    }
};
</script>