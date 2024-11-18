<template>
    <div class="m-content">
        <div class="m-grid__item m-grid__item--fluid">
            <div class="row mx-0">
                <div class="col-xl-10 mx-auto">
                    <div class="m-portlet__body">
                        <div class="m-invoice-2">
                            <div class="m-invoice__wrapper">
                                <div class="m-invoice__head">
                                    <div class="d-flex justify-content-center align-items-center vh-100" v-if="xrs || !('idAssist' in results)">
                                        <div>
                                            <div class="m-loader m-loader--xl m-loader--metal mb-5">
                                            </div>
                                            <h5>
                                                {{$t('general.loading')}}
                                            </h5>
                                        </div>
                                    </div>
                                    <div v-else class="m-invoice__container m-invoice__container--centered p-0">
                                        <div class="d-flex justify-content-between align-items-center p-1 mt-4">
                                            <div class="title-refund-dashboard">{{ $t('reimbursement.reimbursement') }}
                                            </div>
                                            <div class="d-flex pl-2">
                                                <custom-img class="logo-refund-dashboard " 
                                                            v-if="results.logo"
                                                            height="65" 
                                                            :src="results.logo">
                                                </custom-img>
                                            </div>
                                        </div>
                                        <div class="m-demo__preview p-0 pt-2" v-if="'processRefund' in results">
                                            <div class="m-demo">
                                                <div class="m-demo__preview p-1 px-2 text-center d-flex flex-column-reverse flex-md-row align-items-md-center justify-content-between"
                                                    :style="{ background: (results['infoColor'] || '#36a3f7') }">
                                                    <ul class="m-nav m-nav--inline">
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link" v-tooltip:top="$t('general.client')">
                                                                <i class="m-nav__link-icon fa fa-building"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.clientName }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.code')">
                                                                <i class="m-nav__link-icon la fi-rr-ballot"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.codeAssist }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item"
                                                            v-if="results.codeAssist != results.codigo">
                                                            <a class="m-nav__link"
                                                                v-tooltip:top="$t('voucher.voucher')">
                                                                <i class="m-nav__link-icon fi-rr-ballot"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.codigo }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link" v-tooltip:top="$t('voucher.name')">
                                                                <i class="m-nav__link-icon fa fa-user"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.firstName + ' ' + results.lastName }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item" v-if="results.registeredDate">
                                                            <a class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.date.case')">
                                                                <i class="m-nav__link-icon fa fa-calendar-check"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.registeredDate.date }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.date.birth')">
                                                                <i class="m-nav__link-icon fa fa-calendar-check"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.birthDate }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.type')">
                                                                <i class="m-nav__link-icon fi-rr-life-ring"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.descCaseType }}</span>
                                                            </a>
                                                        </li>
                                                        <li class="m-nav__item">
                                                            <a class="m-nav__link"
                                                                v-tooltip:top="$t('assistance.typeAssistance')">
                                                                <i class="m-nav__link-icon fi-rr-life-ring"></i>
                                                                <span
                                                                    class="m-nav__link-text text-left">{{ results.descAssistanceType }}</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <locale-changer class="mt-sm-1"></locale-changer>
                                                </div>
                                            </div>
                                        </div>
                                        <slot name="header"></slot>
                                        <div class="m-invoice__items m-form" v-if="results.processRefund == 'Y'">
                                            <slot></slot>
                                        </div>
                                        <div v-else>
                                            <div class="m-portlet m-portlet--responsive-mobile m-portlet--tab text-center portlet-no-client">
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
export default {
    props: {
        code: {
            type: String,
            required: true
        },
        results: {
            type: Object,
        },
        reload: {
            type: Boolean,
            default: false
        }
    },
    components: {
        customImg,
        localeChanger,
    },
    data() {
        return {
            xrs: false
        };
    },
    mounted() {
        this.getAssistance();
    },
    methods: {
        getAssistance: function () {
            this.xrs = true;
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
                    this.$emit("update:results", response.data.RESPONSE.RESULTS[0]);
                    this.xrs = false;
                });
        }
    },
    watch: {
        reload: function (val) {
            if (val) {
                this.getAssistance();
                this.$emit("update:reload", false);
            }
        }
    }
};
</script>