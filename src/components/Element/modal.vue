<template>
    <div id="modal_status_case" class="modal position-relative d-block" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :title="title">Modal Title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i aria-hidden="true" class="ki ki-close"></i>
                    </button>
                </div>
                <div class="modal-body" name="modal-content">
                    <slot name="content"></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Rechazar</button>
                    <button type="button" class="btn btn-primary">Aceptar caso</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import $ from '@/custom/jquery-custom';

export default {
    props: ["title"],
    mounted() {
        $(this.$el).modalCaseStatus({
            html: true,
            title: function() {
                return $(this).attr("title");
            },
            content: function() {
                return $(this)
                    .find(".modal-content")
                    .html();
            }
        });
    }
};
</script>