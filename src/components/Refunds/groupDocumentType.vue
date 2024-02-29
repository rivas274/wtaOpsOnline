<template>
    <div>
        <div class="m-portlet__head m--hidden-mobile">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <h3 class="m-portlet__head-text">
                        {{ $t('reimbursement.information') }}
                    </h3>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="row">
                <div class="col-md-6 d-flex align-items-start py-3" v-for="docType in documentsType " :key="docType.id">
                    <button class="btn-block btn-type-document btn btn-lg text-wrap text-left align-self-stretch"
                        :class="{ 'btn-success': 'uploaded' in docType && docType.uploaded }"
                        @click.prevent="setType(docType)" type="button">
                        <div class="d-flex align-items-center justify-content-start title-btn-document-type">
                            <i v-if="'uploaded' in docType && docType.uploaded" class="fa fa-2x fa-check pr-3"></i>
                            <i v-else class="fa fa-2x fa-info-circle pr-3"></i>
                            <div class="w-100">
                                <div class="m--font-bolder border-bottom mb-2 pb-2 ">{{ docType.name | upper }}</div>
                                <small class="description-btn-document-type">{{ docType.description }}</small>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['documents-type'],
    data() {
        return {};
    },
    mounted() {
        if (this.documentsType.length == 1) {
            this.setType(this.documentsType[0]);
        }
    },
    methods: {
        setType: function ({ id }) {
            this.$emit('set-document-type', 'docType', id);
        }
    }
};
</script>
<style>

.title-btn-document-type {
    font-size: 1.25rem;
    line-height: 1.2;
}

@media only screen and (max-width: 1024px) {
    .title-btn-document-type {
        font-size: 1.1rem;
        line-height: 1.1;
    }
    .title-btn-document-type small{
        font-size: 1rem;
    }
}
</style>