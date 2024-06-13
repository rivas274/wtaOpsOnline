<template>
    <form @submit.prevent="saveDataMethodPayment" class="m-form">
        <div v-if = "configData.thirdPartyAuthorization == 'P'">
            <div class="m-portlet__body pb-3">
                <h2 v-if = "configData.thirdPartyAuthorization == 'P'" >
                    {{ $t('refunds.beneficiaryOrThirdParty') }}
                </h2>
                <div class="row">
                    <div class="col-md-6 d-flex align-items-start py-3">
                        <button  class="btn-block btn btn-type-document btn-lg text-wrap text-left align-self-stretch"
                                @click.prevent="setThirdPartyAuthorization('N')"
                                type="button">
                            <h3>
                                {{ $t('refunds.iAmBeneficiary') }}
                            </h3>
                        </button>
                    </div>
                    <div class="col-md-6 d-flex align-items-start py-3">
                        <button  class="btn-block btn btn-type-document btn-lg text-wrap text-left align-self-stretch"
                                @click.prevent="setThirdPartyAuthorization('Y')"
                                type="button">
                            <h3>
                                {{ $t('refunds.authorizeThirdParty') }}
                            </h3>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="m-portlet__head">
                <div class="m-portlet__head-caption">
                    <div class="m-portlet__head-title">
                        <h3 class="m-portlet__head-text">
                            {{ $t('reimbursement.methodPayment') }} | {{ configData.title }}
                        </h3>
                    </div>
                </div>
            </div>
            <div class="m-portlet__body pb-3">
                <div v-if = "configData.thirdPartyAuthorization == 'P'" >
                    {{ $t('refunds.beneficiaryOrThirdParty') }}
                </div>
                <div class="m-section" :key="keygroup" v-else-if="'group' in configData" v-for="(groupConfig, keygroup) in groupFields">
                    <h3 class="m-section__heading">
                        {{ groupConfig.title }}
                    </h3>
                    <div class="m-section__content">
                        <div class="row">
                            <div class="col-md-6" :key="keyField"  v-for="(fieldConfig, keyField) in groupConfig.fields">
                                <div v-if="fieldConfig.type == 'select'" >
                                    <div class="form-group m-form__group mb-3" :class="{'has-danger': errors.has('custom-fields.'+keyField) || errors.has('custom-fields.'+keyField+'_custom')}">
                                        <strong>{{ fieldConfig.title }}</strong>
                                        <div :class="{'input-group':saveData[keyField] == fieldConfig.show_custom_field}">
                                            <select-from :name="keyField" 
                                                    v-validate="fieldConfig.vee"
                                                    :data-vv-as="fieldConfig.title"
                                                    data-vv-scope="custom-fields"
                                                    :options="fieldConfig.options"
                                                    :selected="saveData[keyField]"
                                                    v-on:input="setData"></select-from>
                                            <input  type="text" 
                                                    class="form-control m-input" 
                                                    v-if="saveData[keyField] == fieldConfig.show_custom_field"
                                                    :data-vv-as="fieldConfig.title"
                                                    data-vv-scope="custom-fields"
                                                    v-validate="'required'" 
                                                    v-model.lazy="saveData[keyField+'_custom']" 
                                                    :name="keyField+'_custom'" />
                                        </div>
                                        <form-error :attribute_name="'custom-fields.'+keyField" :errors_form="errors"></form-error>
                                        <form-error :attribute_name="'custom-fields.'+keyField+'_custom'" :errors_form="errors"></form-error>
                                    </div>
                                </div>
                                <div v-else-if="fieldConfig.type == 'phone'">
                                    <div class="form-group m-form__group mb-3" :class="{'has-danger': errors.has('custom-fields.'+'cod_'+keyField) || errors.has('custom-fields.'+keyField)}">
                                        <strong>{{ fieldConfig.title }}</strong>
                                        <div class="input-group">
                                            <select-from :name="'cod_'+keyField" 
                                                    v-validate="'required'" 
                                                    :data-vv-as="fieldConfig.title"
                                                    data-vv-scope="custom-fields"
                                                    :options="fieldConfig.options" 
                                                    :selected="saveData['cod_'+keyField]" 
                                                    v-on:input="setData"></select-from>
                                            <input  type="text" 
                                                    class="form-control m-input"
                                                    :data-vv-as="fieldConfig.title"
                                                    data-vv-scope="custom-fields"
                                                    v-validate="fieldConfig.vee"
                                                    v-model.lazy="saveData[keyField]" 
                                                    :name="keyField" />
                                        </div>
                                        <form-error :attribute_name="'custom-fields.cod_'+keyField" :errors_form="errors"></form-error>
                                        <form-error :attribute_name="'custom-fields.'+keyField" :errors_form="errors"></form-error>
                                    </div>
                                </div>
                                <div v-else-if="fieldConfig.type == 'date'">
                                    <div class="form-group m-form__group mb-3" :class="{ 'has-danger': errors.has('custom-fields.'+keyField) }">
                                        <strong>{{ fieldConfig.title }}</strong>
                                        <input  type="date"
                                                class="form-control m-input" 
                                                v-validate="fieldConfig.vee"
                                                :data-vv-as="fieldConfig.title" 
                                                data-vv-scope="custom-fields"
                                                v-model.lazy="saveData[keyField]" 
                                                :name="keyField" />
                                        <form-error :attribute_name="'custom-fields.'+keyField" :errors_form="errors"></form-error>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="form-group m-form__group mb-3" :class="{ 'has-danger': errors.has('custom-fields.'+keyField) }">
                                        <strong>{{ fieldConfig.title }}</strong>
                                        <input  type="text" 
                                                class="form-control m-input"
                                                v-validate="fieldConfig.vee"
                                                :data-vv-as="fieldConfig.title"
                                                data-vv-scope="custom-fields"
                                                v-model.lazy="saveData[keyField]"
                                                :name="keyField" />
                                        <form-error :attribute_name="'custom-fields.'+keyField" :errors_form="errors"></form-error>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-section" v-if="configData.thirdPartyAuthorization == 'Y'">
                    <h3 class="m-section__heading">
                        {{ $t('refunds.thirdPartyAuthorization') }}
                    </h3>
                    <div class="m-section__content">
                        <div class="row">
                            <div class="col-md-6">
                                <button class="btn btn-block btn-lg text-wrap align-self-stretch"
                                        @click.prevent="generatePdfAuthorization">
                                    {{ $t('refunds.downloadSignUpload')}}
                                </button>
                            </div>
                            <div class="col-md-6" v-if="showFileAuthorization">
                                <div
                                    class="form-group m-form__group"
                                    :class="{'has-danger': errors.has('file')}">
                                    <strong>{{ $t('refunds.uploadSignAuthorization') }}</strong>
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
                                            for="authorizationFile"
                                        >
                                            <span v-if="authorizationFile">
                                                {{ authorizationFile.name }}
                                            </span>
                                            <span v-else>
                                                {{$t('document.choose')}}
                                            </span>
                                        </label>
                                    </div>
                                    <form-error
                                        :attribute_name="'file'"
                                        :errors_form="errors"
                                    ></form-error>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="progress"
                    v-if="uploadPercentage>0">
                    <div
                        class="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        :aria-valuenow="uploadPercentage"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        :style="{width: uploadPercentage+'%'}"
                    ></div>
                </div>
                <transition
                    :duration="1500"
                    name="fade"
                    mode="in-out"
                >
                    <div
                        v-show="disableForm?false:(captcha.length==0)"
                        class="form-group m-form__group pt-0"
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
                    <button :disabled="disableForm"
                        :class="{ 'm-login__btn--primary m-loader m-loader--right m-loader--light': disableForm }" type="submit"
                        class="btn btn-lg btn-primary">{{ $t('general.save') }}</button>
                </div>
            </div>
        </div>
    </form>
