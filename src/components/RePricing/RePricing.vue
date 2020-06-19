<style scoped src="../Assists/Assist.css"></style>
<style src="../Element/custom-m-loader.css"></style>
<style scoped>
.add-files textarea {
    min-height: 75px;
    resize: none;
}
.add-files .col-md-6 {
    display: inline-block !important;
}
.preview-container iframe {
    min-height: 350px !important;
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
.eob-fee {
    padding-left: 0px;
}
</style>
<template>
    <div class="content-tabs-left">
        <ul class="nav nav-tabs tabs-left">
            <li :class="{active:tabShow=='General'}" v-tooltip:top="'General'">
                <a
                    class="nav-link"
                    :class="{'m--font-success':tabShow=='General'}"
                    @click.prevent="showTab('General')"
                >
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <span>General</span>
                </a>
            </li>
            <li v-tooltip:top="'Upload Documents'">
                <a
                    class="nav-link"
                    :class="{'m--font-success':tabShow=='upload-documents'}"
                    @click.prevent="showTab('upload-documents')"
                >
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <span>Upload Documents</span>
                </a>
            </li>
        </ul>
        <div class="tab-content container-fluid">
            <div class="tab-pane" :class="{active:tabShow=='General'}">
                <div
                    class="m-portlet m-portlet--full-height"
                    :class="{'m-loader m-loader--metal m-loader--div':showLoader}"
                >
                    <div class="m-portlet__body m-portlet__body--no-padding">
                        <div class="row m-row--no-padding m-row--col-separator-xl">
                            <AssistAccordionDetaill class-prop="col-md-6">
                                <template slot="title">Re pricing</template>
                                <template slot="body">
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Status</span>
                                        <span class="m-widget16__price m--align-right">
                                            <span
                                                class="m-badge m-badge--wide"
                                                :class="['m-badge--'+rePricingDetaill.rePricing.status.color ]"
                                            >{{ rePricingDetaill.rePricing.status.label }}</span>
                                        </span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Client</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.client }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Assist Code</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.assist.code }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Voucher</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.assist.voucher }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Name</span>
                                        <span class="m-widget16__price m--align-right">
                                            {{ rePricingDetaill.rePricing.contact.fisrtName }}
                                            {{ rePricingDetaill.rePricing.contact.lastName }}
                                        </span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Birth Date</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.contact.birthDate }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Age</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.contact.age }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">User</span>
                                        <span class="m-widget16__price m--align-right">
                                            {{ rePricingDetaill.rePricing.user.fullName }}
                                            <small>({{ rePricingDetaill.rePricing.user.user }})</small>
                                        </span>
                                    </div>
                                </template>
                            </AssistAccordionDetaill>
                            <AssistAccordionDetaill class-prop="col-md-6">
                                <template slot="title">Invoice</template>
                                <template slot="body">
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Category</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.category }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Referencia</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.ref }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Date</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.date }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Description</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.description }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Monto</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.monto | currency(rePricingDetaill.invoice.currency)}}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Exchange Rate</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.exchangeRate | toFixed(5) }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Monto USD</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.montoUsd | currency("USD")}}</span>
                                    </div>
                                </template>
                            </AssistAccordionDetaill>
                            <AssistAccordionDetaill class-prop="col-md-12">
                                <template slot="title">Invoice File</template>
                                <template slot="body">
                                    <iframe
                                        class="preview"
                                        v-if="rePricingDetaill.invoice.view == 'doc'"
                                        :src="baseUrlApi()+'streaming/'+rePricingDetaill.invoice.id"
                                    ></iframe>
                                    <img
                                        class="preview"
                                        v-else
                                        :src="baseUrlApi()+'streaming/'+rePricingDetaill.invoice.id"
                                    />
                                </template>
                            </AssistAccordionDetaill>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane" :class="{active:tabShow=='upload-documents'}">
                <template>
                    <div>
                        <div class="row mx-0">
                            <form class="m-form col-md-12 add-files"
                                @submit.prevent="validRefunds"
                                enctype="multipart/form-data"
                                ref="form">

                                <div class="form-group" :class="{'has-danger': errors.has('fileEob')}">
                                    <div class="col-md-6 eob-fee">
                                        <strong>EOB</strong>
                                        <div class="custom-file">
                                            <input
                                                type="file"
                                                name="fileEob"
                                                class="custom-file-input"
                                                id="fileEob"
                                                accept="application/pdf"
                                                v-validate="'required|ext:pdf'"
                                                ref="fileEob"
                                                v-on:change="handleFileUploadEOB"
                                            />
                                            <label
                                                class="custom-file-label"
                                                for="fileEob"
                                            >{{(typeof fileEOB =='object' && 'name' in fileEOB)?fileEOB.name:'Choose File'}}</label>
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
                                        <form-error :attribute_name="'fileEob'" :errors_form="errors"></form-error>
                                    </div>

                                    <div class="col-md-6 bg-secondary d-flex preview-container p-0">
                                        <h1 v-if="!previewEOB" class="m-auto d-none d-md-block">Vista Previa</h1>
                                        <iframe class="rounded h-100 w-100" v-if="previewEOB" :src="previewEOB" />
                                    </div>
                                    
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('fileFee')}">
                                    <div class="col-md-6 eob-fee">
                                        <strong>Invoice FEE</strong>
                                        <div class="custom-file">
                                            <input
                                                type="file"
                                                name="fileFee"
                                                class="custom-file-input"
                                                id="fileFee"
                                                accept="application/pdf"
                                                v-validate="'required|ext:pdf'"
                                                ref="fileFee"
                                                v-on:change="handleFileUploadFee"
                                            />
                                            <label
                                                class="custom-file-label"
                                                for="fileFee"
                                            >{{(typeof fileFEE =='object' && 'name' in fileFEE)?fileFEE.name:'Choose File'}}</label>
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
                                        <form-error :attribute_name="'fileFee'" :errors_form="errors"></form-error>
                                    </div>

                                    <div class="col-md-6 bg-secondary d-flex preview-container p-0">
                                        <h1 v-if="!previewFee" class="m-auto d-none d-md-block">Vista Previa</h1>
                                        <iframe class="rounded h-100 w-100" v-if="previewFee" :src="previewFee" />
                                    </div>
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('saving_amount')}">
                                    <strong>Saving Amount US$</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            name="saving_amount"
                                            class="form-control m-input"
                                            placeholder="Saving Amount"
                                            v-validate="'required|min:2|max:40|'"
                                            v-model.lazy="inputsData.saving_amount"
                                            ref="saving_amount"
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-tag"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <form-error :attribute_name="'saving_amount'" :errors_form="errors"></form-error>
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('adjusted_amount')}">
                                    <strong>Adjusted Amount US$</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            name="adjusted_amount"
                                            class="form-control m-input"
                                            placeholder="Adjusted Amount"
                                            v-validate="'required|min:2|max:40|'"
                                            v-model.lazy="inputsData.adjusted_amount"
                                            ref="adjusted_amount"
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-tag"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <form-error :attribute_name="'adjusted_amount'" :errors_form="errors"></form-error>
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('saving')}">
                                    <strong>%Saving</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            name="saving"
                                            class="form-control m-input"
                                            placeholder="%saving"
                                            v-validate="'required|min:2|max:40|'"
                                            v-model.lazy="inputsData.saving"
                                            ref="saving"
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-tag"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <form-error :attribute_name="'saving'" :errors_form="errors"></form-error>
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('fee_amount')}">
                                    <strong>Fee Amount US$</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <input
                                            type="text"
                                            name="fee_amount"
                                            class="form-control m-input"
                                            placeholder="Fee Amount"
                                            v-validate="'required|min:2|max:40|'"
                                            v-model.lazy="inputsData.fee_amount"
                                            ref="fee_amount"
                                        />
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-tag"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <form-error :attribute_name="'fee_amount'" :errors_form="errors"></form-error>
                                </div>
                                <div class="form-group" :class="{'has-danger': errors.has('Description')}">
                                    <strong>Description</strong>
                                    <div class="m-input-icon m-input-icon--left m-input-icon--right">
                                        <textarea
                                            name="description"
                                            class="form-control m-input"
                                            :placeholder="$t('document.description')"
                                            v-validate="'required|min:2|max:255|'"
                                            v-model="inputsData.description"
                                            ref="description"
                                        ></textarea>
                                        <span class="m-input-icon__icon m-input-icon__icon--left">
                                            <span>
                                                <i class="la la-pencil-square-o"></i>
                                            </span>
                                        </span>
                                    </div>
                                    <form-error :attribute_name="'description'" :errors_form="errors"></form-error>
                                </div>
                                <button
                                    :disabled="disableForm"
                                    :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                                    type="submit"
                                    class="btn btn-primary col-md-12 mt-3"
                                >Send</button>
                            </form>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import FormError from "../FormError";
