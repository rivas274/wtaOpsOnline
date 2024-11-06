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
            <div class="row" :class="{'has-danger':error}">
                <date-range-bt
                    :key="`date-${selectTableKey}-${$i18n.locale}`"
                    class="col-md-4 form-group"
                    name="date"
                    :watermark="$t('general.selectDateRange')"
                    v-on:input="setDataFilter"
                    :value="filters.date"
                ></date-range-bt>
                <input-from-table
                    class="col-md-4 form-group"
                    name="code"
                    :watermark="$t('assistance.caseNumber')"
                    icon="la fi-rr-life-ring"
                    v-on:input="setDataFilter"
                    :value="filters.code"
                ></input-from-table>
                <input-from-table
                    class="col-md-4 form-group"
                    name="codeVoucher"
                    :watermark="$t('voucher.voucher')"
                    icon="la fi-rr-ballot"
                    v-on:input="setDataFilter"
                    :value="filters.codeVoucher"
                ></input-from-table>
                <input-from-table
                    class="col-md-4 form-group"
                    name="passager"
                    :watermark="$t('voucher.name')"
                    icon="fa fa-user"
                    v-on:input="setDataFilter"
                    :value="filters.passager"
                ></input-from-table>
                <input-from-table
                    class="col-md-4 form-group"
                    name="passport"
                    :watermark="$t('general.passport')"
                    icon="fa fa-address-card"
                    v-on:input="setDataFilter"
                    :value="filters.passport"
                ></input-from-table>
                <date-single-bt
                    :key="`dob-${selectTableKey}-${$i18n.locale}`"
                    class="col-md-4 form-group"
                    name="dob"
                    :watermark="$t('general.dateOfBirth')"
                    v-on:input="setDataFilter"
                    :value="filters.dob"
                ></date-single-bt>
                <multi-selects
                    v-if="typeAssist.length>1"
                    class="col-md-4 form-group"
                    name="typeAssist"
                    :options="typeAssist"
                    :watermark="$t('assistance.typeAssistance')"
                    :selected="filters.typeAssist"
                    v-on:input="setDataFilter"
                ></multi-selects>
                <select-from-table
                    :key="`assistStatus-${selectTableKey}-${$i18n.locale}`"
                    class="col-md-4 form-group"
                    name="assistStatus"
                    :watermark="$t('general.status')"
                    :options="arrAssistStatus"
                    :selected="filters.assistStatus"
                    v-on:input="setDataFilter"
                ></select-from-table>
                <multi-selects
                    v-if="clients.length>1"
                    class="col-md-4 form-group"
                    name="arrPrefix"
                    :options="clients"
                    :watermark="$t('assistance.clients')"
                    :selected="filters.arrPrefix"
                    v-on:input="setDataFilter"
                ></multi-selects>
                <select-from-table
                    :key="`managementStatus-${selectTableKey}-${$i18n.locale}`"
                    v-if="arrManagementStatus.length>1"
                    class="col-md-4 form-group"
                    name="managementStatus"
                    :watermark="$t('assistance.managementStatus')"
                    :options="arrManagementStatus"
                    :selected="filters.managementStatus"
                    v-on:input="setDataFilter"
                ></select-from-table>
               
            </div>
            <div class="row m--align-right">
                <div v-if="error" class="col-lg-9">
                    <div class="alert-danger alert alert-dismissible m--align-left">
                        <button type="button" class="close" @click="error=null"></button>
                        <span>{{ error }}</span>
                    </div>
                </div>
                <div class="col-lg-4 d-flex bd-highlight" :class="{'offset-lg-8':error==null}">
                    <button class="btn btn-primary ml-2 flex-fill bd-highlight"
                            @click="getAssistance(0)">
                        {{$t('general.search')}}
                    </button>
                    <button class="btn btn-outline-info ml-2 flex-fill bd-highlight"
                            @click="clear">
                        {{$t('general.clear')}}
                    </button>
                    <button
                        class="btn btn-outline-focus ml-2 flex-fill bd-highlight"
                        @click="download"
                        v-if="permission.RP002A">
                        {{$t('general.download')}}
                    </button>
                </div>
            </div>
        </template>
        <template slot="thead">
            <tr>
                <th style="min-width: 100px;">
                    {{$t('assistance.caseNumber')}}
                </th>
                <th v-if="!permission.hidden_client">
                    {{$t('company.company')}}
                </th>
                <th  v-if="!permission.hidden_client">
                    {{$t('voucher.voucher')}}
                </th>
                <th>
                    {{$t('assistance.patientName')}}
                </th>
                <th>
                    {{$t('voucher.source')}}
                </th>
                <th>
                    {{$t('assistance.symptom')}}
                </th>
                <th>
                    {{$t('assistance.typeAssistance')}}
                </th>
                <th v-if="permission.show_provider">
                    {{$t('assistance.typeService')}}
                </th>
                <th style="min-width: 90px;"  class="text-center">
                    {{$t('assistance.date.event')}}
                </th>
                <th style="min-width: 90px;" class="text-center">
                    {{$t('assistance.date.opening')}}
                </th>
                <th>
                    {{$t('voucher.travelSource')}}
                </th>
                <th>
                    {{$t('assistance.countryService')}}
                </th>
                <th  v-if="permission.show_provider">
                    {{$t('assistance.managementStatus')}}
                </th>
                <th>
                    {{$t('general.options')}}
                </th>
            </tr>
        </template>
        <template slot="tbody">
            <tr v-for="assist in arrAssistance" :key="assist.codeAssist">
                <td>
                    <span
                        class="openAssist"
                        :class="[assist['view'] == 'N' ?'m--font-bolder':'']"
                        @click.prevent="addAssist(assist)"
                    >{{assist.codeAssist}}</span>
                </td>
                <td  v-if="!permission.hidden_client">
                    {{assist.clientName}}
                </td>
                <td  v-if="!permission.hidden_client">
                    {{assist.codigo}}
                </td>
                <td v-html="assist.firstName+' '+assist.lastName">
                </td>
                <td>
                    {{assist.origin}}
                </td>
                <td>
                    {{assist.symptomDetaill}}
                </td>
                <td>
                    <div>{{assist.descAssistanceType}} </div>
                    <div v-if="permission.triage && assist.triage.label">
                        <small :class="['m--font-bolder m--font-' + assist.triage.color]" >
                            Triaje | {{assist.triage.label}}
                        </small>
                    </div>
                </td>
                <td v-if="permission.show_provider">
                    {{assist.speciality_location}}
                </td>
                <td class="text-center">
                    <div>{{assist.reportedDate.date}}</div>
                    <small><b>({{assist.reportedDate.hour}})</b></small>
                </td>
                <td class="text-center">
                    {{assist.registeredDate.date}}
                </td>
                <td>
                    <Flag :iso="assist.isoCountrySource"></Flag>
                </td>
                <td>
                    <Flag :iso="assist.isoCountry"></Flag>
                </td>
                <td class="text-center fa-status" v-if="permission.show_provider">
                    <span>{{$t(assist.managementStatusProvider)}}</span>
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
                v-if="footerTable.size>footerTable.limit"
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
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";
export default {
    components: {
        TableBasic,
        inputFromTable,
        selectFromTable,
        dateRangeBt,
        pagination,
        Flag,
        MultiSelects,
        dateSingleBt
    },
    props: ["open-asist"],
    updated() {
    if (this.$i18n.locale !== this.previousLocale) {
        this.previousLocale = this.$i18n.locale;
        this.selectTableKey += 1;
        this.getAssistance();
        this.getAssistManagementStatus();
        this.getAssistStatus();
        this.getAssistType();
    }
},
    data: function() {
        const permission = {
            bills: this.middleware("bills", "read"),
            RP002A: this.middleware("RP002A", "read"),
            hidden_client: this.middleware("hidden_client_in_assistance", "read"),
            show_provider: this.middleware("show_provider", "read"),
            triage: this.middleware("triage", "read"),
        };
        return {
            permission: permission,
            error: null,
            selectTableKey: 0,
            filters: {
                code: "",
                codeVoucher: "",
                dob: "",
                arrAssistStatus: "",
                arrManagementStatus: "",
                arrPrefix: [],
                passager: "",
                typeAssist: [],
                passport: "",
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
            arrAssistStatus:[],
            arrManagementStatus:[],
            statusAssist:[],
            clients: [],
            typeAssist:[],
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
            showLoader: false,
            previousLocale: this.$i18n.locale
        };
    },
    methods: {
        getAssistStatus: function () {
            let list_provider = this.permission.show_provider ? 1 : 0;
            this.axios.get("getAssistStatus?provider="+list_provider).then(response => {
                this.arrAssistStatus = response.data.RESPONSE.RESULTS;
            });
        },
        getAssistManagementStatus: function () {
            if(!this.permission.show_provider){
                return false;
            }
            this.axios.get("getAssistManagementStatus").then(response => {
                this.arrManagementStatus = response.data.RESPONSE.RESULTS;
            });
        },
        download: function () {
            let arrPrefix =
                this.filters.arrPrefix.length == 0
                    ? this.$session.get("prefix")
                    : this.filters.arrPrefix;
            let paramsSearch = {
                    code: (this.filters.code || '').trim(),
                    codeVoucher: (this.filters.codeVoucher || '').trim(),
                    passenger: (this.filters.passager || '').trim(),
                    dob: (this.filters.dob || '').trim(),
                    endDate: this.filters.date.endDate,
                    startDate: this.filters.date.startDate,
                    typeAssist: this.filters.typeAssist,
                    passport: this.filters.passport,
                },
                valid = false,
                type = this.$session.get("permission")['RP002A']['additional_data'];

            for (let field in paramsSearch) {
                if (paramsSearch[field] != "") {
                    valid = true;
                }
            }
            if (!valid) {
                this.error = "Select a filter to continue";
                return false;
            } else {
                this.error = null;
            }

            paramsSearch["prefix"] = arrPrefix;
            paramsSearch["type"] = type;

            this.showLoader = true;
            this.axios
                .post("getAssistsCustomXLS",
                    paramsSearch,
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
                        type + '.xlsx'
                    );
                    document.body.appendChild(link);
                    link.click();
                    this.error = null;
                    this.showLoader = false;
                });
        },
        getAssistance: function(pg,showTotal) {
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
                    code: (this.filters.code||'').trim(),
                    codeVoucher: (this.filters.codeVoucher||'').trim(),
                    dob: (this.filters.dob||'').trim(),
                    assistStatus: this.filters.assistStatus,
                    managementStatus: this.filters.managementStatus,
                    passenger: (this.filters.passager||'').trim(),
                    endDate: this.filters.date.endDate,
                    startDate: this.filters.date.startDate,
                    typeAssist:this.filters.typeAssist,
                    passport:this.filters.passport,
                    showTotal: showTotal==true?0:1
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
            if(this.permission.show_provider){
                return false;
            }
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
        getAssistType: function() {
            if(this.permission.show_provider){
                return false;
            }
            this.axios
                .get("getAssistType")
                .then(response => {
                    let data = response.data.RESPONSE;
                    this.typeAssist = data.map(function(value) {
                        return { name: value.name, code: value.id };
                    });
                });
        },
        setDataFilter: function(campo, value) {
            this.filters[campo] = value;
        },
        setDataPaginate: function(campo, value) {
            this.footerTable[campo] = value;
            this.getAssistance();
        },
        addAssist: function (assist) {
            assist['view'] = 'Y';
            this.$emit("addAssist", assist);
        },
        clear: function() {
            this.filters = {
                code: "",
                codeVoucher: "",
                dob: "",
                arrAssistStatus: "",
                arrManagementStatus: "",
                arrPrefix: [],
                passager: "",
                typeAssist: [],
                passport: "",
                date: {
                    endDate: "",
                    startDate: ""
                }
            };
            this.getAssistance(0,false);
        }
    },
    mounted() {
        this.getClients();
        this.getAssistStatus();
        this.getAssistManagementStatus();
        this.getAssistType();
        this.getAssistance(0,this.middleware("no_load_pages_init_assist", "read"));
    },
    computed: {
        arrAssistance: function () {
            const self = this;
            return this.results.map(function (assist) {
                let extra = {};
                if (self.permission.show_provider) {
                    let managementStatus = '';
                    if (assist['assignedToAssistance'] == 'N') {
                        managementStatus = 'assistance.administrative';
                    } else if (assist['view'] == 'N' && assist['approved_status'] == 1) {
                        managementStatus = 'assistance.requestSent';
                    } else if (assist['view'] != 'N' && assist['approved_status'] == 1) {
                        managementStatus = 'assistance.openRequest';
                    } else if (assist['approved_status'] == 2) {
                        managementStatus = 'assistance.applicationProcess';
                    } else if (assist['approved_status'] == 3) {
                        managementStatus = 'assistance.applicationCompleted';
                    } else if (assist['approved_status'] == 4) {
                        managementStatus = 'assistance.requestRejected';
                    } else if (assist['approved_status'] == 5) {
                        managementStatus = 'assistance.relatedCase';
                    }
                    if (managementStatus) {
                        extra['managementStatusProvider'] = managementStatus;
                    }
                }
                return {
                    ...assist,
                    ...extra
                };
            });
        }
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