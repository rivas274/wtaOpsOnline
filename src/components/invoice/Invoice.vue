<style scoped src="../Assists/Assist.css"></style>

<style scoped>
iframe {
    min-height: 400px !important;
    border: 0px;
}
</style>
<template>
    <div class="content-tabs-left">
        <ul class="nav nav-tabs tabs-left">
            <li :class="{active:tabShow=='General'}" v-tooltip:top="'General'">
                <a
                    class="nav-link"
                    :class="{'m--font-success':tabShow=='General'}"
                    @click.prevent="showTab('General')"
                >
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                    <span>{{$t('general.general')}}</span>
                </a>
            </li>
        </ul>
        <div class="tab-content container-fluid">
            <div class="tab-pane" :class="{active:tabShow=='General'}">
                <div
                    class="m-portlet m-portlet--full-height"
                    :class="{'m-loader m-loader--metal m-loader--div':showLoader}"
                >
                    <div class="m-portlet__body m-portlet__body--no-padding">
                        <div class="row m-row--no-padding m-row--col-separator-xl">
                            <AssistAccordionDetaill class="col-md-5">
                                <template slot="title">{{$t('menu.invoice')|upper}}</template>
                                <template slot="body">
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('general.status')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ invoice.billStatusDesc }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('assistanceBills.classification')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ invoice.category }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('invoice.date.bill')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ invoice.billDate }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('assistanceBills.reference')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                            v-html="invoice.reference"
                                        ></span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('document.description')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ invoice.description }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('assistanceBills.originalAmount')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                            v-tooltip="'Currency '+invoice.currency"
                                        >{{ invoice.originalAmount | currency(invoice.currency) }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('assistanceBills.amountUSD')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                            v-tooltip="'Currency USD'"
                                        >{{ invoice.usdAmount | currency("USD") }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">{{$t('assistanceBills.exchangeRate')}}</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ invoice.exchangeRate | toFixed(4) }}</span>
                                    </div>
                                </template>
                            </AssistAccordionDetaill>
                            <div class="col-md-7">
                                <iframe class="rounded h-100 w-100" :src="streaming(invoice)"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AssistAccordionDetaill from "../Assists/AssistAccordionDetaill.vue";
export default {
    props: ["invoice"],
    components: {
        AssistAccordionDetaill
    },
    data() {
        return {
            invoiceDetaill: {},
            tabShow: "General",
            showLoader: false,
        };
    },
    methods: {
        showTab(tab) {
            this.tabShow = tab;
        },
        streaming({ fileName }) {
            return this.baseUrlApi() + "streaming/" + fileName;
        }
    }
};
</script>