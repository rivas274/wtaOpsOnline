<template>
    <div class="m-content">
        <div class="m-grid__item m-grid__item--fluid">
            <div class="row mx-0">
                <div class="col-xl-10 mx-auto">
                    <div class="m-portlet__body">
                        <div class="m-invoice-2">
                            <div class="m-invoice__wrapper">
                                <div class="m-invoice__head">
                                    <div
                                        class="m-invoice__container m-invoice__container--centered p-0"
                                    >
                                        <div
                                            class="m-invoice__logo"
                                            style="padding-top: 0px; margin-top:40px;"
                                        >
                                            <a>
                                                <h1>{{ $t('reimbursement.reimbursement') }}</h1>
                                            </a>
                                            <a class="m--hidden-mobile" >
                                                <custom-img
                                                    v-if="results.logo"
                                                    height="65"
                                                    :src="results.logo"
                                                ></custom-img>
                                            </a>
                                        </div>
                                        <div
                                            class="m-demo__preview"
                                            style="padding: 20px 0px 0px 0px;"
                                        >
                                            <div
                                                class="m-demo"
                                                data-code-preview="true"
                                                data-code-html="true"
                                                data-code-js="false"
                                            >
                                                <div
                                                    class="m-demo__preview bg-preview"
                                                >
                                                    <locale-changer class="pull-right"></locale-changer>
                                                    <ul class="m-nav m-nav--inline">
                                                        <li class="m-nav__item">
                                                            <a
                                                                class="m-nav__link"
                                                                v-tooltip:top="$t('general.client')"
                                                            >
                                                                <i
                                                                    class="m-nav__link-icon flaticon-suitcase"
                                                                ></i>
                                                                <span
                                                                    class="m-nav__link-text"
                                                                >{{results.clientName}}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a
                                                                class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.code')"
                                                            >
                                                                <i
                                                                    class="m-nav__link-icon flaticon-shapes"
                                                                ></i>
                                                                <span
                                                                    class="m-nav__link-text"
                                                                >{{results.codeAssist}}</span>
                                                            </a>
                                                        </li>
                                                        <li
                                                            class="m-nav__item"
                                                            v-if="results.codeAssist!=results.codigo"
                                                        >
                                                            <a
                                                                class="m-nav__link"
                                                                v-tooltip:top="$t('voucher.voucher')"
                                                            >
                                                                <i
                                                                    class="m-nav__link-icon flaticon-interface-5"
                                                                ></i>
                                                                <span
                                                                    class="m-nav__link-text"
                                                                >{{results.codigo}}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a
                                                                class="m-nav__link"
                                                                v-tooltip:top="$t('voucher.name')"
                                                            >
                                                                <i
                                                                    class="m-nav__link-icon flaticon-avatar"
                                                                ></i>
                                                                <span
                                                                    class="m-nav__link-text"
                                                                >{{results.fisrtName+' '+results.lastName}}</span>
                                                            </a>
                                                        </li>
                                                        <li
                                                            class="m-nav__item"
                                                            v-if="results.registeredDate"
                                                        >
                                                            <a
                                                                class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.date.case')"
                                                            >
                                                                <i
                                                                    class="m-nav__link-icon flaticon-calendar-1"
                                                                ></i>
                                                                <span
                                                                    class="m-nav__link-text"
                                                                >{{results.registeredDate.date}}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a
                                                                class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.date.birth')"
                                                            >
                                                                <i
                                                                    class="m-nav__link-icon flaticon-lifebuoy"
                                                                ></i>
                                                                <span
                                                                    class="m-nav__link-text"
                                                                >{{results.birthDate}}</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="m-invoice__items" v-if="results.processRefund=='Y'">
                                            <div class="m-portlet m-portlet--tab">
                                                <div>
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
                                                            </div>
                                                            <div class="m-portlet__body">
                                                                <div
                                                                    class="form-group m-form__group"
                                                                >
                                                                    <strong>{{ $t('assistance.type') }}</strong>
                                                                    <input-from-table
                                                                        class="m-form__group-sub"
                                                                        icon="flaticon-lifebuoy"
                                                                        :value="results.descCaseType"
                                                                        :readonly="true"
                                                                    ></input-from-table>
                                                                </div>
                                                                <div
                                                                    class="form-group m-form__group"
                                                                >
                                                                    <strong>{{ $t('assistance.typeAssistance') }}</strong>
                                                                    <input-from-table
                                                                        class="m-form__group-sub"
                                                                        icon="flaticon-lifebuoy"
                                                                        :value="results.descAssistanceType"
                                                                        :readonly="true"
                                                                    ></input-from-table>
                                                                </div>
                                                                <div
                                                                    class="ffilorm-group m-form__group"
                                                                    :class="{'has-danger': errors.has('docType')}"
                                                                >
                                                                    <strong>{{ $t('document.type') }}</strong>
                                                                    <select-group
                                                                        name="docType"
                                                                        v-validate="'required|min:1|max:10'"
                                                                        :data-vv-as="$t('document.type')"
                                                                        :groups="documentsTypeGroup"
                                                                        :selected="inputsData.docType"
                                                                        v-on:input="setDataFilter"
                                                                    ></select-group>
                                                                    <form-error
                                                                        :attribute_name="'docType'"
                                                                        :errors_form="errors"
                                                                    ></form-error>
                                                                </div>
                                                                <div class="form-group m-form__group" v-if="extraInfo">
                                                                    <div class="m-alert m-alert--icon m-alert--icon-solid m-alert--outline alert alert-brand alert-dismissible fade show" role="alert">
                                                                        <div class="m-alert__icon">
                                                                            <i class="flaticon-exclamation-1"></i>
                                                                        </div>
                                                                        <div class="m-alert__text">
                                                                            <strong>{{ $t('general.important') }}</strong>
                                                                            {{ extraInfo.description }}
                                                                        </div>
                                                                        <div class="m-alert__actions text-info">
                                                                            <a :href="extraInfo.file" download target="_blank">
                                                                                <i class="fa fa-3x fa-cloud-download-alt"></i>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    v-if="inputsData.docType=='26'"
                                                                >
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
                                        </div>
                                        <div v-else>
                                            <div class="m-portlet m-portlet--tab text-center portlet-no-client">
                                                <h1>
                                                    {{$t('reimbursement.clientNotProcessRefunds')}}
                                                </h1>
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
import customImg from "../Element/custom-img";
import selectFrom from "../Tables/filters/selectFromTable.vue";
import selectGroup from "../Tables/filters/selectGroupFromTable.vue";
import inputFromTable from "../Tables/filters/inputFromTable.vue";
import currency from "../Labels/currency.json";
import localeChanger from "../locales/locale-changer.vue";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";
import VueRecaptcha from "vue-recaptcha";
export default {
    components: {
        FormError,
        customImg,
        selectFrom,
        selectGroup,
        inputFromTable,
        dateSingleBt,
        VueRecaptcha,
        localeChanger
    },
    data() {
        return {
            siteKey: this.$env.VUE_APP_RE_CAPCHA_PUBLIC,
            code: this.$route.params.code,
            results: {},
            uploadPercentage: 0,
            disableForm: false,
            inputsData: {
                reference: "",
                currency: "USD",
                amount: "",
                description: "",
                date: "",
                nameBen: "",
                docType: null
            },
            documentsType: [],
            file: false,
            captcha: "",
            previewSrc: null,
            typeFile: false,
            displayAlert: false
        };
    },
    mounted() {
        this.getAssistance();
    },
    methods: {
        getDocumentsType: function () {
            this.documentsType = [];
            this.axios.get("getDocumentsTypeRefound", {
                params: {
                    idAssist: this.results['idAssist'],
                    timestamp:(new Date()).getTime(),//enviamos un parámetro dinámico para deshabilitar la cache de axios
                }
            }).then(response => {
                this.documentsType = response.data.RESPONSE.RESULTS;
            });
        },
        getAssistance: function() {
            this.axios
                .get("getAssistancePublic", {
                    params: {
                        codeAssist: this.code
                    }
                })
                .then(response => {
                    if (response.data.RESPONSE.RESULTS === null) {
                        this.$router.push({ name: "login" });
                    }
                    this.results = response.data.RESPONSE.RESULTS[0];
                    this.inputsData.date = this.results.registeredDate.date;
                    this.inputsData.nameBen =
                        this.results.fisrtName + " " + this.results.lastName;

                    this.getDocumentsType();
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
                    formData.append("idAssist", this.results.idAssist);
                    formData.append("g-recaptcha", this.captcha);
                    formData.append("reference", this.inputsData.reference);
                    formData.append("description", this.inputsData.description);
                    formData.append("currency", this.inputsData.currency);
                    formData.append("date", this.inputsData.date);
                    formData.append("amount", this.inputsData.amount);
                    formData.append("nameBen", this.inputsData.nameBen);
                    formData.append("docType", this.inputsData.docType);
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
                                    /* this.$refs.recaptcha.reset(); */
                                    window.Swal.fire({
                                        title: this.$t("document.send"),
                                        text: this.$t("document.uploaded"),
                                        type: "success",
                                        showCancelButton: true,
                                        confirmButtonText: this.$t("document.uploadAnother"),
                                        cancelButtonText: this.$t("general.no")
                                    }).then(result => {
                                        if (result.value) {
                                            this.inputsData.reference = "";
                                            this.inputsData.amount = "";
                                            this.inputsData.description = "";
                                            //this.captcha = '';
                                            this.file = false;
                                            this.previewSrc = false;
                                            this.typeFile = false;
                                            this.$refs.file.value = null;
                                            this.inputsData.docType = null;
                                            this.getDocumentsType();
                                        } else if (
                                            result.dismiss ===
                                            window.Swal.DismissReason.cancel
                                        ) {
                                            window.close();
                                            window.Swal.fire({
                                                title: this.$t("windows.close"),
                                                text: this.$t("windows.pleaseClose"),
                                                confirmButtonText: this.$t("general.ok"),
                                                type: "error"
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
        setDataFilter: function(campo, value) {
            this.inputsData[campo] = value;
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
                return v.id == this.inputsData.docType;
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
        documentsTypeGroup: function () {
            let self = this,
            arrReturn = [],
            group = this.documentsType.reduce(function (m, e) {
                let provideOrDownload = 'insurance' in e ? 'download' : 'provide';
                if (e['uploaded']) {
                    e['icon'] = 'fa fa-check text-success';
                } else {
                    if ((parseInt(self.inputsData.docType) || 0) == 0) {
                        self.inputsData.docType = e.id;
                    }
                }
                if (!(provideOrDownload in m)) {
                    m[provideOrDownload] = {
                        name: self.$t("refunds." + (provideOrDownload == 'download' ? 'documentToDownload' : 'documentToProvide')),
                        options: []
                    };
                }
                m[provideOrDownload].options.push(e);
                return m;
            }, {});

           /*  if ((parseInt(self.inputsData.docType) || 0) == 0) {
                self.inputsData.docType = this.documentsType[0].id;
            } */
            if('provide' in group) {
                arrReturn.push(group.provide);
            }
            if('download' in group) {
                arrReturn.push(group.download);
            }
            return arrReturn;
        }
    }
};
</script>
<style scoped>
.dropdown-header {
    font-size: .999rem;
}
.m-invoice__items{
    padding:2rem 0 3rem;
}
.portlet-no-client{
    padding:3rem;
}
.bg-preview{
    padding: 5px;
    text-align: center; 
    background: #36a3f7;
}
</style>