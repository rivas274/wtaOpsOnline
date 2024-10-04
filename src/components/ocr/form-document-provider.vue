<template>
    <div class="m-portlet">
        <div v-if="response" class="m-alert alert alert-dismissible text-left mb-3 mt-1"
            :class="['isDuplicate' in response.RESPONSE ? 'alert-warning text-dark' : 'alert-success']">
            <div class="m-alert__text">
                <div class="mb-2 font-weight-bold">{{ $t("document.uploaded") }}!</div>
                <div v-html="$t('ocr.uploadSuccess', response.RESPONSE)"></div>
                <div v-if="'isDuplicate' in response.RESPONSE"
                    v-html="$t('ocr.possibleDuplicate', response.RESPONSE.isDuplicate)">
                </div>
            </div>
            <div class="m-alert__close">
                <button type="button" class="close" @click.prevent="$emit('remove', file)"></button>
            </div>
        </div>
        <div class="m-portlet__body row mx-0 p-0" v-else>
            <form class="m-form col-md-6 pl-0" @submit.prevent="validateDocument" enctype="multipart/form-data"
                ref="form">
                <div class="m-portlet__head">
                    <div class="m-portlet__head-caption">
                        <div class="m-portlet__head-title">
                            <h3 class="m-portlet__head-text">
                                {{ $t('document.document') | upper }}
                            </h3>
                        </div>
                    </div>
                    <div class="m-portlet__head-tools">
                        <button class="btn" @click.prevent="$emit('remove', file)"
                            type="button">{{ $t('general.cancel') | upper }}
                        </button>
                    </div>
                </div>
                <div class="m-portlet__body p-4">
                    <div class="form-group" :class="{ 'has-danger': errors.has('page') }" v-if="pagesShow.length > 1">
                        <strong>{{ $t('ocr.pages') }} ({{ inputs.page.length }} {{ $t('general.of') }}
                            {{ pagesShow.length }})</strong>
                        <select-multiple :key="`page-${selectTableKey}-${$i18n.locale}`" name="page" v-validate="'required'"
                            :watermark="$t('ocr.pages')" :data-vv-as="$t('ocr.pages')" :options="pagesShow"
                            :selected="inputs.page" v-on:input="setDataFilter">
                        </select-multiple>
                        <form-error :attribute_name="'page'" :errors_form="errors"></form-error>
                    </div>
                    <div class="form-group" :class="{ 'has-danger': errors.has('docType') }">
                        <strong>{{ $t('document.type') }}</strong>
                        <select-from-table :key="`docType-${selectTableKey}-${$i18n.locale}`" name="docType" v-validate="'required'"
                            :watermark="$t('document.type')" :data-vv-as="$t('document.type')" :options="documentsType"
                            :selected="inputs.docType" v-on:input="setDataFilter"></select-from-table>
                        <form-error :attribute_name="'docType'" :errors_form="errors"></form-error>
                    </div>
                    <div v-if="isBill" class="form-group" :class="{ 'has-danger': errors.has('date') }">
                        <strong>{{ $t('invoice.date.bill') }}</strong>
                        <date-single-bt class="m-input" name="date" :watermark="$t('general.date')"
                            :data-vv-as="$t('general.date')" v-validate="'required'" v-on:input="setDataFilter"
                            :value="inputs.date"></date-single-bt>
                        <form-error :attribute_name="'date'" :errors_form="errors"></form-error>
                    </div>
                    <div v-if="isBill" class="form-group" :class="{ 'has-danger': errors.has('dateOfService') }">
                        <strong>{{ $t('invoice.date.service') }}</strong>
                        <date-single-bt class="m-input" name="dateOfService" :watermark="$t('invoice.date.service')"
                            :data-vv-as="$t('general.date')" v-validate="'required'" v-on:input="setDataFilter"
                            :value="inputs.dateOfService"></date-single-bt>
                        <form-error :attribute_name="'dateOfService'" :errors_form="errors"></form-error>
                    </div>
                    <div v-if="isBill" class="form-group" :class="{ 'has-danger': errors.has('amount') }">
                        <strong>{{ $t('document.amount') }}</strong>
                        <div class="m-input-icon m-input-icon--left m-input-icon--right">
                            <input type="number" step="0.01" name="amount" class="form-control m-input"
                                :placeholder="$t('document.amount')" :data-vv-as="$t('document.amount')"
                                v-validate="'required|min:1|max:13|decimal:2'" v-model="inputs.amount" ref="amount"
                                @input="sanitizeAmount" @paste="handlePaste" />
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
                        <select-from-table name="currency" :options="currencyFromSelect"
                            :watermark="$t('document.currency')" :data-vv-as="$t('document.currency')"
                            :selected="inputs.currency" v-on:input="setDataFilter"></select-from-table>
                    </div>
                    <div v-if="isBill" class="form-group" :class="{ 'has-danger': errors.has('reference') }">
                        <strong>{{ $t('assistanceBills.reference') }}</strong>
                        <div class="m-input-icon m-input-icon--left m-input-icon--right">
                            <input type="text" name="reference" class="form-control m-input"
                                :placeholder="$t('invoice.watermark.reference')"
                                :data-vv-as="$t('assistanceBills.reference')" v-validate="'required|min:2|max:60|'"
                                v-model.lazy="inputs.reference" ref="reference" />
                            <span class="m-input-icon__icon m-input-icon__icon--left">
                                <span>
                                    <i class="la la-tag"></i>
                                </span>
                            </span>
                        </div>
                        <form-error :attribute_name="'reference'" :errors_form="errors"></form-error>
                    </div>
                    <div class="form-group" :class="{ 'has-danger': errors.has('Description') }">
                        <strong>{{ $t('document.description') }}</strong>
                        <div class="m-input-icon m-input-icon--left m-input-icon--right">
                            <textarea name="Description" class="form-control m-input"
                                :placeholder="$t('invoice.watermark.description')"
                                :data-vv-as="$t('document.description')" v-validate="'required|min:2|max:255|'"
                                v-model="inputs.description" ref="Description"></textarea>
                            <span class="m-input-icon__icon m-input-icon__icon--left">
                                <span>
                                    <i class="la la-pencil-square-o"></i>
                                </span>
                            </span>
                        </div>
                        <form-error :attribute_name="'Description'" :errors_form="errors"></form-error>
                    </div>
                    <div class="form-group">
                        <div class="progress" v-if="uploadPercentage > 0">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                                :aria-valuenow="uploadPercentage" aria-valuemin="0" aria-valuemax="100"
                                :style="{ width: uploadPercentage + '%' }"></div>
                        </div>
                    </div>
                    <div class="form-group" :class="{ 'has-danger': errors.has('idAssist') }" v-if="showAssist">
                        <strong>{{ $t('assistance.assistance') }}</strong>
                        <select-from-table name="idAssist" v-validate="'required'"
                            :watermark="$t('assistance.assistance')" :data-vv-as="$t('assistance.assistance')"
                            :options="allAssistsOption" :selected="inputs.idAssist" v-on:input="setDataFilter">
                        </select-from-table>
                        <form-error :attribute_name="'idAssist'" :errors_form="errors"></form-error>
                    </div>
                    <div class="m-alert alert alert-warning pl-0 text-dark m--font-bolder"
                        v-show="errorFilesLabels.length > 0">
                        <h4 class="ml-4">{{ $t('ocr.preAudit') }}</h4>
                        <ol>
                            <li v-for="(errVal, errKey) in errorFiles">
                                {{ $t('ocr.preAuditMismatch.' + errKey, errVal) }}
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="d-flex justify-content-center p-4">
                    <button :disabled="disableForm"
                        :class="{ 'm-login__btn--primary m-loader m-loader--right m-loader--light': disableForm }"
                        type="submit" class="btn btn-block m-0 btn-primary">{{ $t('general.save') | upper }}
                    </button>
                    <div class="mx-2"></div>
                    <button type="button" class="btn btn-block m-0 btn-secondary"
                        @click.prevent="$emit('remove', file)">
                        {{ $t('general.cancel') | upper }}
                    </button>
                </div>
                <div class="m-portlet__foot m-portlet__foot--fit text-center">
                </div>
            </form>
            <div class="col-md-6 bg-secondary d-flex preview-container p-0">
                <iframe v-if="fileUrl" title="preview doc" class="rounded h-100 w-100" :src="fileUrl"></iframe>
                <h1 v-else class="m-auto d-none d-md-block">{{ $t('general.preview') | upper }}</h1>
            </div>
        </div>
    </div>
