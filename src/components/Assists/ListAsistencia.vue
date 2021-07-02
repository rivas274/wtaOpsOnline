<style>
.fa-status .fa {
    font-size: 1.4rem;
}
.openAssist:hover {
    background-color: #716aca;
    color: #fff;
}
.openAssist {
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 0.75rem;
}
</style>
<template>
    <TableBasic :show-loader="showLoader">
        <template slot="filters">
            <div class="form-group m-form__group row" :class="{'has-danger':error}">
                <date-range-bt
                    class="col-md-4 m-form__group-sub"
                    name="date"
                    :watermark="$t('general.selectDateRange')"
                    v-on:input="setDataFilter"
                    :value="filters.date"
                ></date-range-bt>
                <input-from-table
                    class="col-md-4 m-form__group-sub"
                    name="code"
                    :watermark="$t('assistance.caseNumber')"
                    icon="la flaticon-interface-5"
                    v-on:input="setDataFilter"
                    :value="filters.code"
                ></input-from-table>
                <input-from-table
                    class="col-md-4 m-form__group-sub"
                    name="passager"
                    :watermark="$t('voucher.name')"
                    icon="la flaticon-avatar"
                    v-on:input="setDataFilter"
                    :value="filters.passager"
                ></input-from-table>
            </div>
            <div class="form-group m-form__group row" v-if="clients.length>1">
                <template>
                    <multi-selects
                        v-if="clients.length>1"
                        class="col-md-4 m-form__group-sub"
                        name="arrPrefix"
                        :options="clients"
                        :watermark="$t('assistance.clients')"
                        :selected="filters.arrPrefix"
                        v-on:input="setDataFilter"
                    ></multi-selects>
                </template>
            </div>
            <div class="row m--align-right">
                <div v-if="error" class="col-lg-9">
                    <div class="alert-danger alert alert-dismissible m--align-left">
                        <button type="button" class="close" @click="error=null"></button>
                        <span>{{ error }}</span>
                    </div>
                </div>
                <div class="col-lg-3" :class="{'offset-lg-9':error==null}">
                    <!-- <button class="btn btn-brand" @click="getAssistance(0)">Search</button> -->
                    <button
                        class="btn btn-primary ml-2 pull-right"
                        @click="dowload"
                        v-if="permission.RP002A||permission.RP002AB39"
                    >{{$t('general.dowload')}}</button>
                    <button class="btn btn-info ml-2 pull-right" @click="clear">{{$t('general.clear')}}</button>
                </div>
            </div>
        </template>
        <template slot="thead">
            <tr>
                <th style="min-width: 90px;">
                    {{$t('assistance.caseNumber')}}
                </th>
                <th>
                    {{$t('company.company')}}
                </th>
                <th>
                    {{$t('voucher.voucher')}}
                </th>
                <th>
                    {{$t('assistance.patientName')}}
                </th>
                <th>
                    {{$t('assistance.symptom')}}
                </th>
                <th>
                    {{$t('assistance.type')}}
                </th>
                <th style="min-width: 90px;">
                    {{$t('assistance.date.event')}}
                </th>
                <th style="min-width: 90px;" class="text-center">
                    {{$t('assistance.date.opening')}}
                </th>
                <th>
                    {{$t('general.country')}}
                </th>
                <th>
                    {{$t('general.status')}}
                </th>
                <th>
                    {{$t('general.options')}}
                </th>
            </tr>
        </template>
        <template slot="tbody">
            <tr v-for="assist in results" :key="assist.codeAssist">
                <td>
                    <span
                        class="openAssist"
                        @click.prevent="addAssist(assist)"
                    >{{assist.codeAssist}}</span>
                </td>
                <td>
                    {{assist.clientName}}
                </td>
                <td>
                    {{assist.codigo}}
                </td>
                <td v-html="assist.fisrtName+' '+assist.lastName">
                </td>
                <td>
                    {{assist.symptomDetaill}}
                </td>
                <td>
                    {{assist.descCaseType}}
                </td>
                <td class="text-center">
                    <div>{{assist.reportedDate.date}}</div>
                    <small><b>({{assist.reportedDate.hour}})</b></small>
                </td>
                <td class="text-center">
                    {{assist.registeredDate.date}}
                </td>
                <td>
                    <Flag :iso="assist.isoCountry"></Flag>
                </td>
                <td class="text-center fa-status">
                    <i :class="assist.statusAssist.icon" v-tooltip:top="assist.statusAssist.label || 'Not Found'"></i>
                </td>
                <td class="text-center fa-status">
                    <a
                        @click.prevent="addAssist(assist)"
                        class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                    >
                        <i
                            class="fa"
                            :class="[open.indexOf(assist.codeAssist)>-1?'fa-location-arrow':'fa-plus-circle']"
                        ></i>
                    </a>
                </td>
            </tr>
        </template>
        <template slot="footer">
            <pagination
                :start="footerTable.start"
                :limit="footerTable.limit"
                :size="footerTable.size"
                v-on:paginate="setDataPaginate"
            ></pagination>
        </template>
    </TableBasic>
