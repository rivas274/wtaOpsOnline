<style scoped src="./Assist.css"></style>

<template>
    <div :class="{ 'm-loader m-loader--metal m-loader--div': showLoader }">
        <progress-base v-if="'timeLineRefund' in arrPaymentMethod" :status="arrPaymentMethod.timeLineRefund" />
        <progress-base v-if="'timeLineMethodPayment' in arrPaymentMethod" :status="arrPaymentMethod.timeLineMethodPayment" />
        <div
            class="m-accordion m-accordion--default m-accordion--solid m-accordion--section m-accordion--padding-lg"
            :id="'m_accordion_refund_'+idAssist"
            role="tablist">
            <AssistAccordion
                    :id="'_payment_method_'+idAssist"
                    ico="fa fa-money-bill"
                    :open="true">
                <template slot="title">
                    {{ $t('reimbursement.methodPayment') | upper}}
                    <small v-if="showPaymentMethod">({{arrPaymentMethod.title}} | {{arrPaymentMethod.country}})</small>
                    <small v-else class="m--font-bolder m--font-danger">
                        ({{ $t('general.notApplicable') }})
                    </small>
                </template>
                <template slot="body" v-if="showPaymentMethod">
                    <AssistAccordionDetaill
                        class="col-md-4" 
                        :key="keygroup"
                        v-for="(groupConfig, keygroup) in arrPaymentMethod.fields">
                        <template slot="title">{{groupConfig.title|upper}}</template>
                        <template slot="body">
                            <div class="m-widget16__item" :key="keyField"  v-for="(fieldConfig, keyField) in groupConfig.fields">
                                <span class="m-widget16__date">{{ fieldConfig.title }}</span>
                                <span
                                    class="m-widget16__price m--align-right"
                                >{{ fieldConfig.showValue || $t('general.notLoaded') }}</span>
                            </div>
                        </template>
                    </AssistAccordionDetaill>
                    
                    <div class="col-md-4">
                        <AssistAccordionDetaill>
                            <template slot="title">{{ $t('refunds.thirdPartyAuthorization') | upper }}</template>
                            <template slot="body">
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.status')}}</span>
                                    <span class="m-widget16__price m--align-right">
                                        {{arrPaymentMethod.thirdPartyAuthorization.title}}
                                        <a class="btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill"
                                            v-if="arrPaymentMethod.thirdPartyAuthorization['file']"
                                            :href="arrPaymentMethod.thirdPartyAuthorization.file"
                                            target="_blank">
                                            <i class="fa fa-download"></i>
                                        </a>
                                    </span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                        <AssistAccordionDetaill v-if="arrPaymentMethod.bankCertification.status!='N'">
                            <template slot="title">{{ $t('refunds.bankCertification') | upper }}</template>
                            <template slot="body">
                                <div class="m-widget16__item">
                                    <span class="m-widget16__date">{{$t('general.status')}}</span>
                                    <span class="m-widget16__price m--align-right">
                                        {{arrPaymentMethod.bankCertification.title}}
                                        <a class="btn btn-secondary m-btn m-btn--icon m-btn--icon-only m-btn--pill"
                                            v-if="arrPaymentMethod.bankCertification['file']"
                                            :href="arrPaymentMethod.bankCertification.file"
                                            target="_blank">
                                            <i class="fa fa-download"></i>
                                        </a>
                                    </span>
                                </div>
                            </template>
                        </AssistAccordionDetaill>
                    </div>
                </template>
            </AssistAccordion>
        </div>
    </div>
</template>
<script>
import AssistAccordion from "./AssistAccordion.vue";
import AssistAccordionDetaill from "./AssistAccordionDetaill.vue";
import ProgressBase from "./ProgressBase.vue";

export default {
    components: {
        ProgressBase,
        AssistAccordion,
        AssistAccordionDetaill,
    },
    props: ["id-assist"],
    data: function () {
        return {
            showLoader: false,
            arrPaymentMethod: {},
        };
    },
    methods: {
        getPaymentMethodRefund: function () {
            this.showLoader = true;
            this.axios
                .post("getPaymentFieldsByAssist", {
                    idAssist: this.idAssist,
                    rand: Math.random()
                })
                .then(response => {
                    this.showLoader = false;
                    if (response.data.STATUS=='OK') {
                        this.arrPaymentMethod = response.data.RESPONSE;
                    }
                });
        }
    },
    mounted() {
        this.getPaymentMethodRefund();
    },
    computed: {
        showFileAuthorization() {
            if (!this.showPaymentMethod) {
                return false;
            }
            return this.arrPaymentMethod.thirdPartyAuthorization.status == 'Y';
        },
        showPaymentMethod() {
            return 'title' in this.arrPaymentMethod;
        }
    }
};
</script>