</template>
<script>
import FormError from "../FormError";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import selectMultiple from "../Tables/filters/selectFromMultipleTable.vue";
import currency from "../Labels/currency.json";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";
import sanitize from '../../custom/sanitize-data';

export default {
    components: {
        FormError,
        selectFromTable,
        selectMultiple,
        dateSingleBt,
    },
    props: {
        assistData: {
            type: Object,
            default: {}
        },
        file: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            uploadPercentage: 0,
            disableForm: false,
            response: false,
            inputs: {
                idAssist: 'id' in this.assistData ? this.assistData.id : '',
                file: "",
                docType: "",
                date: "",
                dateOfService: "",
                amount: "",
                currency: "USD",
                reference: "",
                description: "",
                idVertex: "",
                page: [],
            },
            documentsType: [],
            previewSrc: null,
            displayAlert: false,
            selectTableKey: 0, // Clave dinámica inicial
            allowedCategories: [
                7, 8, 17
            ],
        };
    },
    mounted() {
        const self = this;

        self.getDocumentsType();
        self.handleFileUpload();
        if (self.file['ocr']) {
            self.setOcr(this.file['ocr']);
        }
    },
    methods: {
        updateDescription() {
            const { patientName, code } = this.assistData;
            let { reference, dateOfService } = this.inputs;
            let description = `${code} | ${reference} | ${patientName}`;

            if (this.isBill) {
                description = `${description} | ${dateOfService}`;
            }

            this.inputs.description = description;
        },
        getDocumentsType() {
            this.axios
                .get("getDocumentsType", {
                    params: {
                        docType: this.allowedCategories
                    }
                })
                .then(response => {
                    this.documentsType = response.data.RESPONSE.RESULTS;
                });
        },
        formData() {
            const formData = new FormData();

            for (let key in this.formInputs) {
                let value = this.formInputs[key];
                if (Array.isArray(value)) {
                    for (let item of value) {
                        formData.append(key + '[]', item);
                    }
                    continue;
                }
                formData.append(key, value);

            }

            if (typeof this.inputs.file === 'string') {
                formData.append('file', this.fileUrl);
            } else {
                formData.append('file', this.inputs.file, this.inputs.file.name);
            }

            return formData;
        },
        validateDocument: function () {
            if (!this.disableForm) {
                this.$validator.validateAll().then(result => {
                    window.console.log("validateAll", result);
                    if (result) {
                        this.disableForm = true;
                        this.axios
                            .post("addInvoice", this.formData(), {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                },
                                onUploadProgress: function (progressEvent) {
                                    this.uploadPercentage = parseInt(
                                        Math.round(
                                            (progressEvent.loaded * 100) /
                                            progressEvent.total
                                        )
                                    );
                                }.bind(this)
                            })
                            .then(response => {
                                this.disableForm = false;
                                if (response.data.STATUS == "OK") {
                                    this.response = response.data;
                                    let message = this.$t('ocr.uploadSuccess', this.response.RESPONSE);
                                    if ('isDuplicate' in this.response.RESPONSE) {
                                        message = message + "<br>" + this.$t("ocr.possibleDuplicate", this.response.RESPONSE.isDuplicate);
                                    }
                                    window.Swal.fire({
                                        title: this.$t("document.send"),
                                        html: message,
                                        type: "success",
                                        confirmButtonText: this.$t("general.ok"),
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
        setDataFilter: function (campo, value) {
            this.inputs[campo] = value;
        },
        handleFileUpload: function () {
            if (!this.file.file) {
                return false;
            }

            //verificamos si files es un objeto de tipo File o un string
            if (this.fileUrl) {
                this.typeFile = this.fileUrl.includes('.pdf') ? 'pdf' : 'image';
                this.previewSrc = this.fileUrl;
                return false;
            }

            this.typeFile = this.file.file.type.match("image.*") ? "image" : this.typeFile;
            this.typeFile = this.file.file.type.match("[*]{0,}(pdf)") ? "pdf" : this.typeFile;
            if (this.typeFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    switch (this.typeFile) {
                        case "pdf":
                            this.previewSrc = URL.createObjectURL(this.file.file);
                            break;
                        case "image":
                            this.previewSrc = e.target.result;
                            break;
                    }
                }.bind(this);
                reader.readAsDataURL(this.file.file);
            }
        },
        setOcr: function (ocrResponse) {
            for (const key in ocrResponse) {
                if (key in this.inputs && key != 'description') {
                    this.inputs[key] = ocrResponse[key];
                }
            }
        },
        sanitizeAmount() {
            this.inputs.amount = sanitize.sanitizeAmount(this.inputs.amount);
        },
        handlePaste(event) {
            this.inputs.amount = sanitize.handlePaste(event, sanitize.normalizeAmount);
        }
    },
    computed: {
        currencyFromSelect() {
            return currency.reduce(function (m, e) {
                m.push({
                    id: e.code,
                    name: e.code + "-" + e.name
                });
                return m;
            }, []);
        },
        fileUrl: function () {
            if (typeof this.file.file !== 'string') {
                return false;
            }

            let url = this.file.file;

            if (this.file['ocr'] && this.inputs.page) {
                url = url + '?pages=' + encodeURIComponent(this.inputs.page.join(','));
            }

            return url;
        },
        isBill: function () {
            let keyValTypeDoc = this.documentsType.reduce(function (acum, val) {
                acum[val['id']] = val;
                return acum;
            }, {});
            return keyValTypeDoc[this.inputs.docType] ? keyValTypeDoc[this.inputs.docType]['bill'] == 'Y' : false;
        },
        pagesShow: function () {
            return [...Array(parseInt(this.file.ocr.totalPages) || 1).keys()].map(i => {
                return {
                    id: i + 1,
                    name: i + 1
                };
            });
        },
        showAssist: function () {
            return this.allAssists.length > 0 || (!('id' in this.assistData) && this.allAssists.length > 0);
        },
        allAssists: function () {
            let allAssists = [];
            if ('assistance' in this.file['ocr'] && 'assistance' in this.file.ocr) {
                allAssists = this.file.ocr.assistance;
            }
            if ('id' in this.assistData) {
                allAssists.push(this.assistData);
            }
            //eliminamos duplicados
            if (allAssists.length > 0) {
                allAssists = allAssists.filter((assist, index, self) => self.findIndex(a => a.id === assist.id) === index);
            }
            return allAssists;
        },
        allAssistsOption: function () {
            return this.allAssists.map(assist => {
                return {
                    id: assist.id,
                    name: assist.code + ' | ' + assist.patientName
                };
            });
        },
        assistDataSelected: function () {
            if (!this.inputs.idAssist) {
                return {};
            }
            if ('id' in this.assistData && this.assistData.id == this.inputs.idAssist) {
                return this.assistData;
            }
            if (this.file['ocr'] && 'assistance' in this.file['ocr']) {
                return this.file.ocr.assistance.find(assist => assist.id == this.inputs.idAssist) || {};
            }
            return {};
        },
        errorFiles: function () {
            if (!('id' in this.assistDataSelected && 'ocr' in this.file)) {
                return false;
            }
            let errors = {},
                dataOcr = this.file.ocr;

            if ('patient' in dataOcr && 'dateOfBirth' in dataOcr.patient) {
                if (dataOcr.patient.dateOfBirth != this.assistDataSelected.dobPatient) {
                    errors['dob'] = { 'dob': dataOcr.patient.dateOfBirth };
                }
            }
            if ('payee' in dataOcr) {
                if (!sanitize.compareNames(dataOcr.payee, this.assistDataSelected.patientName)) {
                    errors['passenger'] = { 'passenger': dataOcr.payee };
                }
            }

            if ('date' in dataOcr) {

                let startDate = moment(this.assistDataSelected.startDate);
                let endDate = moment(this.assistDataSelected.endDate);
                let documentDate = moment(dataOcr.date);

                //verificamos si la fecha del documento esta dentro del rango de la asistencia
                if (documentDate.isBefore(startDate)) {
                    errors['dateOutOfRangeBefore'] = { 'date': dataOcr.date };
                }
                if (documentDate.isAfter(endDate)) {
                    errors['dateOutOfRangeAfter'] = { 'date': dataOcr.date };
                }
            }
            if ('match' in dataOcr) {
                if ('codeAssistance' in dataOcr.match && !dataOcr.match.codeAssistance.includes(this.assistDataSelected.code)) {
                    let codeAssistance = dataOcr.match.codeAssistance.join(' | ');
                    errors['assistance'] = { 'code': codeAssistance };
                }
                if ('voucher' in dataOcr.match && !dataOcr.match.voucher.includes(this.assistDataSelected.voucher)) {
                    let voucher = dataOcr.match.voucher.join(' | ');
                    errors['voucher'] = { 'voucher': voucher };
                }
            }

            return errors;
        },
        errorFilesLabels: function () {
            return Object.keys(this.errorFiles);
        },
        preAuditData: function () {
            let dataAssistance = {},
                dataOcr = {},
                preAudit = '',
                preAuditData = {};

            if ('id' in this.assistDataSelected) {
                dataAssistance = this.assistDataSelected;
            }
            if ('ocr' in this.file) {
                dataOcr = { ...this.file.ocr, assistance: '' };
                delete dataOcr['assistance'];
            }
            if (this.errorFilesLabels.length > 0) {
                preAudit = Object.keys(this.errorFiles).join(',');
                preAuditData = Object.values(this.errorFiles).reduce((acm, item) => {
                    acm = {
                        ...acm,
                        ...item
                    };
                    return acm;
                }, {});
            }
            return {
                dataAssistance: sanitize.jsonEncode(dataAssistance),
                dataOcr: sanitize.jsonEncode(dataOcr),
                preAudit: preAudit,
                preAuditData: sanitize.jsonEncode(preAuditData)
            };
        },
        formInputs() {
            return {
                "reference": this.inputs.reference,
                "description": this.inputs.description,
                "currency": this.inputs.currency,
                "date": this.inputs.date,
                "dateOfService": this.inputs.dateOfService,
                "amount": this.inputs.amount,
                "page": this.inputs.page,

                "dataAssistance": this.preAuditData.dataAssistance,
                "dataOcr": this.preAuditData.dataOcr,
                "preAudit": this.preAuditData.preAudit,
                "preAuditData": this.preAuditData.preAuditData,

                'idAssist': this.inputs.idAssist,

                "docType": this.inputs.docType,
                "idProvider": this.$session.get("provider").id,
                "idVertex": 'idVertex' in (this.file['ocr'] || {}) ? this.file.ocr.idVertex : '',
            };
        },
    },
    beforeDestroy() {
        if (!this.response && this.file['ocr']) {
            this.axios.post("ocr/cancel",
                {
                    idVertex: this.file.ocr.idVertex,
                    idAssist: 'id' in this.assistData ? this.assistData.id : '',
                    formInputs: this.formInputs
                }).then(response => {
                    console.log(response);
                });
        }
    },
    watch: {
        'inputs.dateOfService': 'updateDescription',
        'inputs.reference': 'updateDescription',
        'inputs.docType': 'updateDescription',
        '$root.$i18n.locale': {
            handler(newVal) {
                this.getDocumentsType();
                this.selectTableKey += 1; // Cambia la clave para forzar la re-renderización
            },
            deep: true
        }
    },
};
</script>
<style>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>