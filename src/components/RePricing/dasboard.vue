<style scoped src="../Assists/MainAsistencia.css"></style>
<template>
    <content-m :navigation="[{title:$t('menu.rePricing')}]">
        <template slot="title">{{$t('menu.rePricing')}}</template>
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
                <li class="nav-item m-tabs__item" v-for="rePri in rePricing" :key="rePri.id">
                    <span>
                        <a
                            @click.prevent="showTab(rePri.id)"
                            class="nav-link m-tabs__link"
                            :class="{active:tabShow==rePri.id}"
                        >
                            <strong>{{ rePri.assist.codigo }}</strong>
                            <small
                                v-html="rePri.passenger.fisrtName+' '+rePri.passenger.lastName"
                                class="m--hidden-mobile"
                            ></small>
                            <small>{{ rePri.voucher.codigo }}</small>
                        </a>
                        <i class="fa fa-window-close close-tab" @click="removeRePricing(rePri)"></i>
                    </span>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane" :class="{active:tabShow=='List'}">
                    <ListRePricing v-on:addRePricing="addRePricing" :open-asist="rePricing"></ListRePricing>
                </div>
                <div
                    class="tab-pane"
                    v-for="rePri in rePricing"
                    :key="rePri.id"
                    :class="{active:tabShow==rePri.id}"
                >
                    <RePricing :re-pricing="rePri"></RePricing>
                </div>
            </div>
        </template>
    </content-m>
</template>
<script>
import contentM from "../Content.vue";
import ListRePricing from "./ListRePricing.vue";
import RePricing from "./RePricing.vue";
import Flag from "../Element/Flag.vue";
export default {
    components: {
        contentM,
        ListRePricing,
        RePricing,
        Flag
    },
    data() {
        return {
            rePricing: [],
            tabShow: "List"
        };
    },
    mounted() {},
    methods: {
        addRePricing: function(rePri) {
            let tab = this.rePricing.filter(function(v) {
                return v.id == rePri.id;
            });
            if (tab.length == 0) {
                this.rePricing.push(rePri);
                this.showTab(rePri.id);
            } else {
                this.showTab(tab[0].id);
            }
        },
        removeRePricing: function({ id }) {
            if (id == this.tabShow) {
                this.showTab("List");
            }
            this.rePricing = this.rePricing.filter(function(v) {
                return v.id != id;
            });
        },
        showTab(tab) {
            this.tabShow = tab;
        }
    }
};
</script>