<template>
    <div>
        <div
            class="m-input-icon m-input-icon--left date-bt-vue"
            :id="'Search' + name"
        >
            <input
                type="text"
                :name="name"
                class="form-control m-input"
                :class="[size?'form-control-'+size:'']"
                :placeholder="watermark"
                readonly
            />
            <span class="m-input-icon__icon m-input-icon__icon--left">
                <span>
                    <i class="la la-calendar-check-o"></i>
                </span>
            </span>
        </div>
    </div>
</template>
<script>
import $ from '@/custom/jquery-custom';

export default {
    props: ["watermark", "name", "value","size"],
    mounted() {
        let _self = this;
        $(_self.$el)
            .find(".date-bt-vue")
            .daterangepicker(
                {
                    buttonClasses: "m-btn btn",
                    applyClass: "btn-primary",
                    cancelClass: "btn-secondary",
                    autoUpdateInput: false,
                    locale: {
                        format: "YYYY-MM-DD",
                        applyLabel: this.$t('general.apply'),
                        cancelLabel: this.$t('general.cancel'),
                        fromLabel: this.$t('general.from'),
                        toLabel: this.$t('general.to'),
                        customRangeLabel: this.$t('general.custom'),
                        daysOfWeek: [
                            this.$t('datePicker.daysOfWeek.su'),
                            this.$t('datePicker.daysOfWeek.mo'),
                            this.$t('datePicker.daysOfWeek.tu'),
                            this.$t('datePicker.daysOfWeek.we'),
                            this.$t('datePicker.daysOfWeek.th'),
                            this.$t('datePicker.daysOfWeek.fr'),
                            this.$t('datePicker.daysOfWeek.sa'),
                        ],
                        monthNames: [
                            this.$t('datePicker.monthNames.january'),
                            this.$t('datePicker.monthNames.february'),
                            this.$t('datePicker.monthNames.march'),
                            this.$t('datePicker.monthNames.april'),
                            this.$t('datePicker.monthNames.may'),
                            this.$t('datePicker.monthNames.june'),
                            this.$t('datePicker.monthNames.july'),
                            this.$t('datePicker.monthNames.august'),
                            this.$t('datePicker.monthNames.september'),
                            this.$t('datePicker.monthNames.october'),
                            this.$t('datePicker.monthNames.november'),
                            this.$t('datePicker.monthNames.december'),
                        ],
                    }
                },
                function (a, t) {
                    $(_self.$el)
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
            .on("cancel.daterangepicker", function () {
                $(this).val("");
            });
    },
    watch: {
        value: function (newVal) {
            $(this.$el)
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
