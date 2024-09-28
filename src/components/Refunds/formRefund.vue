<template>
    <div>
        <div
            class="progress progress-refund align-items-center"
        >
            <div
                class="progress-bar m--bg-primary"
                role="progressbar"
                :aria-valuenow="documentProgress.percentage"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{width: documentProgress.percentage+'%'}"
            >
            <span v-if="documentProgress.percentage>35">
                {{ documentProgress.html }}
            </span>
            <span v-else>&nbsp;</span>
            </div>
            <span class="px-2" v-if="documentProgress.percentage<35">
                {{ documentProgress.html }}
            </span>
        </div>
        <div class="m-portlet m-portlet--tab form-refund">
            <group-btn-refund
                v-if="documentsTypeGroup.length>1 && !inputsData.docTypeGroup"
                :groups="documentsTypeGroup"
                @set-group="setDataFilter">
            </group-btn-refund>
            <group-document-type
                v-else-if="!inputsData.docType"
                :documents-type="documentsTypeVisible"
                :groups="documentsTypeGroup"
                @set-document-type="setDataFilter">
            </group-document-type>
            <div v-else>
                <div class="row mx-0">
                    <form
                        class="m-form m-form--fit m-form--label-align-right p-0 "
                        :class="[typeFile?'col-md-6':'col-md-12 mx-auto']"
                        @submit.prevent="validRefunds"
                        enctype="multipart/form-data"
                        ref="form"
                    >
                        <div>
                            <div class="m-portlet__head">
                                <div class="m-portlet__head-caption">
                                    <div class="m-portlet__head-title">
                                        <h3 class="m-portlet__head-text" v-if="documentsTypeSelected">
                                            {{ documentsTypeSelected.name }}
                                        </h3>
                                        <h3 v-else
                                            class="m-portlet__head-text"
                                        >{{ $t('reimbursement.information') }}</h3>
                                    </div>
                                </div>
                                <div class="m-portlet__head-tools">
                                    <button class="btn"
                                            @click.prevent="back()"
                                            type="button"
                                        >{{ $t('general.back') | upper }}
                                    </button>
                                </div>
                            </div>
                            <div class="m-portlet__body">
                                <div class="form-group m-form__group pt-0 pb-2" v-if="extraInsurance">
                                    <h5>{{ $t('refunds.downloadAndFill') }}</h5>
                                </div>
                                <div class="form-group m-form__group py-1" v-if="extraInsurance">
                                    <a :href="extraInsurance.file" download target="_blank">
                                        <div class="m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-brand alert-dismissible fade show m-0" role="alert">
                                            <div class="m-alert__icon py-3 px-3">
                                                <i class="fa fa-2x fa-cloud-download-alt"></i>
                                                <span></span>
                                            </div>
                                            <div class="m-alert__text py-3">
                                                <label class="col-form-label">{{ $t('general.important') }}</label>
                                                {{ extraInsurance.description }}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div class="form-group m-form__group py-1" v-if="docTypeSelected && docTypeSelected.description">
                                    <div class="m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-info alert-dismissible fade show m-0" role="alert">
                                        <div class="m-alert__icon py-3 px-3">
                                            <i class="fa fa-2x fa-info-circle"></i>
                                            <span></span>
                                        </div>
                                        <div class="m-alert__text py-3">
                                            {{ docTypeSelected.description }}
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group m-form__group py-1" v-if="extraCausal">
                                    <a :href="extraCausal.file" download target="_blank">
                                        <div class="m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-brand alert-dismissible fade show m-0" role="alert">
                                            <div class="m-alert__icon py-3 px-3">
                                                <i class="fa fa-2x fa-cloud-download-alt"></i>
                                                <span></span>
                                            </div>
                                            <div class="m-alert__text py-3">
                                                <label class="col-form-label">{{ $t('general.important') }}</label>
                                                {{ extraCausal.description }}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div v-if="docTypeSelected && docTypeSelected.refund == 'Y'">
                                    <div
                                        class="form-group m-form__group"
                                        :class="{'has-danger': errors.has('date')}"
                                    >
                                        <label class="col-form-label">{{ $t('reimbursement.date.document') }}</label>
                                        <date-single-bt
                                            class="m-input"
                                            name="date"
                                            watermark="Date"
                                            v-validate="'required'"
                                            :data-vv-as="$t('reimbursement.date.document')"
                                            v-on:input="setDataFilter"
                                            :value="inputsData.date"
                                        ></date-single-bt>
                                        
                                        <form-error
                                            :attribute_name="'date'"
                                            :errors_form="errors"
                                        ></form-error>
                                    </div>
                                    <div
                                        class="form-group m-form__group"
                                        :class="{'has-danger': errors.has('amount')}"
                                    >
                                        <label class="col-form-label">{{ $t('document.amount') }}</label>
                                        <div
                                            class="m-input-icon m-input-icon--left m-input-icon--right"
                                        >
                                            <input
                                                type="number"
                                                step="0.01"
                                                name="amount"
                                                class="form-control m-input"
                                                :placeholder="$t('document.amount')"
                                                v-validate="'required|min:1|max:13|decimal:2'"
                                                :data-vv-as="$t('document.amount')"
                                                v-model="inputsData.amount"
                                                ref="amount"
                                                @input="sanitizeAmount"
                                                @paste="handlePaste"
                                            />
                                            <span
                                                class="m-input-icon__icon m-input-icon__icon--left"
                                            >
                                                <span>
                                                    <i
                                                        class="la la-money"
                                                    ></i>
                                                </span>
                                            </span>
                                        </div>
                                        <form-error
                                            :attribute_name="'amount'"
                                            :errors_form="errors"
                                        ></form-error>
                                    </div>
                                    <div
                                        class="form-group m-form__group"
                                    >
                                        <label class="col-form-label">{{ $t('document.currency') }}</label>
                                        <select-from
                                            name="currency"
                                            :options="currencyFromSelect"
                                            :selected="inputsData.currency"
                                            v-on:input="setDataFilter"
                                        ></select-from>
                                    </div>
                                    <div
                                        class="form-group m-form__group"
                                        :class="{'has-danger': errors.has('nameBen')}"
                                    >
                                        <label class="col-form-label">{{ $t('reimbursement.payee') }}</label>
                                        <div
                                            class="m-input-icon m-input-icon--left m-input-icon--right"
                                        >
                                            <input
                                                type="text"
                                                name="nameBen"
                                                class="form-control m-input"
                                                :placeholder="$t('reimbursement.payee')"
                                                v-validate="'required|min:2|max:250|'"
                                                :data-vv-as="$t('reimbursement.payee')"
                                                v-model.lazy="inputsData.nameBen"
                                                ref="nameBen"
                                            />
                                            <span
                                                class="m-input-icon__icon m-input-icon__icon--left"
                                            >
                                                <span>
                                                    <i
                                                        class="la la-user"
                                                    ></i>
                                                </span>
                                            </span>
                                        </div>
                                        <form-error
                                            :attribute_name="'nameBen'"
                                            :errors_form="errors"
                                        ></form-error>
                                    </div>
                                </div>
                                <div
                                    class="form-group m-form__group"
                                    :class="{'has-danger': errors.has('Description')}"
                                >
                                    <label class="col-form-label">{{ $t('document.description') }}</label>
                                    <div
                                        class="m-input-icon m-input-icon--left m-input-icon--right"
                                    >
                                        <textarea
                                            name="Description"
                                            class="form-control m-input"
                                            :placeholder="$t('document.description')"
                                            v-validate="'max:255'"
                                            :data-vv-as="$t('document.description')"
                                            v-model="inputsData.description"
                                            ref="Description"
                                        ></textarea>
                                        <span
                                            class="m-input-icon__icon m-input-icon__icon--left"
                                        >
                                            <span>
                                                <i
                                                    class="la la-pencil-square-o"
                                                ></i>
                                            </span>
                                        </span>
                                    </div>
                                    <form-error
                                        :attribute_name="'Description'"
                                        :errors_form="errors"
                                    ></form-error>
                                </div>
                                <div
                                    class="form-group m-form__group"
                                    :class="{'has-danger': errors.has('file')}"
                                >
                                    <h5 v-if="extraInsurance">{{ $t('refunds.uploadCompletedDocument') }}</h5>
                                    <label class="col-form-label" v-else>{{ $t('document.file') }}</label>
                                    <div class="custom-file">
                                        <input
                                            type="file"
                                            name="file"
                                            class="custom-file-input"
                                            id="file"
                                            accept="application/pdf, image/gif, image/jpg, image/jpeg, image/png"
                                            v-validate="'required|max_size|ext:jpeg,jpg,pdf,png,gif,bmp'"
                                            :data-vv-as="$t('document.file')"
                                            ref="file"
                                            v-on:change="handleFileUpload"
                                        />
                                        <label
                                            class="custom-file-label"
                                            :class="['custom-file-'+$root.$i18n.locale]"
                                            for="file"
                                        >{{ (typeof file =='object' &&'name' in file)?file.name:$t('document.choose') }}</label>
                                    </div>
                                    <div
                                        class="progress"
                                        v-if="uploadPercentage>0"
                                    >
                                        <div
                                            class="progress-bar progress-bar-striped progress-bar-animated"
                                            role="progressbar"
                                            :aria-valuenow="uploadPercentage"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            :style="{width: uploadPercentage+'%'}"
                                        ></div>
                                    </div>
                                    <form-error
                                        :attribute_name="'file'"
                                        :errors_form="errors"
                                    ></form-error>
                                </div>
                                <transition
                                    :duration="1500"
                                    name="fade"
                                    mode="in-out"
                                >
                                    <div
                                        v-show="(disableForm?false:(captcha.length==0 || errors.has('recaptcha')))"
                                        class="form-group m-form__group"
                                        :class="{'has-danger': errors.has('recaptcha')}"
                                    >
                                        <vue-recaptcha
                                            :sitekey="siteKey"
                                            ref="recaptcha"
                                            v-on:verify="onCaptchaVerified"
                                            v-on:expired="onCaptchaExpired"
                                            :loadRecaptchaScript="true"
                                        ></vue-recaptcha>
                                        <input
                                            type="hidden"
                                            name="recaptcha"
                                            id="recaptcha"
                                            v-validate="'recaptcha'"
                                            v-model="captcha"
                                        />
                                        <form-error
                                            :attribute_name="'recaptcha'"
                                            :errors_form="errors"
                                        ></form-error>
                                    </div>
                                </transition>
                            </div>
                            <div class="m-portlet__foot m-portlet__foot--fit text-center">
                                <div class="m-form__actions">
                                    <button
                                        :disabled="disableForm"
                                        :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                                        type="submit"
                                        class="btn btn-lg btn-primary"
                                    >{{ $t('general.send') }}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div
                        :class="typeFile?'d-flex':'d-none'"
                        class="col-md-6 rounded bg-dark preview-container p-0"
                    >
                        <iframe
                            v-if="typeFile=='pdf'"
                            class="rounded h-100 w-100"
                            :src="previewSrc"
                            title="PDF Preview"
                        ></iframe>
                        <img
                            v-if="typeFile=='image'"
                            class="m-0 my-auto rounded w-100 h-auto"
                            :src="previewSrc"
                            alt="Image Preview"
                        />
                    </div>
                </div>
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
import selectFrom from "../Tables/filters/selectFromTable.vue";
import inputFromTable from "../Tables/filters/inputFromTable.vue";
import currency from "../Labels/currency.json";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";
import VueRecaptcha from "vue-recaptcha";
import groupBtnRefund from './groupBtnRefund.vue';
import groupDocumentType from './groupDocumentType.vue';
import sanitize from '../../custom/sanitize-data';

