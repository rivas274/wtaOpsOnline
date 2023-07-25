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
                                                                >{{results.firstName+' '+results.lastName}}</span>
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
                                            <declaration-of-use class="m-portlet m-portlet--tab"
                                                                :id-assist="results.idAssist" 
                                                                v-if="formShow=='declarationOfUse'"
                                                                :accepted.sync="results.refundAdm.declarationOfUse">
                                            </declaration-of-use>
                                            <div v-show="formShow=='showStatus'">
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
                                                        </div>
                                                    </div>
                                                    <div class="m-portlet__foot text-center">
                                                        <div class="m-form__actions">
                                                            <a  class="btn btn-primary mx-1" 
                                                                v-if="results.refundAdm.status.code=='C'"
                                                                :href="results.refundAdm.payment_proof">
                                                                {{ $t('reimbursement.paymentProof') }}</a>
                                                            <button @click="showStatus = false" 
                                                                v-if="results.refundAdm.status.canUpload" 
                                                                class="btn btn-primary mx-1"
                                                            >{{ $t('general.return') }}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <form-refund v-show="formShow=='refund'"
                                                        class="m-portlet m-portlet--tab"
                                                        :id-assist="results.idAssist"
                                                        v-on:complete-documents="getAssistance"
                                                        :default-data="defaultData">
                                            </form-refund>
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
import customImg from "../Element/custom-img";
import localeChanger from "../locales/locale-changer.vue";
import formRefund from "./formRefund.vue";
import declarationOfUse from "./declarationOfUse.vue";
export default {
    components: {
        customImg,
        localeChanger,
        formRefund,
        declarationOfUse
    },
    data() {
        return {
            code: this.$route.params.code,
            showStatus:true,
            results: {},
        };
    },
    mounted() {
        this.getAssistance();
    },
    methods: {
        getAssistance: function() {
            this.axios
                .get("getAssistancePublic", {
                    params: {
                        codeAssist: this.code,
                        extra:['refund_adm']
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
            if (this.results.refundAdm.declarationOfUse=='N') {
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