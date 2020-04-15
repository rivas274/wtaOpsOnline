<style scoped src="../Assists/Assist.css"></style>
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
                                <template slot="title">Travel Source</template>
                                <template slot="body">
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">From</span>
                                        <span class="m-widget16__price m--align-right">From</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">To</span>
                                        <span class="m-widget16__price m--align-right">To</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Days</span>
                                        <span class="m-widget16__price m--align-right">Days</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Purchase Date</span>
                                        <span class="m-widget16__price m--align-right">Purchase Date</span>
                                    </div>
                                </template>
                            </AssistAccordionDetaill>
                            <AssistAccordionDetaill class-prop="col-md-6">
                                <template slot="title">Travel Source</template>
                                <template slot="body">
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">From</span>
                                        <span class="m-widget16__price m--align-right">From</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">To</span>
                                        <span class="m-widget16__price m--align-right">To</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Days</span>
                                        <span class="m-widget16__price m--align-right">Days</span>
                                    </div>
                                    <div class="m-widget16__item">
                                        <span class="m-widget16__date">Purchase Date</span>
                                        <span class="m-widget16__price m--align-right">Purchase Date</span>
                                    </div>
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
            tabShow: "General",
            permission: {
                bills: this.middleware("bills", "read"),
                notes: this.middleware("notes", "read"),
                provider: this.middleware("provider", "read"),
                time_line: this.middleware("time_line", "read")
            }
        };
    },
    methods: {
        showTab(tab) {
            this.tabShow = tab;
        }
    }
};
</script>