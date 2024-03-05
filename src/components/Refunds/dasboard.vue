<template>
    <div class="m-content">
        <div class="m-grid__item m-grid__item--fluid">
            <div class="row mx-0">
                <div class="col-xl-10 mx-auto">
                    <div class="m-portlet__body">
                        <div class="m-invoice-2">
                            <div class="m-invoice__wrapper">
                                <div class="m-invoice__head">
                                    <div class="m-invoice__container m-invoice__container--centered p-0">
                                        <div class="d-flex justify-content-between align-items-center p-1 mt-4">
                                            <div class="title-refund-dashboard">{{ $t('reimbursement.reimbursement') }}
                                            </div>
                                            <div class="d-flex pl-2">
                                                <custom-img class="logo-refund-dashboard " v-if="results.logo" height="65" :src="results.logo"></custom-img>
                                            </div>
                                        </div>
                                        <div class="m-demo__preview p-0 pt-2" v-if="'processRefund' in results">
                                            <div class="m-demo">
                                                <div class="m-demo__preview p-1 px-2 text-center d-flex align-items-start flex-column-reverse flex-md-row align-items-center justify-content-between"
                                                    :style="{background:(results?.infoColor || '#36a3f7')}">
                                                    <ul class="m-nav m-nav--inline">
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link" v-tooltip:top="$t('general.client')">
                                                                <i class="m-nav__link-icon flaticon-suitcase"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.clientName }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link" v-tooltip:top="$t('assistance.code')">
                                                                <i class="m-nav__link-icon flaticon-shapes"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.codeAssist }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item" v-if="results.codeAssist != results.codigo">
                                                            <a class="m-nav__link" v-tooltip:top="$t('voucher.voucher')">
                                                                <i class="m-nav__link-icon flaticon-interface-5"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.codigo }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link" v-tooltip:top="$t('voucher.name')">
                                                                <i class="m-nav__link-icon flaticon-avatar"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.firstName + ' ' + results.lastName }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item" v-if="results.registeredDate">
                                                            <a class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.date.case')">
                                                                <i class="m-nav__link-icon flaticon-calendar-1"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.registeredDate.date }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.date.birth')">
                                                                <i class="m-nav__link-icon flaticon-lifebuoy"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.birthDate }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.type')">
                                                                <i class="m-nav__link-icon flaticon-lifebuoy"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.descCaseType }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.typeAssistance')">
                                                                <i class="m-nav__link-icon flaticon-lifebuoy"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.descAssistanceType }}</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <locale-changer></locale-changer>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="m-invoice__items m-form" v-if="results.processRefund == 'Y'">
                                            <declaration-of-use class="m-portlet m-portlet--tab"
                                                :id-assist="results.idAssist" v-if="formShow == 'declarationOfUse'"
                                                :accepted.sync="results.refundAdm.declarationOfUse">
                                            </declaration-of-use>
                                            <div v-show="formShow == 'showStatus'">
                                                <div class="m-portlet m-portlet--tab">
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
                                                        <div class="text-center">
                                                            <h1>
                                                                {{ $t('reimbursement.caseNumber') }}
                                                            </h1>
                                                            <h2>
                                                                {{ results.refundAdm.codigo }}
                                                            </h2>
                                                            <br>
                                                            <h1>
                                                                {{ $t('reimbursement.statusOfYour') }}
                                                            </h1>
                                                            <h2>
                                                                {{ results.refundAdm.status.description.title }} <br>
                                                            </h2>
                                                            <h2 v-if="'method_payment' in results.refundAdm">
                                                                <br>
                                                                {{ $t('reimbursement.paymentInformationUploaded') }} <br>
                                                            </h2>
                                                        </div>
                                                    </div>
                                                    <div class="m-portlet__foot m-portlet__foot--fit text-center">
                                                        <div class="m-form__actions">
                                                            <a class="btn btn-lg btn-primary mx-1"
                                                                v-if="results.refundAdm.status.code == 'C'"
                                                                :href="results.refundAdm.payment_proof">
                                                                {{ $t('reimbursement.paymentProof') }}</a>
                                                            <button @click="showStatus = false"
                                                                v-if="results.refundAdm.status.canUpload"
                                                                class="btn btn-lg btn-primary mx-1">{{ $t('general.return') }}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <form-refund v-show="formShow == 'refund'" :id-assist="results.idAssist"
                                                v-on:complete-documents="getAssistance" :default-data="defaultData">
                                            </form-refund>
                                            <payment-method v-if="formShow == 'paymentMethod'"
                                                class="m-portlet m-portlet--tab" :id-assist="results.idAssist"
                                                :status.sync="results.refundAdm.method_payment.status.code">
                                            </payment-method>
                                        </div>
                                        <div v-else>
                                            <div class="m-portlet m-portlet--tab text-center portlet-no-client">
                                                <h1>
                                                    {{ $t('reimbursement.clientNotProcessRefunds') }}
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
import customImg from "../Element/custom-img";
import localeChanger from "../locales/locale-changer.vue";
import formRefund from "./formRefund.vue";
import declarationOfUse from "./declarationOfUse.vue";
import paymentMethod from "./paymentMethod.vue";
export default {
    components: {
        customImg,
        localeChanger,
        formRefund,
        declarationOfUse,
        paymentMethod
    },
    data() {
        return {
            code: this.$route.params.code,
            showStatus: true,
            results: {},
        };
    },
    mounted() {
        this.getAssistance();
    },
    methods: {
        getAssistance: function () {
            this.axios
                .get("getAssistancePublic", {
                    params: {
                        codeAssist: this.code,
                        extra: ['refund_adm']
                    }
                })
                .then(response => {
                    if (response.data.RESPONSE.RESULTS === null) {
                        this.$router.push({ name: "login" });
                    }
                    this.results = response.data.RESPONSE.RESULTS[0];
                });
        }
    },
    computed: {
        defaultData: function () {
            return {
                date: this.results.registeredDate.date,
                nameBen: this.results.firstName + " " + this.results.lastName,
                caseType: this.results.descCaseType,
                assistanceType: this.results.descAssistanceType
            };
        },
        formShow: function () {
            if ('method_payment' in this.results.refundAdm &&
                ['S'].includes(this.results.refundAdm.method_payment.status.code)) {
                return 'paymentMethod';
            }
            if (this.results.refundAdm.declarationOfUse == 'N') {
                return 'declarationOfUse';
            }
            if (this.results.refundAdm.status.show && this.showStatus) {
                return 'showStatus';
            }
            return 'refund';
        }
    }
};
</script>
<style>
.progress-refund {
    height: 3rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
}

.progress-refund .progressbar {
    height: 3rem;
}

.btn-type-document {
    min-height: 8rem;
}

.title-refund-dashboard {
    font-size: 2.5rem;
    font-weight: bold;
}
.logo-refund-dashboard{
    max-width: 100%; 
    height: auto;
}
@media only screen and (max-width: 1024px) {
    .title-refund-dashboard {
        font-size: 2rem;
    }
}
@media only screen and (max-width: 427px) {
    .title-refund-dashboard {
        font-size: 1.8rem;
    }
}
</style>