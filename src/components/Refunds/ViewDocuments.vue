<template>
    <data-assist :results.sync="results" :code="code">
        <slot>
            <div class="m-portlet m-portlet--responsive-mobile m-portlet--tab" :class="{ 'm-loader m-loader--metal m-loader--div': showLoader }">
                <div class="m-portlet__head">
                    <div class="m-portlet__head-caption">
                        <div class="m-portlet__head-title">
                            <h5 class="m-portlet__head-text">
                                {{ $t('refunds.viewLoadedDocuments') }}
                            </h5>
                        </div>
                    </div>
                    <div class="m-portlet__head-tools">
                        <router-link :to="{path: backRefund}" replace class="btn btn-default">
                            {{ $t('general.back') | upper }}
                        </router-link>
                    </div>
                </div>
                <view-documents-list
                    v-if="'STATUS' in resultCheckPin && resultCheckPin['STATUS']=='OK'"
                    :id-assist="results.idAssist"
                    :loader.sync="showLoader"
                    :pin="pin"
                    class="m-portlet__body">
                </view-documents-list>
                <form v-else-if="'STATUS' in resultPin" @submit.prevent="checkPin">
                    <div class="m-portlet__body text-justify">
                        <h5>
                            {{ resultPin.MESSAGE }}
                        </h5>
                        <div>
                            {{ $t('document.pinSent') }}
                        </div>
                        <div class="d-flex justify-content-center" v-if="resultPin.STATUS == 'OK'">
                            <div class="form-group m-form__group m-0 mt-4"
                                :class="{'has-danger': errors.has('pin')}">
                                <span class="m--font-bold text-justify h5">
                                    {{ $t('general.enterPinToContinue') }}
                                </span>
                                <input-from-pin :value.sync="pin" @submit="checkPin">
                                </input-from-pin>
                                <form-error
                                    :attribute_name="'pin'"
                                    :errors_form="errors"
                                ></form-error>
                            </div>
                        </div>
                    </div>
                    <div class="m-portlet__foot m-portlet__foot--fit text-center">
                        <div class="m-form__actions">
                            <button
                                    :disabled="disableForm || pin.length < 5"
                                    :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                                    type="submit"
                                    class="btn btn-lg btn-primary"
                            >{{ $t('general.continue') }}</button>
                        </div>
                    </div>
                </form>
                <div v-else class="m-portlet__body text-justify">
                    <h5>
                        {{ $t('refunds.verificationCodeSentTo') }}
                    </h5>
                    <p>
                        {{ $t('refunds.identityVerification') }}
                    </p>
                    <div class="row">
                        <div class="col-md-6 d-flex align-items-start py-3">
                            <button  class="btn-block btn btn-default btn-type-document btn-lg text-wrap text-left align-self-stretch"
                                    @click.prevent="sendPin('email')"
                                    :disabled="!results.email"
                                    type="button">
                                <div class="d-flex align-items-center justify-content-start">
                                    <i class="fa fa-2x fa-envelope pr-3 text-primary"></i>
                                    <span>{{ $t('general.email') }}: {{ results.email || $t('general.notLoaded') }}</span>
                                </div>
                            </button>
                        </div>
                        <div class="col-md-6 d-flex align-items-start py-3">
                            <button  class="btn-block btn btn-default btn-type-document btn-lg text-wrap text-left align-self-stretch"
                                    @click.prevent="sendPin('phone')"
                                    :disabled="!results.phone"
                                    type="button">
                                <div class="d-flex align-items-center justify-content-start">
                                    <i class="fa fa-2x fa-message pr-3 text-primary"></i>
                                    <span>SMS: {{ results.phone || $t('general.notLoaded') }}</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </slot>
    </data-assist>
</template>

<script>
import DataAssist from "./DataAssist.vue";
import FormError from "../FormError";
import ViewDocumentsList from "./ViewDocumentsList.vue";
import inputFromPin from "../Tables/filters/inputFromPin.vue";

export default {
    components: {
        DataAssist,
        FormError,
        inputFromPin,
        ViewDocumentsList
    },
    data() {
        return {
            code: this.$route.params.code,
            resultPin: {},
            resultCheckPin: {},
            showLoader: false,
            pin: "",
            results: {},
            disableForm: false
        };
    },
    methods: {
        setData: function (item,value) {
            this[item] = value;
        },
        sendPin: function (typeContact) {
            this.showLoader = true;
            this.axios
                .post("viewDocumentRefund/sendPin", {
                    idAssist: this.results.idAssist,
                    typeContact: typeContact
                })
                .then(response => {
                    this.showLoader = false;
                    this.resultPin = response.data;
                });
        },
        checkPin: function () {
            this.showLoader = true;
            this.errors.clear();

            this.axios
                .post("viewDocumentRefund/checkPin", {
                    idAssist: this.results.idAssist,
                    pin: this.pin
                })
                .then(response => {
                    this.showLoader = false;
                    this.resultCheckPin = response.data;

                    for (let prop in this.resultCheckPin.ERRORS) {
                        this.errors.add({
                            field: prop,
                            msg: this.resultCheckPin.ERRORS[prop]
                        });
                    }
                });
        },
    },
    computed: {
        backRefund: function () {
            return `/${this.$route.params.lang}/reimbursement/${this.$route.params.code}`;
        },
    }
}
</script>