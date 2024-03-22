<template>
    <content-m :navigation="[{ title: $t('document.uploadDocuments') }]">
        <template slot="title">{{ $t('document.uploadDocuments') }}</template>
        <template slot="body">
            <ul class="nav nav-tabs m-tabs-line m-tabs-line--success m-tabs-line--2x mb-2">
                <li class="nav-item m-tabs__item">
                    <a class="nav-link m-tabs__link" :class="{ active: tabShow == 'List' }" @click.prevent="showTab('List')">
                        <i class="fa fa-life-ring" aria-hidden="true"></i>
                        {{ $t('general.list') }}
                    </a>
                </li>
                <li class="nav-item m-tabs__item">
                    <a class="nav-link m-tabs__link" :class="{ active: tabShow == 'addDocument' }"
                        @click.prevent="showTab('addDocument')">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        {{ $t('document.document') }}
                    </a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane" :class="{ active: tabShow == 'List' }">
                    <ListDocument></ListDocument>
                </div>
                <div class="tab-pane" :class="{ active: tabShow == 'addDocument' }">
                    <addDocument></addDocument>
                </div>
            </div>
        </template>
    </content-m>
</template>
<script>
import contentM from "../Content.vue";
import ListDocument from "./ListDocument.vue";
import addDocument from "./addDocument.vue";

export default {
    components: {
        contentM,
        ListDocument,
        addDocument
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