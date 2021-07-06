<template>
    <content-m :navigation="[{title:$t('menu.invoice')}]">
        <template slot="title">{{$t('menu.invoice')}}</template>
        <template slot="body">
            <ul class="nav nav-tabs m-tabs-line m-tabs-line--success m-tabs-line--2x">
                <li class="nav-item m-tabs__item">
                    <a
                        class="nav-link m-tabs__link"
                        :class="{active:tabShow=='List'}"
                        @click.prevent="showTab('List')"
                    >
                        <i class="fa fa-life-ring" aria-hidden="true"></i>
                        {{$t('general.list')}}
                    </a>
                </li>
                <li class="nav-item m-tabs__item">
                    <a
                        class="nav-link m-tabs__link"
                        :class="{active:tabShow=='AddInvoice'}"
                        @click.prevent="showTab('AddInvoice')"
                    >
                        <i class="fas fa-cloud-upload-alt"></i>
                        {{$t('invoice.addInvoice')}}
                    </a>
                </li>
                <li class="nav-item m-tabs__item" v-for="invoi in invoiceTab" :key="invoi.idFile">
                    <span>
                        <a
                            @click.prevent="showTab(invoi.idFile)"
                            class="nav-link m-tabs__link"
                            :class="{active:tabShow==invoi.idFile}"
                        >
                            <strong v-html="invoi.reference"></strong>
                            <small
                                v-html="invoi.category"
                                class="m--hidden-mobile"
                            ></small>
                        </a>
                        <i class="fa fa-window-close close-tab" @click="removeInvoice(invoi)"></i>
                    </span>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane" :class="{active:tabShow=='List'}">
                    <ListInvoice v-on:addInvoice="addInvoice" :open-invoice="invoiceTab"></ListInvoice>
                </div>
                <div class="tab-pane" :class="{active:tabShow=='AddInvoice'}">
                    <add-invoice v-on:addInvoice="addInvoice"></add-invoice>
                </div>
                <div
                    class="tab-pane"
                    v-for="invoi in invoiceTab"
                    :key="invoi.idFile"
                    :class="{active:tabShow==invoi.idFile}"
                >
                    <Invoice :invoice="invoi"></Invoice>
                </div>
            </div>
        </template>
    </content-m>
</template>
<script>
import contentM from "../Content.vue";
import ListInvoice from "./ListInvoice.vue";
import addInvoice from "./addInvoice.vue";
import Invoice from "./Invoice.vue";
import Flag from "../Element/Flag.vue";
export default {
    components: {
        contentM,
        ListInvoice,
        Invoice,
        Flag,
        addInvoice
    },
    data() {
        return {
            invoiceTab: [],
            tabShow: "List"
        };
    },
    mounted() {},
    methods: {
        addInvoice: function(invoice) {
            let tab = this.invoiceTab.filter(function(v) {
                return v.idFile == invoice.idFile;
            });
            if (tab.length == 0) {
                this.invoiceTab.push(invoice);
                this.showTab(invoice.idFile);
            } else {
                this.showTab(tab[0].idFile);
            }
        },
        removeInvoice: function({ idFile }) {
            if (idFile == this.tabShow) {
                this.showTab("List");
            }
            this.invoiceTab = this.invoiceTab.filter(function(v) {
                return v.idFile != idFile;
            });
        },
        showTab(tab) {
            this.tabShow = tab;
        }
    }
};
</script>