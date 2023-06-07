<template>
    <div>
        <div v-if="documentsTypeGroup.length>1 && !inputsData.docTypeGroup">
            <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <span class="m-portlet__head-icon m--hide">
                            <i class="la la-gear"></i>
                        </span>
                        <h3 class="m-portlet__head-text">
                            {{ $t('reimbursement.information') }}
                        </h3>
                    </div>
                </div>
            </div>
            <div class="m-portlet__body">
                <div class="row">
                    <div class="col-md-6" v-for="group in documentsTypeGroup " :key="group.id">
                        <div class="form-group">
                            <button  class="btn-block btn btn-lg btn-primary"
                                    @click.prevent="setDataFilter('docTypeGroup',group.id)"
                                    type="button">
                                    {{ group.name }}
                                <span class="pull-right badge badge-secondary">
                                    <span class="m-0 h5">
                                        {{ group['total'] }}/{{ group['uploaded'] }}
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row mx-0">
                <form
                    class="m-form m-form--fit m-form--label-align-right"
                    :class="[typeFile?'col-md-6':'col-md-12 mx-auto']"
                    @submit.prevent="validRefunds"
                    enctype="multipart/form-data"
                    ref="form"
                >
                    <div class="m-portlet__head">
                        <div
                            class="m-portlet__head-caption"
                        >
                            <div
                                class="m-portlet__head-title"
                            >
                                <span
                                    class="m-portlet__head-icon m--hide"
                                >
                                    <i class="la la-gear"></i>
                                </span>
                                <h3
                                    class="m-portlet__head-text"
                                >{{ $t('reimbursement.information') }}</h3>
                            </div>
                        </div>
                        <div class="m-portlet__head-tools">
                            <button v-if="documentsTypeGroup.length>1" class="btn"
                                    @click.prevent="inputsData.docTypeGroup = null"
                                    type="button"
                                >{{ $t('general.back') }}
                            </button>
                        </div>
                    </div>
                    <div class="m-portlet__body">
                        <div
                            class="form-group m-form__group"
                            v-if="defaultData.caseType"
                        >
                            <strong>{{ $t('assistance.type') }}</strong>
                            <input-from-table
                                class="m-form__group-sub"
                                icon="flaticon-lifebuoy"
                                :value="defaultData.caseType"
                                :readonly="true"
                            ></input-from-table>
                        </div>
                        <div
                            class="form-group m-form__group"
                            v-if="defaultData.assistanceType"
                        >
                            <strong>{{ $t('assistance.typeAssistance') }}</strong>
                            <input-from-table
                                class="m-form__group-sub"
                                icon="flaticon-lifebuoy"
                                :value="defaultData.assistanceType"
                                :readonly="true"
                            ></input-from-table>
                        </div>
                        <div
                            class="ffilorm-group m-form__group"
                            :class="{'has-danger': errors.has('docType')}"
                        >
                            <strong>{{ $t('document.type') }}</strong>
                            <select-from
                                name="docType"
                                v-validate="'required'"
                                :data-vv-as="$t('document.type')"
                                :options="documentsTypeVisible"
                                :selected="inputsData.docType"
                                v-on:input="setDataFilter"
                            ></select-from>
                            <form-error
                                :attribute_name="'docType'"
                                :errors_form="errors"
                            ></form-error>
                        </div>
                        <div class="form-group m-form__group pt-2 pb-0" v-if="extraDescription">
                            <div class="m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-info alert-dismissible fade show m-0" role="alert">
                                <div class="m-alert__icon py-3 px-3">
                                    <i class="fa fa-2x fa-info-circle"></i>
                                    <span></span>
                                </div>
                                <div class="m-alert__text py-3">
                                    {{ extraDescription }}
                                </div>
                            </div>
                        </div>
                        <div class="form-group m-form__group pt-2 pb-0" v-if="extraInfo">
                            <a :href="extraInfo.file" download target="_blank">
                                <div class="m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-brand alert-dismissible fade show m-0" role="alert">
                                    <div class="m-alert__icon py-3 px-3">
                                        <i class="fa fa-2x fa-cloud-download-alt"></i>
                                        <span></span>
                                    </div>
                                    <div class="m-alert__text py-3">
                                        <strong>{{ $t('general.important') }}</strong>
                                        {{ extraInfo.description }}
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div v-if="showRefund">
                            <div
                                class="form-group m-form__group"
                                :class="{'has-danger': errors.has('date')}"
                            >
                                <strong>{{ $t('reimbursement.date.document') }}</strong>
                                <date-single-bt
                                    class="m-input"
                                    name="date"
                                    watermark="Date"
                                    v-validate="'required'"
                                    :data-vv-as="$t('eimbursement.date.document')"
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
                                <strong>{{ $t('document.amount') }}</strong>
                                <div
                                    class="m-input-icon m-input-icon--left m-input-icon--right"
                                >
                                    <input
                                        type="text"
                                        name="amount"
                                        class="form-control m-input"
                                        :placeholder="$t('document.amount')"
                                        v-validate="'required|min:1|max:10|decimal:2'"
                                        :data-vv-as="$t('document.amount')"
                                        v-model.lazy="inputsData.amount"
                                        ref="amount"
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
                                <strong>{{ $t('document.currency') }}</strong>
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
                                <strong>{{ $t('reimbursement.payee') }}</strong>
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
                            <div
                                class="form-group m-form__group"
                                :class="{'has-danger': errors.has('reference')}"
                            >
                                <strong>{{ $t('reimbursement.reference') }}</strong>
                                <div
                                    class="m-input-icon m-input-icon--left m-input-icon--right"
                                >
                                    <input
                                        type="text"
                                        name="reference"
                                        class="form-control m-input"
                                        :placeholder="$t('reimbursement.reference')"
                                        v-validate="'required|min:2|max:40|'"
                                        :data-vv-as="$t('reimbursement.reference')"
                                        v-model.lazy="inputsData.reference"
                                        ref="reference"
                                    />
                                    <span
                                        class="m-input-icon__icon m-input-icon__icon--left"
                                    >
                                        <span>
                                            <i
                                                class="la la-tag"
                                            ></i>
                                        </span>
                                    </span>
                                </div>
                                <form-error
                                    :attribute_name="'reference'"
                                    :errors_form="errors"
                                ></form-error>
                            </div>
                        </div>
                        <div
                            class="form-group m-form__group"
                            :class="{'has-danger': errors.has('Description')}"
                        >
                            <strong>{{ $t('document.description') }}</strong>
                            <div
                                class="m-input-icon m-input-icon--left m-input-icon--right"
                            >
                                <textarea
                                    name="Description"
                                    class="form-control m-input"
                                    :placeholder="$t('document.description')"
                                    v-validate="'required|min:2|max:255|'"
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
                            <strong>{{ $t('document.file') }}</strong>
                            <div class="custom-file">
                                <input
                                    type="file"
                                    name="file"
                                    class="custom-file-input"
                                    id="file"
                                    accept="application/pdf, image/gif, image/jpg, image/jpeg, image/png"
                                    v-validate="'required|ext:jpeg,jpg,pdf,png,gif,bmp'"
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
                                v-show="disableForm?false:(captcha.length==0)"
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
                    <div
                        class="m-portlet__foot m-portlet__foot--fit text-center"
                    >
                        <div class="m-form__actions">
                            <button
                                :disabled="disableForm"
                                :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                                type="submit"
                                class="btn btn-primary"
                            >{{ $t('general.send') }}</button>
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
                    ></iframe>
                    <img
                        v-if="typeFile=='image'"
                        class="m-0 my-auto rounded w-100 h-auto"
                        :src="previewSrc"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import FormError from "../FormError";
