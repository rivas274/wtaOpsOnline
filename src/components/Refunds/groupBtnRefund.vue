<template>
    <div>
        <div class="m-portlet__head m--hidden-mobile">
            <div class="m-portlet__head-caption">
                <div class="m-portlet__head-title">
                    <span class="m-portlet__head-icon m--hide">
                        <i class="la la-gear"></i>
                    </span>
                    <h3 class="m-portlet__head-text">
                        {{ $t('reimbursement.information') }}
                    </h3>
                </div>
            </div>
        </div>
        <div class="m-portlet__body">
            <div class="row">
                <div class="col-md-6 d-flex align-items-start py-3" v-for="group in groups " :key="group.id">
                    <button  class="btn-block btn btn-lg btn-primary text-wrap text-left align-self-stretch"
                            @click.prevent="setGroup(group)"
                            type="button">
                        <div class="d-flex align-items-center justify-content-between">
                            <span>{{ group.name }}</span>
                            <span class="pull-right badge badge-secondary">
                                <span class="m-0 h5">
                                    {{ group['total'] }}/{{ group['uploaded'] }}
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
    }
};
</script>