<style scoped>
textarea {
    min-height: 75px;
    resize: none;
}
textarea.v-center {
    padding: 30px 0 0 0;
}

.preview-container img,
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
.m-nav .m-nav__item > .m-nav__link .m-nav__link-text {
    color: #f8f9fc;
    font-weight: 700;
}
.m-nav .m-nav__item > .m-nav__link .m-nav__link-icon {
    color: #f8f9fc;
}
@media (min-width: 430px) {
    .m-nav.m-nav--inline {
        display: inline !important;
    }
}
@media (max-width: 427px) {
    .m-nav.m-nav--inline > .m-nav__item {
        width: 50% !important;
        padding: 0 0 0 12px !important;
    }
    .m-form__group {
        padding-left: 5px !important;
        padding-right: 5px !important;
    }
}
</style>
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
                                                <h1>{{ $t('general.upload_assistance_bills') }}</h1>
                                            </a>
                                            <a class="m--hidden-mobile">
                                                <custom-img
                                                    height="65"
                                                    :src="baseUrlApi()+'app/admin/pictures/thumbnail/1logo_empresa201712080920245063.png'"
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
                                                data-code-js="false" >
                                                <div
                                                    class="m-demo__preview"
                                                    style="padding: 5px;text-align: center; background: #36a3f7;"
                                                >
                                                    <locale-changer class-prop="pull-right"></locale-changer>
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
                                                                v-tooltip:top="$t('general.voucher')"
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
                                        <div class="m-invoice__items" style="padding:2rem 0 3rem;">
                                            <div class="m-portlet m-portlet--tab">
                                                <div>
                                                    <div class="row mx-0">
                                                        <form
                                                            class="m-form m-form--fit m-form--label-align-right"
                                                            :class="[preview?'col-md-6':'col-md-12 mx-auto']"
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
                                                                        >{{ $t('AssistanceBills.information') }}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="m-portlet__body">
                                                                <div
                                                                    class="form-group m-form__group"
                                                                >
                                                                    <strong>{{ $t('document.type') }}</strong>
                                                                    <select-from-table
                                                                        name="docType"
                                                                        :options="documentsType"
                                                                        :selected="inputsData.docType"
                                                                        v-on:input="setDataFilter"
                                                                    ></select-from-table>
                                                                </div>
                                                                    <div
                                                                        class="form-group m-form__group" >
                                                                        <strong>{{ $t('AssistanceBills.date.document') }}</strong>
                                                                        <date-single-bt
                                                                            class-prop="m-input"
                                                                            name="date"
                                                                            watermark="Date"
                                                                            v-on:input="setDataFilter"
                                                                            :value="inputsData.date"
                                                                        ></date-single-bt>
                                                                    </div>
                                                                    <div
                                                                        class="form-group m-form__group"
                                                                        :class="{'has-danger': errors.has('amount')}" >
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
                                                                        <select-from-table
                                                                            name="currency"
                                                                            :options="currencyFromSelect"
                                                                            :selected="inputsData.currency"
                                                                            v-on:input="setDataFilter"
                                                                        ></select-from-table>
                                                                    </div>
                                                                    <div
                                                                        class="form-group m-form__group"
                                                                        :class="{'has-danger': errors.has('provider')}"
                                                                    >
                                                                        <strong>{{ $t('AssistanceBills.providerName') }}</strong>
                                                                        <div
                                                                            class="m-input-icon m-input-icon--left m-input-icon--right"
                                                                        >
                                                                            <input
                                                                                type="text"
                                                                                name="provider"
                                                                                class="form-control m-input"
                                                                                :placeholder="$t('AssistanceBills.providerName')"
                                                                                v-validate="'required|min:2|max:250|'"
                                                                                v-model.lazy="inputsData.provider"
                                                                                ref="provider"
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
                                                                            :attribute_name="'provider'"
                                                                            :errors_form="errors"
                                                                        ></form-error>
                                                                    </div>
                                                                    <div
                                                                        class="form-group m-form__group"
                                                                        :class="{'has-danger': errors.has('reference')}"
                                                                    >
                                                                        <strong>{{ $t('AssistanceBills.reference') }}</strong>
                                                                        <div
                                                                            class="m-input-icon m-input-icon--left m-input-icon--right"
                                                                        >
                                                                            <input
                                                                                type="text"
                                                                                name="reference"
                                                                                class="form-control m-input"
                                                                                :placeholder="$t('AssistanceBills.reference')"
                                                                                v-validate="'required|min:2|max:40|'"
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
                                                                            ref="file"
                                                                            v-on:change="handleFileUpload"
                                                                        />
                                                                        <label
                                                                            class="custom-file-label"
                                                                            for="file"
                                                                        >{{(typeof file =='object' &&'name' in file)?file.name:'Choose File'}}</label>
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
                                                                        :class="{'has-danger': errors.has('recaptcha')}" >
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
                                                                class="m-portlet__foot m-portlet__foot--fit"
                                                                style="text-align: center;"
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
                                                            :class="preview?'d-flex':'d-none'"
                                                            class="col-md-6 rounded bg-dark preview-container p-0" >
                                                            <iframe
                                                                v-if="preview=='pdf'"
                                                                class="rounded h-100 w-100"
                                                                :src="previewSrc"
                                                            ></iframe>
                                                            <img
                                                                v-if="preview=='image'"
                                                                class="m-2 my-auto rounded w-100 h-auto"
                                                                :src="previewSrc"
                                                            />
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
    </div>
