<template>
    <div>
        <div class="m-input-icon m-input-icon--left" :id="'Search' + name">
            <input type="text" :name="name" :value="value" class="form-control m-input date-bt-vue"
                :class="[size ? 'form-control-' + size : '']" :placeholder="watermark" readonly />
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
    props: ["watermark", "name", "value", "size"],
    mounted() {
        let _self = this;

        // Define la configuración del idioma personalizado
        $.fn.datetimepicker.dates['en'] = {
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
            daysMin: [

                this.$t('datePicker.daysOfWeek.su'),
                this.$t('datePicker.daysOfWeek.mo'),
                this.$t('datePicker.daysOfWeek.tu'),
                this.$t('datePicker.daysOfWeek.we'),
                this.$t('datePicker.daysOfWeek.th'),
                this.$t('datePicker.daysOfWeek.fr'),
                this.$t('datePicker.daysOfWeek.sa')
            ],
            months: [
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
                this.$t('datePicker.monthNames.december')
            ],
            monthsShort: [
                this.$t('datePicker.monthshortNames.january'),
                this.$t('datePicker.monthshortNames.february'),
                this.$t('datePicker.monthshortNames.march'),
                this.$t('datePicker.monthshortNames.april'),
                this.$t('datePicker.monthshortNames.may'),
                this.$t('datePicker.monthshortNames.june'),
                this.$t('datePicker.monthshortNames.july'),
                this.$t('datePicker.monthshortNames.august'),
                this.$t('datePicker.monthshortNames.september'),
                this.$t('datePicker.monthshortNames.october'),
                this.$t('datePicker.monthshortNames.november'),
                this.$t('datePicker.monthshortNames.december')
            ],
            today: "Hoy",
            clear: "Limpiar",
            format: "yyyy-mm-dd",
            titleFormat: "yyyy-mm-dd",
            weekStart: 1,
            meridiem: ["AM", "PM"]
        };

        // Inicializa el datetimepicker con la configuración de idioma
        $(_self.$el)
            .find(".date-bt-vue")
            .datetimepicker({
                format: "yyyy-mm-dd",
                todayHighlight: true,
                autoclose: true,
                startView: 2,
                minView: 2,
                forceParse: 0,
                pickerPosition: "bottom-left"
            })
            .change(function () {
                _self.$emit("input", _self.name, $(this).val());
            });
    },
    watch: {
        value: function (newVal) {
            $(this.$el).val(newVal);
        }
    }
};
</script>