import selectFrom from "../Tables/filters/selectFromTable.vue";
import inputFromTable from "../Tables/filters/inputFromTable.vue";
import currency from "../Labels/currency.json";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";
import VueRecaptcha from "vue-recaptcha";

export default {
    components: {
        FormError,
        selectFrom,
        inputFromTable,
        dateSingleBt,
        VueRecaptcha
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
                    formData.append("g-recaptcha", this.captcha);
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
                                        title: this.$t("document.send"),
                                        text: this.$t("document.uploaded"),
                                        type: "success",
                                        showCancelButton: true,
                                        confirmButtonText: this.$t("document.uploadAnother"),
                                        cancelButtonText: this.$t("general.no")
                                    }).then(result => {
                                        this.inputsData.reference = "";
                                        this.inputsData.amount = "";
                                        this.inputsData.description = "";
                                        //this.captcha = '';
                                        this.file = false;
                                        this.previewSrc = false;
                                        this.typeFile = false;
                                        this.$refs.file.value = null;
                                        this.inputsData.docType = null;
                                        this.inputsData.docTypeGroup = null;
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
                                            window.Swal.fire({
                                                title: this.$t("windows.close"),
                                                text: this.$t("windows.pleaseClose"),
                                                confirmButtonText: this.$t("general.ok"),
                                                type: "error"
                                            }).then(() => { 
                                                window.close();
                                            });
                                        }
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
                                        title: "Error",
                                        text: response.data.MESSAGE,
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
        extraInfo: function () {
            let docTypeSelected = this.documentsType.filter((v) => {
                return v.id == this.inputsData.docType && this.inputsData.docTypeGroup == v['group'];
            });
            if (docTypeSelected.length == 0) {
                return false;
            }
            if ('insurance' in docTypeSelected[0]) {
                return {
                    description: docTypeSelected[0].insurance['description'][this.$root.$i18n.locale],
                    file: docTypeSelected[0].insurance.file,
                    name: docTypeSelected[0].name
                }
            }
            return false;
        },
        extraDescription: function () {
            let docTypeSelected = this.documentsType.filter((v) => {
                return v.id == this.inputsData.docType && this.inputsData.docTypeGroup == v['group'];
            });
            if (docTypeSelected.length == 0) {
                return false;
            }
            return docTypeSelected[0].description;
        },
        showRefund: function () {
            let docTypeSelected = this.documentsType.filter((v) => {
                return v.id == this.inputsData.docType;
            });
            
            if (docTypeSelected.length == 0) {
                return false;
            }
            return docTypeSelected[0].refund=='Y';
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
        }
    }
};
</script>
