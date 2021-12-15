<template>
    <content-m :navigation="[{title:$t('menu.assistance')}]">
        <template slot="title">{{$t('menu.assistance')}}</template>
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
                <li
                    class="nav-item m-tabs__item"
                    v-for="assist in assistances"
                    :key="assist.codeAssist"
                >
                    <span>
                        <a
                            @click.prevent="showTab(assist.codeAssist)"
                            class="nav-link m-tabs__link"
                            :class="{active:tabShow==assist.codeAssist}"
                        >
                            <Flag :iso="assist.isoCountry" height="18"></Flag>
                            <strong>{{ assist.codeAssist }}</strong>
                            <small
                                v-html="assist.fisrtName+' '+assist.lastName"
                                class="m--hidden-mobile"
                            ></small>
                            <small>{{ assist.codigo }}</small>
                        </a>
                        <i class="fa fa-window-close close-tab" @click="removeAssist(assist)"></i>
                    </span>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane" :class="{active:tabShow=='List'}">
                    <ListAsistencia v-on:addAssist="addAssist" :open-asist="assistances"></ListAsistencia>
                </div>
                <div
                    class="tab-pane"
                    v-for="assist in assistances"
                    :key="assist.codeAssist"
                    :class="{active:tabShow==assist.codeAssist}"
                >
                    <assist :assist="assist"></assist>
                </div>
            </div>
        </template>
    </content-m>
</template>
<script>
import contentM from "../Content.vue";
import ListAsistencia from "./ListAsistencia.vue";
import Assist from "./Assist.vue";
import Flag from "../Element/Flag.vue";
export default {
    components: {
        contentM,
        ListAsistencia,
        Assist,
        Flag
    },
    data() {
        return {
            assistances: [],
            tabShow: "List"
        };
    },
    mounted() {
        if (!this.middleware("assist", "read")) {
            this.$router.push("http404");
        }
    },
    methods: {
        addAssist: function(assist) {
            let tab = this.assistances.filter(function(v) {
                return v.codeAssist == assist.codeAssist;
            });
            if (tab.length == 0) {
                this.assistances.push(assist);
                this.showTab(assist.codeAssist);
            } else {
                this.showTab(tab[0].codeAssist);
            }
        },
        removeAssist: function({ codeAssist }) {
            if (codeAssist == this.tabShow) {
                this.showTab("List");
            }
            this.assistances = this.assistances.filter(function(v) {
                return v.codeAssist != codeAssist;
            });
        },
        showTab(tab) {
            this.tabShow = tab;
        }
    }
};
</script>