import customImg from "../Element/custom-img";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import localeChanger from "../locales/locale-changer.vue";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";
import AssistAccordionDetaill from "../Assists/AssistAccordionDetaill.vue";
export default {
    props: ["re-pricing"],
    components: {
        FormError,
        customImg,
        selectFromTable,
        dateSingleBt,
        localeChanger,
        AssistAccordionDetaill
    },
    data() {
        return {
            rePricingBase: this.rePricing,
            rePricingDetaill: {},
            tabShow: "General",
            inputsData: {
                description: "",
                saving_amount: "",
                adjusted_amount: "",
                saving: "",
                fee_amount: ""
            },
            uploadPercentage: 0,
            disableForm: false,
            fileEOB: '',
            fileFEE: '',
            previewSrc: null,
            displayAlert: false
        };
    },
    mounted() {
        this.getAssistanceDetail();
    },
    methods: {
        showTab(tab) {
            this.tabShow = tab;
        },
        getAssistanceDetail: function() {
            this.showLoader = true;
            this.axios
                .post("getRepricingDetaill", {
                    idRePricing: this.rePricingBase.id
                })
                .then(response => {
                    this.showLoader = false;
                    this.rePricingDetaill = response.data.RESPONSE;
                });
        },
        validRefunds: function() {
            if (!this.disableForm) {
                
                this.$validator.validateAll().then(result => {
                    window.console.log("validateAll", result);
                    const formData = new FormData();
                    formData.append("fileEob", this.fileEOB);
                    formData.append("fileFee", this.fileFEE);
                    formData.append("saving_amount", this.inputsData.saving_amount);
                    formData.append("adjusted_amount", this.inputsData.adjusted_amount);
                    formData.append("saving", this.inputsData.saving);
                    formData.append("fee_amount", this.inputsData.fee_amount);
                    formData.append("description", this.inputsData.description);
                    formData.append("userID", this.$session.get("idUser"));
                    formData.append("user", this.$session.get("user"));
                    formData.append("repricingId", this.rePricingBase.id);

                    if (result) {
                        this.disableForm = true;
                        this.axios
                            .post("addFilesRepricing", formData, {
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
                                window.console.log("addFilesRepricing", response);
                                this.disableForm = false;
                                if (response.data.STATUS == "OK") {
                                    this.inputsData.description = "";
                                    this.inputsData.saving_amount = "";
                                    this.inputsData.adjusted_amount = "";
                                    this.inputsData.saving = "";
                                    this.inputsData.fee_amount = "";
                                    this.fileEOB = '';
                                    this.fileFEE = '';
                                    this.$refs.fileEOB.value = null;
                                    this.$refs.fileFEE.value = null;
                                    this.$emit("addFilesRepricing", response.data.RESPONSE);
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
        handleFileUploadEOB: function(event) {
            this.fileEOB = event.target.files[0];
        },
        handleFileUploadFee: function(event) {
            this.fileFEE = event.target.files[0];
        }
    },
    computed: {
        previewEOB: function() {
            if (!this.fileEOB || this.errors.has("fileEob")) {
                return false;
            }
            return URL.createObjectURL(this.fileEOB);
        },
        previewFee: function() {
            if (!this.fileFEE || this.errors.has("fileFee")) {
                return false;
            }
            return URL.createObjectURL(this.fileFEE);
        },
    }
};
</script>