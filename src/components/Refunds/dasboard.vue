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
                                                data-code-js="false"
                                            >
                                                <div
                                                    class="m-demo__preview"
                                                    style="padding: 5px;text-align: center; background: #36a3f7;"
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
                                        <div class="m-invoice__items" style="padding:2rem 0 3rem;" v-if="results.processRefund=='Y'">
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
                                                                        >{{ $t('reimbursement.information') }}</h3>
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
                                                                    v-if="inputsData.docType=='26'"
                                                                >
                                                                    <div
                                                                        class="form-group m-form__group"
                                                                    >
                                                                        <strong>{{ $t('reimbursement.date.document') }}</strong>
                                                                        <date-single-bt
                                                                            class="m-input"
                                                                            name="date"
                                                                            watermark="Date"
                                                                            v-on:input="setDataFilter"
                                                                            :value="inputsData.date"
                                                                        ></date-single-bt>
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
                                                            class="col-md-6 rounded bg-dark preview-container p-0"
                                                        >
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
                                        <div v-else>
                                            <div class="m-portlet m-portlet--tab text-center" style="padding:3rem;">
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
                docType: 0
            },
            documentsType: [],
            file: false,
            captcha: "",
            previewSrc: null,
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
                let self = this;
                this.documentsType = response.data.RESPONSE.RESULTS.reduce(function (m, e) {
                    
                    if (e['uploaded']) {
                        e['icon'] = 'fa fa-check text-success';
                    } else {
                        if (parseInt(self.inputsData.docType || 0) == 0) {
                            self.inputsData.docType = e.id;
                        }
                    }
                    m.push(e);
                    return m;
                }, []);
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
                this.previewSrc = false;
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
                this.previewSrc = false;
            }
            return type;
        }
    }
};
</script>