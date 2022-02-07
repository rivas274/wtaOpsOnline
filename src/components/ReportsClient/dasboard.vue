<template>
    <content-m :navigation="[{ title: $t('general.reports') }]"  :class="{'m-loader m-loader--metal m-loader--div':showLoader}">
        <template slot="title">{{ $t("general.reports") }}</template>
        <template slot="body">
            <h3 class="">
                {{ $t("general.reports") }}
            </h3>
            <hr />
            <div class="row">
                <div class="form-group m-form__group col-md-4" :class="{'has-danger': errors.has('idReport')}">
                    <strong>{{ $t("general.reports") }}</strong>
                    <select-from-table
                        name="idReport"
                        v-validate="'required'"
                        :data-vv-as="$t('general.reports')"
                        :options="reportsAvailable"
                        :selected="filters.idReport"
                        v-on:input="setDataFilter"
                    ></select-from-table>
                    <form-error
                        :attribute_name="'idReport'"
                        :errors_form="errors"
                    ></form-error>
                </div>
                <div class="form-group m-form__group col-md-4"  :class="{'has-danger': errors.has('startDate') ||  errors.has('endDate')}">
                    <strong>{{ $t("general.selectDateRange") }}</strong>
                    <date-range-bt
                        class="m-form__group-sub"
                        name="date"
                        v-validate="'required'"
                        :watermark="$t('general.selectDateRange')"
                        v-on:input="setDataFilter"
                        :value="filters.date"
                    ></date-range-bt>
                    <input  type="hidden"
                            name="startDate"
                            :data-vv-as="$t('general.dateRange')"
                            :value="filters.date.startDate"
                            v-validate="'required|date_format:yyyy-MM-dd'">
                    <form-error
                        class="mr-2"
                        :attribute_name="'startDate'"
                        :errors_form="errors"
                    ></form-error>
                </div>
                <div class="col m--align-right">
                    <button
                        class="btn btn-primary ml-2 pull-right"
                        @click="dowload"
                    >
                        {{ $t("general.dowload") }}
                    </button>
                    <button class="btn btn-info" @click="clear">
                        {{ $t("general.clear") }}
                    </button>
                </div>
            </div>
        </template>
    </content-m>
</template>
<script>
import contentM from "../Content.vue";
import dateRangeBt from "../Tables/filters/dateRangeBt.vue";
import inputGroup from "../Tables/filters/inputGroup.vue";
import FormError from "../FormError";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
export default {
    components: {
        contentM,
        dateRangeBt,
        inputGroup,
        selectFromTable,
        FormError
    },
    data() {
        return {
            reportsAvailable: [],
            showLoader:false,
            filters: {
                idReport: null,
                date: {
                    startDate:null,
                    endDate:null
                }
            }
        };
    },
    mounted() {
        if (!this.middleware("guard_by_client", "read")) {
            this.$router.push("http404");
        }
        this.getDocumentsType();
    },
    methods: {
        setDataFilter: function (campo, value) {
            this.filters[campo] = value;
        },
        clear: function () {
            this.filters = {
                idReport: null,
                date: {}
            };
        },
        getDocumentsType: function () {
            this.axios.post("getNameReportsGuard", {
                id: this.$session.get("permission")['guard_by_client']['additional_data']
            }).then(response => {
                this.reportsAvailable = response.data.RESPONSE.RESULTS;
                if(this.reportsAvailable.length==1){
                    this.filters.idReport=this.reportsAvailable[0].id;
                }
                
            });
        },
        dowload: function () {
            let requiered = {
                idReport: this.filters.idReport,
                endDate: this.filters.date.endDate,
                startDate: this.filters.date.startDate
            };
            this.$validator.validateAll().then(result => {
                if(result){
                    this.showLoader = true;
                    this.axios
                        .post("guardByClientXLS",
                            requiered,
                            {
                                responseType: "blob"
                            }
                        )
                        .then(response => {
                            const url = window.URL.createObjectURL(
                                new Blob([response.data])
                            );
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute(
                                "download", "guard_By_Client_" + (this.filters.idReport) + ".xlsx"
                            );
                            document.body.appendChild(link);
                            link.click();
                            this.showLoader = false;
                        });
                }
            });
        },
    }
};
</script>