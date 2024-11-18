<template>
    <data-assist :results.sync="results" :code="code" :reload.sync="reload">
        <h4 class="text-center" slot="header">{{ refundStatus }}</h4>
        <slot v-if="('idAssist' in results)">
            <declaration-of-use class="m-portlet m-portlet m-portlet--responsive-mobile m-portlet--tab"
                :id-assist="results.idAssist" v-if="formShow == 'declarationOfUse'"
                :accepted.sync="refundAdm.declarationOfUse">
            </declaration-of-use>
            <div v-show="formShow == 'showStatus'">
                <div class="m-portlet m-portlet--responsive-mobile m-portlet--tab">
                    <div class="m-portlet__head">
                        <div class="m-portlet__head-caption">
                            <div class="m-portlet__head-title">
                                <div class="m-portlet__head-text">
                                    {{ $t('reimbursement.information') }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="m-portlet__body">
                        <div class="text-center">
                            <h1>
                                {{ $t('reimbursement.caseNumber') }}
                            </h1>
                            <h2>
                                {{ refundAdm.codigo }}
                            </h2>
                            <br>
                            <h1>
                                {{ $t('reimbursement.statusOfYour') }}
                            </h1>
                            <h2>
                                {{ refundAdm.status.description.title }} <br>
                            </h2>
                            <h2 v-if="'method_payment' in refundAdm">
                                <br>
                                {{ $t('reimbursement.paymentInformationUploaded') }}
                                <br>
                            </h2>
                        </div>
                    </div>
                    <div class="m-portlet__foot m-portlet__foot--fit text-center">
                        <div class="m-form__actions">
                            <div>
                                <button @click="showStatus = false"
                                    v-if="refundAdm.status.canUpload"
                                    class="btn btn-lg btn-primary mx-1">
                                    {{ $t('reimbursement.returnTo.document') }}
                                </button>
                                <button @click="setPaymentMethodStatus('S')"
                                    v-if="paymentMethodStatus == 'L'" 
                                    class="btn btn-lg btn-primary mx-1">
                                    {{ $t('reimbursement.returnTo.paymentInformation') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form-refund v-show="formShow == 'refund'"
                        :id-assist="results.idAssist"
                        @complete-documents="reload"
                        :default-data="defaultData">
            </form-refund>
            <payment-method v-if="formShow == 'paymentMethod'" 
                :id-assist="results.idAssist"
                :status.sync="refundAdm.method_payment.status.code">
            </payment-method>
        </slot>
    </data-assist>
</template>

<script>
import formRefund from "./formRefund.vue";
import declarationOfUse from "./declarationOfUse.vue";
import paymentMethod from "./paymentMethod.vue";
import DataAssist from "./DataAssist.vue";

export default {
    components: {
        formRefund,
        declarationOfUse,
        paymentMethod,
        DataAssist
    },
    data() {
        return {
            code: this.$route.params.code,
            showStatus: true,
            reload: false,
            results: {},
        };
    },
    methods: {
        setPaymentMethodStatus: function (status) {
            this.refundAdm.method_payment.status.code = status;
        }
    },
    computed: {
        refundAdm: function () {
            return this.results['refundAdm']||{};
        },
        paymentMethod: function () {
            return this.refundAdm['method_payment']||{};
        },
        defaultData: function () {
            return {
                date: this.results.registeredDate.date,
                nameBen: this.results.firstName + " " + this.results.lastName,
                caseType: this.results.descCaseType,
                assistanceType: this.results.descAssistanceType
            };
        },
        paymentMethodStatus: function () {
            console.log(this.paymentMethod);
            if (!('status' in this.paymentMethod)) {
                return 'N';
            }
            return this.paymentMethod.status.code;
        },
        refundStatus: function () {
            if(!('code' in (this.refundAdm['status']||{}))) {
                return '';
            }
            if (['P'].includes(this.refundAdm.status.code)) {
                return '';
            }
            return this.refundAdm.status.description.title;
        },
        formShow: function () {
            if (this.refundAdm.declarationOfUse == 'N') {
                return 'declarationOfUse';
            }
            if (['S'].includes(this.paymentMethodStatus)) {
                return 'paymentMethod';
            }
            if (this.refundAdm.status.show && this.showStatus) {
                return 'showStatus';
            }
            return 'refund';
        }
    }
};
</script>