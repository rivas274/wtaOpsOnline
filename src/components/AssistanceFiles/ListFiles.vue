<style scoped>
.options-btn {
    display: inline-flex;
}
iframe {
    height: 360px;
    width: 100%;
    border: 0px !important;
}
</style>

<template>
    <TableBasic :show-loader="showLoader">
        <template slot="filters">
            <div class="form-group m-form__group row">
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
                    :watermark="$t('assistanceBills.referenceDescription')"
                    icon="flaticon-interface-5"
                    v-on:input="setDataFilter"
                    :value="filters.code"
                ></input-from-table>
                <div class="col m--align-right">
                    <button class="btn btn-info" @click="clear">{{$t('general.clear')}}</button>
                </div>
            </div>
        </template>
        <template slot="thead">
            <tr>
                <th>
                    ID
                </th>
                <th>
                    {{$t('document.description')}}
                </th>
                <th style="width: 90px;" v-if="computedDocument.length>0 && computedDocument[0].displayDate">
                    {{$t('assistanceBills.date.document')}}
                </th>
                <th>
                    {{$t('assistanceBills.classification')}}
                </th>
                <th>
                    {{$t('provider.provider')}}
                </th>
                <th>
                    {{$t('assistanceBills.originalAmount')}}
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
            <template v-for="bill in computedDocument">
                <tr :key="bill.idFile">
                    <td>
                        <span>{{bill.idFile}}</span>
                    </td>
                    <td>
                        <span>{{bill.description||$t('general.notLoaded')}}</span>
                    </td>
                    <td class="text-center" v-if="bill.displayDate">
                        <div>{{bill.date.date}}</div>
                        <small><b>({{bill.date.hour}})</b></small>
                    </td>
                    <td>
                        <span>{{bill.category||$t('general.notLoaded')}}</span>
                    </td>
                    <td>
                        <span>{{bill.provider.providerName||$t('general.notLoaded')}}</span>
                    </td>
                    <td>
                        <span
                            v-tooltip="'Currency '+bill.currency"
                        >{{ bill.amount | currency(bill.currency) }}</span>
                    </td>
                    <td class="text-center">
                        <span
                            class="m-badge m-badge--wide"
                            :class="[bill.color]"
                        >{{ bill.billStatusDesc }}</span>
                    </td>
                    <td class="text-center fa-status">
                        <span class="options-btn">
                            <a
                                @click="togleBill(bill)"
                                class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                            >
                                <i
                                    class="fa"
                                    :class="[bill.checkVisibility?'fa-eye-slash':'fa-eye']"
                                ></i>
                            </a>
                            <a
                                :href="download(bill)"
                                target="_blank"
                                class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                            >
                                <i class="fa fa-cloud-download-alt"></i>
                            </a>
                        </span>
                    </td>
                </tr>
                <tr :key="bill.idFile+'Iframe'"></tr>
                <tr :key="bill.idFile+'IframeShow'" v-if="bill.checkVisibility">
                    <td class="text-center" colspan="10">
                        <iframe :src="streaming(bill)"></iframe>
                    </td>
                </tr>
            </template>
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
import pagination from "../pagination/pagination.vue";
import TableBasic from "../Tables/TableBasic.vue";
export default {
    components: {
        TableBasic,
        inputFromTable,
        dateRangeBt,
        pagination
    },
    props: ["id-assist"],
    data: function() {
        return {
            assist: this.idAssist,
            filters: {
                code: "",
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
            showLoader: false,
            view: []
        };
    },
    methods: {
        getBill: function(pg) {
            pg = Number.isInteger(pg) ? pg : this.footerTable.start;
            this.showLoader = true;
            this.axios
                .post("getFiles", {
                    start: pg,
                    limit: this.footerTable.limit,
                    code: this.filters.code.trim(),
                    idAssist: this.assist,
                    endDate: this.filters.date.endDate,
                    startDate: this.filters.date.startDate
                })
                .then(response => {
                    this.showLoader = false;
                    this.results = response.data.RESPONSE.RESULTS;
                    this.footerTable = {
                        start: response.data.start,
                        limit: response.data.limit,
                        size: response.data.size
                    };
                });
        },
        setDataFilter: function(campo, value) {
            this.filters[campo] = value;
            this.getBill(0);
        },
        setDataPaginate: function(campo, value) {
            this.footerTable[campo] = value;
            this.getBill();
        },
        billStatusColor(status) {
            let colors = {
                1: "m-badge--accent",
                2: "m-badge--success",
                3: "m-badge--danger",
                4: "m-badge--warning",
                5: "m-badge--focus"
            };
            return colors[status];
        },
        togleBill: function({ idFile }) {
            let tab = this.view.filter(function(v) {
                return v == idFile;
            });
            if (tab.length == 0) {
                this.view.push(idFile);
            } else {
                this.view = this.view.filter(function(v) {
                    return v != idFile;
                });
            }
        },
        checkVisibility({ idFile }) {
            return (
                this.view.filter(function(v) {
                    return v == idFile;
                }).length != 0
            );
        },
        download({ fileName }) {
            return this.baseUrlApi() + "download/" + fileName;
        },
        streaming({ fileName }) {
            return this.baseUrlApi() + "streaming/" + fileName;
        },
        clear: function() {
            this.filters = {
                code: "",
                date: {
                    endDate: "",
                    startDate: ""
                }
            };
            this.getBill(0);
        }
    },
    computed: {
        computedDocument: function () {
            return this.results.map(value =>{
                return {
                    ...value,
                    displayDate: ('displayAuditor' in value) ? ('creation' in value.displayAuditor? value.displayAuditor.creation : true) : true,
                    checkVisibility: this.checkVisibility(value),
                    color:this.billStatusColor(value.billStatus)
                };
            });
        }
    },
    mounted() {
        this.getBill();
    }
};
</script>