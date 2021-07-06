<template>
    <div class="m-input-icon m-input-icon--left date-bt-vue" :id="'Search'+name">
        <input
            type="text"
            :name="name"
            class="form-control m-input"
            :placeholder="watermark"
            readonly
        />
        <span class="m-input-icon__icon m-input-icon__icon--left">
            <span>
                <i class="la la-calendar-check-o"></i>
            </span>
        </span>
    </div>
</template>

<script>
export default {
    props: ["watermark", "name", "value"],
    mounted() {
        let _self = this;
        window.$(_self.$el)
            .find(".date-bt-vue")
            .daterangepicker(
                {
                    buttonClasses: "m-btn btn",
                    applyClass: "btn-primary",
                    cancelClass: "btn-secondary",
                    autoUpdateInput: false,
                    locale: {
                        format: "YYYY-MM-DD",
                        cancelLabel: this.$t('general.clear')
                    }
                },
                function(a, t) {
                    window.$(_self.$el)
                        .find(".form-control")
                        .val(
                            a.format("YYYY-MM-DD") +
                                " / " +
                                t.format("YYYY-MM-DD")
                        );
                    _self.$emit("input", _self.name, {
                        endDate: t.format("YYYY-MM-DD"),
                        startDate: a.format("YYYY-MM-DD")
                    });
                }
            )
            .on("cancel.daterangepicker", function(ev) {
                window.$(this).val("");
            });
    },
    watch: {
        value: function(newVal) {
            window.$(this.$el)
                .find(".form-control")
                .val(
                    newVal.startDate +
                        (newVal.startDate ? " / " : "") +
                        newVal.endDate
                );
        }
    }
};
</script>