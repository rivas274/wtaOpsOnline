<template>
    <form @submit.prevent="saveDataMethodPayment" class="m-form">
        <div>
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
                <div :key="keyField" v-for="(fieldConfig, keyField) in configData.fields">
                    <div v-if="fieldConfig.type == 'select'">
                        <div class="form-group m-form__group mb-3" :class="{'has-danger': errors.has(keyField) || errors.has(keyField+'_custom')}">
                            <strong>{{ fieldConfig.title }}</strong>
                            <div :class="{'input-group':saveData[keyField] == fieldConfig.show_custom_field}">
                                <select-from :name="keyField" 
                                        v-validate="fieldConfig.vee" 
                                        :data-vv-as="fieldConfig.title"
                                        :options="fieldConfig.options" 
                                        :selected="saveData[keyField]" 
                                        v-on:input="setData"></select-from>
                                <input  type="text" 
                                        class="form-control m-input" 
                                        v-if="saveData[keyField] == fieldConfig.show_custom_field"
                                        :data-vv-as="fieldConfig.title"
                                        v-validate="'required'" 
                                        v-model.lazy="saveData[keyField+'_custom']" 
                                        :name="keyField+'_custom'" />
                            </div>
                            <form-error :attribute_name="keyField" :errors_form="errors"></form-error>
                            <form-error :attribute_name="keyField+'_custom'" :errors_form="errors"></form-error>
                        </div>
                    </div>
                    <div v-else-if="fieldConfig.type == 'phone'">
                        <div class="form-group m-form__group mb-3" :class="{'has-danger': errors.has('cod_'+keyField) || errors.has(keyField)}">
                            <strong>{{ fieldConfig.title }}</strong>
                            <div class="input-group">
                                <select-from :name="keyField" 
                                        v-validate="'required'" 
                                        :data-vv-as="fieldConfig.title"
                                        :options="fieldConfig.options" 
                                        :selected="saveData['cod_'+keyField]" 
                                        v-on:input="setData"></select-from>
                                <input  type="text" 
                                        class="form-control m-input"
                                        :data-vv-as="fieldConfig.title"
                                        v-validate="fieldConfig.vee"
                                        v-model.lazy="saveData[keyField]" 
                                        :name="keyField" />
                            </div>
                            <form-error :attribute_name="'cod_'+keyField" :errors_form="errors"></form-error>
                            <form-error :attribute_name="keyField" :errors_form="errors"></form-error>
                        </div>
                    </div>
                    <div v-else-if="fieldConfig.type == 'date'" class="form-group m-form__group mb-3"
                        :class="{ 'has-danger': errors.has(keyField) }">
                        <strong>{{ fieldConfig.title }}</strong>
                        <input  type="date"
                                class="form-control m-input" 
                                v-validate="fieldConfig.vee"
                                :data-vv-as="fieldConfig.title" 
                                v-model.lazy="saveData[keyField]" 
                                :name="keyField" />
                        <form-error :attribute_name="keyField" :errors_form="errors"></form-error>
                    </div>
                    <div v-else class="form-group m-form__group mb-3"
                        :class="{ 'has-danger': errors.has(keyField) }">
                        <strong>{{ fieldConfig.title }}</strong>
                        <input  type="text" 
                                class="form-control m-input" 
                                v-validate="fieldConfig.vee"
                                :data-vv-as="fieldConfig.title" 
                                v-model.lazy="saveData[keyField]" 
                                :name="keyField" />
                        <form-error :attribute_name="keyField" :errors_form="errors"></form-error>
                    </div>
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
                //ciclo para cargar los valores de data config en saveData
                for (var prop in this.configData.fields) {
                    if ('value' in this.configData.fields[prop]) {
                        if (this.configData.fields[prop].type == 'phone') {
                            this.saveData['cod_'+prop] = this.configData.fields[prop].value['cod_phone'];
                            this.saveData[prop] = this.configData.fields[prop].value['phone'];
                        } else {
                            this.saveData[prop] = this.configData.fields[prop].value;
                        }
                    }
                }
            });
        },
        saveDataMethodPayment: function () {
            window.console.log('saveDataMethodPayment init')
            if (!this.disableForm) {
                window.console.log('saveDataMethodPayment active form')
                this.$validator.validateAll().then(result => {
                    window.console.log('saveDataMethodPayment valid',{result})
                    if (result) {
                        this.disableForm = true;
                        this.axios
                            .post("setPaymentFieldsRefundByAssist", {
                                idAssist: this.idAssist,
                                data: this.saveData,
                                "g-recaptcha":this.captcha
                            })
                            .then(response => {
                                if (response.data.STATUS == "OK") {
                                    window.Swal.fire({
                                        title: this.$t("general.sent"),
                                        text: this.$t("general.informationSentCorrectly"),
                                        type: "success",
                                        confirmButtonText: this.$t("general.ok"),
                                    }).then(() => {
                                        this.$emit("update:status", "L");
                                    });
                                } else {
                                    this.disableForm = false;
                                    if (response.data.ERRORS) {
                                        for (var prop in response.data.ERRORS) {
                                            this.errors.add({
                                                field: prop,
                                                msg: response.data.ERRORS[prop]
                                            });
                                        }
                                    }
                                }
                            });
                    }
                },
                errors => {
                    window.console.log('saveDataMethodPayment invalid',errors)
                    this.disableForm = false;
                }
                );
            }
        }
    }
};
</script>

<style>
.bootstrap-select.form-control:not([class*=col-]) {
    min-width: 80px !important;
}
</style>