</template>
<script>
import dateRangeBt from "../Tables/filters/dateRangeBt.vue";
import inputFromTable from "../Tables/filters/inputFromTable.vue";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import pagination from "../pagination/pagination.vue";
import Flag from "../Element/Flag.vue";
import TableBasic from "../Tables/TableBasic.vue";
import MultiSelects from "../Tables/filters/Multiselect.vue";
export default {
    components: {
        TableBasic,
        inputFromTable,
        selectFromTable,
        dateRangeBt,
        pagination,
        Flag,
        MultiSelects
    },
    props: ["open-asist"],
    data: function() {
        var permission = {
            bills: this.middleware("bills", "read"),
            RP002A: this.middleware("RP002A", "read"),
            RP002AB39: this.middleware("RP002A-B39", "read")
        };
        return {
            permission: permission,
            error: null,
            filters: {
                code: "",
                /* billExists: permission.bills?"Y":"", */
                arrPrefix: [],
                passager: "",
                date: {
                    endDate: "",
                    startDate: ""
                }
            },
            results: [],
            footerTable: {
                start: 0,
                limit: 15,
                size: 0
            },
            clients: [],
            billsOption: [
                {
                    id: "",
                    name: "All Assistance",
                    icon: "fa fa-money-bill"
                },
                {
                    id: "Y",
                    name: "Assistance with audited invoices.",
                    icon: "fa fa-money-bill"
                },
                {
                    id: "N",
                    name: "Assistance without audited invoices.",
                    icon: "fa fa-money-bill"
                }
            ],
            open: [],
            showLoader: false
        };
    },
    methods: {
        dowload: function() {
            let arrPrefix =
                this.filters.arrPrefix.length == 0
                    ? this.$session.get("prefix")
                    : this.filters.arrPrefix;
            let requiered = {
                    code: this.filters.code.trim(),
                    passenger: this.filters.passager.trim(),
                    endDate: this.filters.date.endDate,
                    startDate: this.filters.date.startDate
                },
                valid = false;
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
            requiered["prefix"] = arrPrefix;
            this.showLoader = true;
            this.axios
                .post(
                    this.permission.RP002AB39
                        ? "getAssistsNotReservationXLS"
                        : "getAssistsXLS",
                    {
                        prefix: arrPrefix,
                        /* billExists: this.filters.billExists, */
                        code: this.filters.code.trim(),
                        passenger: this.filters.passager.trim(),
                        endDate: this.filters.date.endDate,
                        startDate: this.filters.date.startDate
                    },
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
                        "download",
                        this.permission.RP002AB39
                            ? "RP002A-B39.xlsx"
                            : "RP002A.xlsx"
                    );
                    document.body.appendChild(link);
                    link.click();
                    this.error = null;
                    this.showLoader = false;
                });
        },
        getAssistance: function(pg) {
            let arrPrefix =
                this.filters.arrPrefix.length == 0
                    ? this.$session.get("prefix")
                    : this.filters.arrPrefix;
            pg = Number.isInteger(pg) ? pg : this.footerTable.start;
            this.showLoader = true;
            this.error = null;
            this.axios
                .post("getAssistance", {
                    start: pg,
                    limit: this.footerTable.limit,
                    prefix: arrPrefix,
                    /* billExists: this.filters.billExists, */
                    code: this.filters.code.trim(),
                    passenger: this.filters.passager.trim(),
                    endDate: this.filters.date.endDate,
                    startDate: this.filters.date.startDate
                })
                .then(response => {
                    this.showLoader = false;
                    this.results = response.data.RESPONSE.RESULTS;
                    this.footerTable = {
                        start: response.data.RESPONSE.start,
                        limit: response.data.RESPONSE.limit,
                        size: response.data.RESPONSE.size
                    };
                });
        },
        getClients: function() {
            this.axios
                .post("getClient", {
                    prefix: this.$session.get("prefix")
                })
                .then(response => {
                    let data = response.data.RESPONSE.RESULTS;
                    this.clients = data.map(function(value) {
                        return { name: value.clientName, code: value.prefix };
                    });
                });
        },
        setDataFilter: function(campo, value) {
            this.filters[campo] = value;
            this.getAssistance(0);
        },
        setDataPaginate: function(campo, value) {
            this.footerTable[campo] = value;
            this.getAssistance();
        },
        addAssist: function(assist) {
            this.$emit("addAssist", assist);
        },
        clear: function() {
            this.filters = {
                code: "",
                /* billExists: "", */
                arrPrefix: [],
                passager: "",
                date: {
                    endDate: "",
                    startDate: ""
                }
            };
            this.getAssistance(0);
        }
    },
    mounted() {
        this.getAssistance();
        this.getClients();
    },
    watch: {
        openAsist: function(newVal) {
            this.open = (newVal || []).map(function(value) {
                return value.codeAssist;
            });
        }
    }
};
</script>