</template>
<script>
import FormError from "../FormError";
import selectFrom from "../Tables/filters/selectFromTable.vue";
import VueRecaptcha from "vue-recaptcha";

export default {
    components: {
        FormError,
        selectFrom,
        VueRecaptcha
    },
    props: ['idAssist', 'status'],
    data() {
        return {
            siteKey: this.$env.VUE_APP_RE_CAPCHA_PUBLIC,
            configData: {},
            saveData: {},
            captcha: "",
            disableForm: false,
            uploadPercentage: 0,
            authorization: "",
            authorizationFile: null,
        };
    },
    mounted() {
        this.getContents();
    },
    methods: {
        setData: function (item, value) {
            this.saveData[item] = value;
        },
        onCaptchaVerified: function(recaptchaToken) {
            this.captcha = recaptchaToken;
        },
        onCaptchaExpired: function() {
            this.captcha = "";
            this.$refs.recaptcha.reset();
        },
        getContents: function () {
            this.axios.get("getPaymentFieldsRefundByAssist", {
                params: {
                    idAssist: this.idAssist,
                    timestamp: (new Date()).getTime(),//enviamos un parámetro dinámico para deshabilitar la cache de axios
                }
            }).then(response => {
                this.configData = response.data.RESPONSE;
                this.setFields(this.configData.fields);
            });
        },
        setThirdPartyAuthorization: function (value) {
            this.configData.thirdPartyAuthorization = value;
            this.authorization = value;
        },
        handleFileUpload: function (event) {
            this.authorizationFile = event.target.files[0];
        },
        setFields(arrData) {
            for (let key in arrData) {
                if (!('value' in arrData[key])) {
                    continue;
                }
                this.saveData[key] = arrData[key].value;
                if (arrData[key].type == 'phone' && 'value' in arrData[key]) {
                    this.saveData['cod_' + key] = arrData[key].value['cod_phone'];
                    this.saveData[key] = arrData[key].value['phone'];
                }else if ('show_custom_field' in arrData[key]) {
                    if (!(arrData[key].value in arrData[key].options)) {
                        this.saveData[key + '_custom'] = arrData[key].value;
                        this.saveData[key] = arrData[key].show_custom_field;
                    }
                }
            }
        },
        generatePdfAuthorization: function () {
            this.callApi('pdfAuthorizationRefund', 'custom-fields');
        },
        saveDataMethodPayment:function () {
            this.callApi('setPaymentFieldsRefundByAssist');
        },
        callApi: function (endPoint, validateScope) {
            if (!this.disableForm) {
                this.$validator.validateAll(validateScope).then(result => {
                    if (!result) {
                        return;
                    }
                    this.disableForm = true;

                    const formData = new FormData();
                    formData.append("idAssist", this.idAssist);
                    formData.append("g-recaptcha", this.captcha);

                    for (var prop in this.saveData) {
                        formData.append(prop, this.saveData[prop]);
                    }

                    if (this.showFileAuthorization) {
                        formData.append("authorization", this.authorization);
                        if (this.authorizationFile) {
                            formData.append("authorizationFile", this.authorizationFile);
                        }
                    }

                    this.axios
                        .post(endPoint,
                            formData,
                            {
                                responseType: "blob",
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
                            this.uploadPercentage = 0;
                            this.disableForm = false;
                            if (response.headers['content-type'] == 'application/pdf') {
                                const tempDownload = document.createElement("a");
                                tempDownload.href = window.URL.createObjectURL(
                                    new Blob([response.data])
                                );
                                tempDownload.setAttribute(
                                    "download", "authorization.pdf"
                                );
                                document.body.appendChild(tempDownload);
                                tempDownload.click();
                                return;
                            }
                            response.data.text().then(text => {
                                const jsonResponse = JSON.parse(text);

                                if ('STATUS' in jsonResponse && jsonResponse.STATUS == "OK") {
                                    window.Swal.fire({
                                        title: this.$t("general.sent"),
                                        text: this.$t("general.informationSentCorrectly"),
                                        type: "success",
                                        confirmButtonText: this.$t("general.ok"),
                                    }).then(() => {
                                        this.$emit("update:status", "L");
                                    });
                                } 

                                if ('ERRORS' in jsonResponse && jsonResponse.ERRORS) {
                                    for (let prop in jsonResponse.ERRORS) {
                                        this.errors.add({
                                            field: prop,
                                            msg: jsonResponse.ERRORS[prop]
                                        });
                                    }
                                }
                            });

                        });
                },
                errors => {
                    this.disableForm = true;
                });
            }
        }
    },
    computed: {
        showFileAuthorization() {
            return this.configData.thirdPartyAuthorization == 'Y';
        },
        groupFields() {
            let groupFields = {};
            for (let key in this.configData.fields) {
                let group = this.configData.fields[key].group || "default";
                if (!groupFields[group]) {
                    let titleGroup = this.configData.group[group] ? this.configData.group[group].title : group;

                    groupFields[group] = {
                        title: titleGroup,
                        fields: {}
                    };
                }
                groupFields[group].fields[key] = this.configData.fields[key];
            }
            return groupFields;
        }
    }
};
</script>

<style>
.bootstrap-select.form-control:not([class*=col-]) {
    min-width: 80px !important;
}
.m-section{
    border: 4px solid #f7f7fa;
    padding: 15px;
    margin-left: -15px;
    margin-right: -15px;
    margin-top: -15px;
    margin-bottom: 0px;
}
.m-section:not(:last-child){
    margin-bottom: 30px;
}
</style>