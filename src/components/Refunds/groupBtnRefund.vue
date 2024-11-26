<template>
    <div>
        <div class="m-portlet__head">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <div class="m-portlet__head-text">
                        {{ $t('reimbursement.information') }}
                    </div>
                </div>
            </div>
            <div class="m-portlet__head-tools" v-show="totalUploaded>0">
                <router-link :to="{path: urlViewDocuments}" replace class="btn btn-default">
                    {{ $t('refunds.viewLoadedDocuments') | upper }}
                </router-link>
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="row">
                <div class="col-md-6 d-flex align-items-start py-3" v-for="group in groups " :key="group.id">
                    <button  class="btn-block btn btn-type-document btn-lg text-wrap text-left align-self-stretch"
                            @click.prevent="setGroup(group)"
                            :class="[group['uploaded']==group['total']?'btn-success':'btn-default']"
                            type="button">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center justify-content-start">
                                <i  v-if="group['uploaded']==group['total']"
                                    class="fa fa-2x fa-check pr-3"
                                ></i>
                                <i  v-else
                                    class="fa fa-2x fa-info-circle pr-3 text-primary"
                                ></i>
                                <span>{{ group.name }}</span>
                            </div>
                            <span   class="pull-right badge me-2 px-1"
                                    :class ="[group['uploaded']==group['total']?'badge-secondary':'badge-primary']">
                                <span class="m-0 h5">
                                    {{ group['uploaded'] }}/{{ group['total'] }}
                                </span>
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['groups'],
    data() {
        return {};
    },
    methods: {
        setGroup: function ({id}) {
            this.$emit('set-group','docTypeGroup',id);
        }
    },
    computed: {
        urlViewDocuments: function () {
            return `/${this.$route.params.lang}/reimbursement/${this.$route.params.code}/view-documents`;
        },
        totalUploaded: function () {
            return this.groups.reduce((acc, group) => acc + (parseInt(group['uploaded'])||0), 0);
        }
    }
};
</script>