</template>
<script>
import FormError from "../FormError";
import customImg from "../Element/custom-img";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import currency from "../Labels/currency.json";
import localeChanger from "../locales/locale-changer.vue";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";
import VueRecaptcha from "vue-recaptcha";
export default {
    components: {
        FormError,
        customImg,
        selectFromTable,
        dateSingleBt,
        VueRecaptcha,
        localeChanger
    },
    data() {
        return {
            siteKey: process.env.VUE_APP_RE_CAPCHA_PUBLIC,
            code: this.$route.params.code,
            providerId: this.$route.params.providerId,
            results: {},
            uploadPercentage: 0,
            disableForm: false,
            inputsData: {
                reference: "",
                currency: "USD",
                amount: "",
                description: "",
                date: "",
                provider: "",
                docType: 26,
                nameBen: ''
            },
            documentsType: [],
            file: false,
            captcha: "",
            previewSrc: null,
            displayAlert: false,
            assistanceID: ""
        };
    },
    mounted() {
        this.getDocumentsType();
        this.getAssistance();
        this.providerName();
    },
    methods: {
        getDocumentsType: function() {
            this.axios.get("getDocumentsType?docType[]=4&docType[]=5&docType[]=8").then(response => {
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
                    this.assistanceID = this.results.idAssist;
                });
        },
        providerName: function(){
            this.axios.get("provider", {
                params: {
                    id: this.providerId
                }
            })
            .then(response => {
               this.results = response.data.RESPONSE.RESULTS[0];
               this.inputsData.provider = this.results.name_provider;
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
                    formData.append("idAssist", this.assistanceID);
                    formData.append("g-recaptcha", this.captcha);
                    formData.append("reference", this.inputsData.reference);
                    formData.append("description", this.inputsData.description);
                    formData.append("currency", this.inputsData.currency);
                    formData.append("date", this.inputsData.date);
                    formData.append("amount", this.inputsData.amount);
                    formData.append("docType", this.inputsData.docType);
                    formData.append("providerId", this.providerId);
                    formData.append("provider", this.inputsData.provider);

                    if (result) {
                        this.disableForm = true;
                        this.axios
                            .post("addAssistanceBills", formData, {
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
                                    //this.$refs.recaptcha.reset();
                                    window.Swal.fire({
                                        title: this.$t("document.send"),
                                        text: this.$t("document.uploaded"),
                                        type: "success",
                                        showCancelButton: true,
                                        confirmButtonText: this.$t(
                                            "document.uploadAnother"
                                        ),
                                        cancelButtonText: this.$t("general.no")
                                    }).then(result => {
                                        if (result.value) {
                                            this.inputsData.reference = "";
                                            this.inputsData.amount = "";
                                            this.inputsData.description = "";
                                            //this.captcha = '';
                                            this.file = false;
                                            this.$refs.file.value = null;
                                        } else if (
                                            result.dismiss ===
                                            window.Swal.DismissReason.cancel
                                        ) {
                                            window.close();
                                            window.Swal.fire(
                                                this.$t("windows.close"),
                                                this.$t("windows.pleaseClose"),
                                                "error"
                                            );
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
                this.previewSrc = null;
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
            }else{
                this.previewSrc = null;
            }
            return type;
        }
    }
};
</script>