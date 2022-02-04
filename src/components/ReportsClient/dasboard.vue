<template>
    <content-m :navigation="[{ title: $t('general.reports') }]">
        <template slot="title">{{ $t("general.reports") }}</template>
        <template slot="body">
            <h3 class="">
                {{ $t("general.reports") }}
            </h3>
            <hr />
            <div class="row">
                <div class="form-group m-form__group col-md-4">
                    <strong>{{ $t("general.reports") }}</strong>
                    <select-from-table
                        name="idReport"
                        :options="reportsAvailable"
                        :selected="filters.idReport"
                        v-on:input="setDataFilter"
                    ></select-from-table>
                </div>
                <div class="form-group m-form__group col-md-4">
                    <strong>{{ $t("general.selectDateRange") }}</strong>
                    <date-range-bt
                        class="m-form__group-sub"
                        name="date"
                        :watermark="$t('general.selectDateRange')"
                        v-on:input="setDataFilter"
                        :value="filters.date"
                    ></date-range-bt>
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

import selectFromTable from "../Tables/filters/selectFromTable.vue";
export default {
    components: {
        contentM,
        dateRangeBt,
        inputGroup,
        selectFromTable
    },
    data() {
        return {
            reportsAvailable: [],
            error: "",
            filters: {
                idReport: null,
                date: {}
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
            });
        },
        dowload: function () {
            let requiered = {
                idReport: this.filters.idReport,
                endDate: this.filters.date.endDate,
                startDate: this.filters.date.startDate
            },valid = false;

            for (var field in requiered) {
                if (requiered[field] != "") {
                    valid = true;
                }
            }

            if (!valid) {
                this.error = "Select a filter to continue";
                return false;
            } else {
                this.error = null;
            }

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
                        "download", "guardByClientXLS" + (this.filters.idReport) + ".xlsx"
                    );
                    document.body.appendChild(link);
                    link.click();
                    this.error = null;
                    this.showLoader = false;
                });
        },
    }
};
</script>