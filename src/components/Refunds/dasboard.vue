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
                                            <form-refund class="m-portlet m-portlet--tab" 
                                                        :id-assist="results.idAssist"
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
export default {
    components: {
        customImg,
        localeChanger,
        formRefund
    },
    data() {
        return {
            code: this.$route.params.code,
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
                nameBen: this.results.fisrtName + " " + this.results.lastName,
                caseType: this.results.descCaseType,
                assistanceType: this.results.descAssistanceType
            };
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