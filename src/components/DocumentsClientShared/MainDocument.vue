<template>
    <content-m :navigation="[{ title: $t('menu.assistance') }]">
        <template slot="title">{{ $t('menu.assistance') }}</template>
        <template slot="body">
            <ul class="nav nav-tabs m-tabs-line m-tabs-line--success m-tabs-line--2x mb-2">
                <li class="nav-item m-tabs__item">
                    <a class="nav-link m-tabs__link" :class="{ active: tabShow == 'List' }" @click.prevent="showTab('List')">
                        <i class="fa fa-life-ring" aria-hidden="true"></i>
                        {{ $t('general.list') }}
                    </a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane" :class="{ active: tabShow == 'List' }">
                    <ListDocument></ListDocument>
                </div>
            </div>
        </template>
    </content-m>
</template>
<script>
import contentM from "../Content.vue";
import ListDocument from "./ListDocument.vue";

export default {
    components: {
        contentM,
        ListDocument
    },
    data() {
        return {
            tabShow: "List"
        };
    },
    mounted() {
        if (!this.middleware("add_documents", "read")) {
            this.$router.push("http404");
        }
    },
    methods: {
        showTab(tab) {
            this.tabShow = tab;
        }
    }
};
</script>