<style>
.table > tbody > tr > td,
.table > thead > tr > th {
    vertical-align: middle;
}
.table-responsive {
    padding: 1px;
}
</style>
<style src="../Element/custom-m-loader.css"></style>
<template>
    <div :class="{'m-loader m-loader--metal m-loader--div':loader}">
        <div class="m-form m-form--label-align-right m--margin-top-10 m--margin-bottom-20">
            <div class="row align-items-center">
                <div class="col-md-12 order-2 order-xl-1">
                    <slot name="filters"></slot>
                </div>
            </div>
        </div>
        <div class="m-section__content table-responsive">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                    <slot name="thead"></slot>
                </thead>
                <tbody>
                    <slot name="tbody"></slot>
                    <template v-if="!$slots.tbody">
                        <tr>
                            <td :colspan="$slots.thead[0].children.length" class="text-center">
                                <strong class="text-danger">No records found</strong>
                            </td>
                        </tr>
                    </template>
                </tbody>
                <tfoot v-if="$slots.tfoot">
                    <slot name="tfoot"></slot>
                </tfoot>
            </table>
            <div class="m-datatable m-datatable--default" v-if="$slots.footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["show-loader"],
    data() {
        return { loader: this.showLoader };
    },
    watch: {
        showLoader: function(newVal) {
            this.loader = newVal;
        }
    }
};
</script>