export default {
    components: {
        FormError,
        selectFrom,
        inputFromTable,
        dateSingleBt,
        VueRecaptcha,
        groupBtnRefund,
        groupDocumentType
    },
    props:['idAssist','default-data'],
    data() {
        return {
            siteKey: this.$env.VUE_APP_RE_CAPCHA_PUBLIC,
            uploadPercentage: 0,
            disableForm: false,
            inputsData: {
                reference: "",
                currency: "USD",
                amount: "",
                description: "",
                date: "",
                nameBen: this.defaultData['nameBen'],
                docTypeGroup: null,
                docType: null,
            },
            documentsType: [],
            file: false,
            captcha: "",
            previewSrc: null,
            typeFile: false,
            displayAlert: false,
            idFiles:[],
        };
    },
    mounted() {
        this.getDocumentsType();
        let self = this;
        window.onbeforeunload = function (e) {
            e = e || window.event;
            if (self.idFiles.length > 0) {
                self.axios
                    .post("addRefundNotified", {
                        idFiles: self.idFiles
                    }).then(() => {
                        self.idFiles = [];
                    });
                if (e) {
                    e.returnValue = 'Sure?';
                }
                // Esta es para Safari
                return 'Sure?';
            }
        };
    },
    methods: {
        sanitizeAmount() {
            this.inputsData.amount = sanitize.sanitizeAmount(this.inputsData.amount);
        },
        handlePaste(event) {
            this.inputsData.amount = sanitize.handlePaste(event, sanitize.normalizeAmount);
        },
        getDocumentsType: function () {
            this.documentsType = [];
            this.axios.get("getDocumentsTypeRefound", {
                params: {
                    idAssist: this.idAssist,
                    timestamp:(new Date()).getTime(),//enviamos un parámetro dinámico para deshabilitar la cache de axios
                }
            }).then(response => {
                this.documentsType = response.data.RESPONSE.RESULTS;
            });
        },
        validRefunds: function() {
            if (!this.disableForm) {
                this.$validator.validateAll().then(result => {
                    if (!this.captcha) {
                        return false;
                    }
                    const formData = new FormData();
                    formData.append("file", this.file);
                    formData.append("idAssist", this.idAssist);
                    formData.append("reference", this.inputsData.reference);
                    formData.append("description", this.inputsData.description);
                    formData.append("currency", this.inputsData.currency);
                    formData.append("date", this.inputsData.date);
                    formData.append("amount", this.inputsData.amount);
                    formData.append("nameBen", this.inputsData.nameBen);
                    formData.append("docType", this.inputsData.docType);
                    formData.append("idFiles", this.idFiles);
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
                                            (progressEvent.loaded * 100) /
                                                progressEvent.total
                                        )
                                    );
                                }.bind(this)
                            })
                            .then(response => {
                                this.disableForm = false;
                                if (response.data.STATUS == "OK") {
                                    if (response.data['NOTIFIED']) {
                                        this.idFiles = [];
                                        this.$emit('complete-documents');
                                    } else {
                                        this.idFiles.push(response.data.ID);
                                    }
                                    /* this.$refs.recaptcha.reset(); */
                                    window.Swal.fire({
                                        title: null,
                                        text: this.$t("document.uploaded"),
                                        type: "success",
                                        showCancelButton: true,
                                        confirmButtonText: this.$t("document.uploadAnother"),
                                        cancelButtonText: this.$t("general.back")
                                    }).then(result => {
                                        this.inputsData.reference = "";
                                        this.inputsData.amount = "";
                                        this.inputsData.description = "";
                                        this.file = false;
                                        this.previewSrc = false;
                                        this.typeFile = false;
                                        this.$refs.file.value = null;
                                        this.back();
                                        this.getDocumentsType();
                                        if (
                                            result.dismiss === window.Swal.DismissReason.cancel
                                        ) {
                                            if (this.idFiles.length > 0) {
                                                this.axios
                                                    .post("addRefundNotified", {
                                                        idFiles: this.idFiles
                                                    }).then(() => { 
                                                        this.idFiles = [];
                                                    })
                                            }
                                        }
                                    });
                                } else {
                                    let listErrors = [];
                                    if (response.data.ERRORS) {
                                        for (var prop in response.data.ERRORS) {
                                            this.errors.add({
                                                field: prop,
                                                msg: response.data.ERRORS[prop]
                                            });
                                            listErrors.push(response.data.ERRORS[prop]);
                                        }
                                    }
                                    window.Swal.fire({
                                        title: response.data.MESSAGE,
                                        html: (listErrors.length>0?
                                            '<ol><li class="text-left">' +
                                            listErrors.join('</li><li class="class="text-left">') +
                                            '</li><ol>':''),
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
            this.inputsData[campo] = value;
            if (campo == 'docTypeGroup') {
                this.inputsData.docType = null;
            }
        },
        handleFileUpload: function(event) {
            this.file = event.target.files[0];
            this.previewSrc = false;
            this.typeFile = false;
            if (!this.file || this.errors.has("file")) {
                return false;
            }
            this.typeFile = this.file.type.match("image.*") ? "image" : this.typeFile;
            this.typeFile = this.file.type.match("[*]{0,}(pdf)") ? "pdf" : this.typeFile;
            if (this.typeFile) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    switch (this.typeFile) {
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
        },
        onCaptchaVerified: function(recaptchaToken) {
            this.captcha = recaptchaToken;
        },
        onCaptchaExpired: function() {
            this.captcha = "";
            this.$refs.recaptcha.reset();
        },
        back: function() {
            if(this.documentsTypeVisible.length==1){
                this.inputsData.docTypeGroup = null;
            }
            this.inputsData.docType = null;
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
        extraInsurance: function () {
            if ('insurance' in this.documentsTypeSelected) {
                return {
                    description: this.documentsTypeSelected.insurance['description'][this.$root.$i18n.locale],
                    file: this.documentsTypeSelected.insurance.file,
                    name: this.documentsTypeSelected.name
                }
            }
            return false;
        },
        extraCausal: function () {
            let docTypeSelected = this.documentsType.filter((v) => {
                return v.id == this.inputsData.docType;
            });
            if (docTypeSelected.length == 0) {
                return false;
            }
            if ('causal' in docTypeSelected[0]) {
                return {
                    description: docTypeSelected[0].causal['description'][this.$root.$i18n.locale],
                    file: docTypeSelected[0].causal.file,
                    name: docTypeSelected[0].name
                }
            }
            return false;
        },
        docTypeSelected: function () {
            let docTypeSelected = this.documentsType.filter((v) => {
                return v.id == this.inputsData.docType;
            });
            if (docTypeSelected.length == 0) {
                return false;
            }
            return docTypeSelected[0];
        },
        documentProgress: function () { 
            let percentage = this.documentsType.reduce(function (m, e) {
                m['total']=(m['total']||0)+1; 
                m['uploaded']=(m['uploaded']||0)+(e['uploaded']?1:0); 
                m['pending']=(m['pending']||0)+(e['pending']?0:1); 

                return m;
            }, {
                total: 0,
                uploaded:0,
                pending: 0,
                percentage:0,
                html:''
            });
            if (percentage.uploaded > 0) {
                percentage.percentage = Math.round((percentage.uploaded / percentage.total) * 100);
            }
            percentage.html = '(' + percentage.uploaded + '/' + percentage.total + ') ' + percentage.percentage + '%';
            return percentage;
        },
        documentsTypeGroup: function () {
            let self = this,
            arrReturn = [],
            group = this.documentsType.reduce(function (m, e) {
                let provideOrDownload = 'insurance' in e ? 'download' : 'provide';
                if (!(provideOrDownload in m)) {
                    m[provideOrDownload] = {
                        id:provideOrDownload,
                        name: self.$t("refunds." + (provideOrDownload == 'download' ? 'documentToDownload' : 'documentToProvide')),
                    };
                }
                m[provideOrDownload]['total']=(m[provideOrDownload]['total']||0)+1; 
                m[provideOrDownload]['uploaded']=(m[provideOrDownload]['uploaded']||0)+(e['uploaded']?1:0); 
                m[provideOrDownload]['selected']=self.inputsData.docTypeGroup==provideOrDownload;

                return m;
            }, {});
            if('provide' in group) {
                arrReturn.push(group.provide);
            }
            if('download' in group) {
                arrReturn.push(group.download);
            }
            return arrReturn;
        },
        documentsTypeVisible: function () {
            let self = this;
            return this.documentsType.reduce(function (m, e) {
                e['group'] = 'insurance' in e ? 'download' : 'provide';
                if (e['uploaded']) {
                    e['icon'] = 'fa fa-check text-success';
                }
                if (self.inputsData.docTypeGroup == e['group'] || !self.inputsData.docTypeGroup) {
                    m.push(e);
                }
                return m;
            }, []);
        },
        documentsTypeSelected: function () {
            let selected = this.documentsType.filter((v) => {
                return v.id == this.inputsData.docType;
            });
            if(selected.length==1) {
                return selected[0];
            }
            return false;
        }
    },
    watch:{
        '$root.$i18n.locale': {
            handler(newVal) {
                this.getDocumentsType();
            },
            deep: true
        }
    }
};
</script>
