<style scoped src="../Assists/Assist.css"></style>
<style src="../Element/custom-m-loader.css"></style>
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
                    <span>General</span>
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
                            <AssistAccordionDetaill class-prop="col-md-6">
                                <template slot="title">Re pricing</template>
                                <template slot="body">
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Status</span>
                                        <span class="m-widget16__price m--align-right">
                                            <span
                                                class="m-badge m-badge--wide"
                                                :class="['m-badge--'+rePricingDetaill.rePricing.status.color]"
                                            >{{ rePricingDetaill.rePricing.status.label }}</span>
                                        </span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Client</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.client }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Assist Code</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.assist.code }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Voucher</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.assist.voucher }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Name</span>
                                        <span class="m-widget16__price m--align-right">
                                            {{ rePricingDetaill.rePricing.contact.fisrtName }}
                                            {{ rePricingDetaill.rePricing.contact.lastName }}
                                        </span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Birth Date</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.contact.birthDate }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Age</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.rePricing.contact.age }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">User</span>
                                        <span class="m-widget16__price m--align-right">
                                            {{ rePricingDetaill.rePricing.user.fullName }}
                                            <small>({{ rePricingDetaill.rePricing.user.user }})</small>
                                        </span>
                                    </div>
                                </template>
                            </AssistAccordionDetaill>
                            <AssistAccordionDetaill class-prop="col-md-6">
                                <template slot="title">Invoice</template>
                                <template slot="body">
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Category</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.category }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Referencia</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.ref }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Date</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.date }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Description</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.description }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Monto</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.monto | currency(rePricingDetaill.invoice.currency)}}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Exchange Rate</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.exchangeRate | toFixed(5) }}</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Monto USD</span>
                                        <span
                                            class="m-widget16__price m--align-right"
                                        >{{ rePricingDetaill.invoice.montoUsd | currency("USD")}}</span>
                                    </div>
                                </template>
                            </AssistAccordionDetaill>
                            <AssistAccordionDetaill class-prop="col-md-12">
                                <template slot="title">Invoice File</template>
                                <template slot="body">
                                    <iframe
                                        class="preview"
                                        v-if="rePricingDetaill.invoice.view == 'doc'"
                                        :src="baseUrlApi()+'streaming/'+rePricingDetaill.invoice.id"
                                    ></iframe>
                                    <img
                                        class="preview"
                                        v-else
                                        :src="baseUrlApi()+'streaming/'+rePricingDetaill.invoice.id"
                                    />
                                </template>
                            </AssistAccordionDetaill>
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
    props: ["re-pricing"],
    components: {
        AssistAccordionDetaill
    },
    data() {
        return {
            rePricingBase: this.rePricing,
            rePricingDetaill: {},
            tabShow: "General",
            permission: {
                bills: this.middleware("bills", "read"),
                notes: this.middleware("notes", "read"),
                provider: this.middleware("provider", "read"),
                time_line: this.middleware("time_line", "read")
            }
        };
    },
    mounted() {
        this.getAssistanceDetail();
    },
    methods: {
        showTab(tab) {
            this.tabShow = tab;
        },
        getAssistanceDetail: function() {
            this.showLoader = true;
            this.axios
                .post("getRepricingDetaill", {
                    idRePricing: this.rePricingBase.id
                })
                .then(response => {
                    this.showLoader = false;
                    this.rePricingDetaill = response.data.RESPONSE;
                });
        }
    }
};
</script>