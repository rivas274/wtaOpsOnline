<style scoped>
.fa-status .fa {
    font-size: 1.4rem;
}
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
                    watermark="Select date range"
                    v-on:input="setDataFilter"
                    :value="filters.date"
                ></date-range-bt>
                <input-from-table
                    class="col-md-4 m-form__group-sub"
                    name="code"
                    watermark="Reference / Description"
                    icon="flaticon-interface-5"
                    v-on:input="setDataFilter"
                    :value="filters.code"
                ></input-from-table>
                <div class="col m--align-right">
                    <button class="btn btn-info" @click="clear">Clear</button>
                </div>
            </div>
        </template>
        <template slot="thead">
            <tr>
                <th>
                    <span>ID</span>
                </th>
                <th>
                    <span>Reference</span>
                </th>
                <th>
                    <span>Category</span>
                </th>
                <th style="min-width: 90px;">
                    <span>Bill Date</span>
                </th>
                <th>
                    <span>Case</span>
                </th>
                <th>
                    <span>Voucher</span>
                </th>
                <th>
                    <span>Original Amount</span>
                </th>
                <th>
                    <span>Exchange Rate</span>
                </th>
                <th>
                    <span>Amount USD</span>
                </th>
                <th>
                    <span>Bill Status</span>
                </th>
                <th>
                    <span>Options</span>
                </th>
            </tr>
        </template>
        <template slot="tbody">
            <template v-for="invoice in results">
                <tr :key="invoice.idFile">
                    <td>
                        <span>{{invoice.idFile}}</span>
                    </td>
                    <td>
                        <span v-html="invoice.reference||$t('general.notLoaded')"></span>
                    </td>
                    <td>
                        <span v-html="invoice.category||$t('general.notLoaded')"></span>
                    </td>
                    <td>
                        <span>{{invoice.billDate||$t('general.notLoaded')}}</span>
                    </td>
                    <td>
                        <span>{{invoice.assist.codigo||$t('general.notLoaded')}}</span>
                    </td>
                    <td>
                        <span>{{invoice.assist.voucher||$t('general.notLoaded')}}</span>
                    </td>
                    <td>
                        <span
                            v-tooltip="'Currency '+invoice.currency"
                        >{{ invoice.originalAmount | currency(invoice.currency) }}</span>
                    </td>
                    <td>
                        <span>{{ invoice.exchangeRate | toFixed(4) }}</span>
                    </td>
                    <td>
                        <span v-tooltip="'Currency USD'">{{ invoice.usdAmount | currency("USD") }}</span>
                    </td>
                    <td class="text-center">
                        <span
                            class="m-badge m-badge--wide"
                            :class="[billStatusColor(invoice.billStatus)]"
                        >{{ invoice.billStatusDesc }}</span>
                    </td>
                    <td class="text-center fa-status">
                        <span class="options-btn">
                            <a
                                @click.prevent="addinvoice(invoice)"
                                class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                            >
                                <i
                                    class="fa"
                                    :class="[open.indexOf(invoice.idFile)>-1?'fa-location-arrow':'fa-plus-circle']"
                                ></i>
                            </a>
                            <a
                                @click="togleBill(invoice)"
                                class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                            >
                                <i
                                    class="fa"
                                    :class="[checkVisibility(invoice)?'fa-eye-slash':'fa-eye']"
                                ></i>
                            </a>
                            <a
                                :href="download(invoice)"
                                target="_blank"
                                class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                            >
                                <i class="fa fa-cloud-download-alt"></i>
                            </a>
                        </span>
                    </td>
                </tr>
                <tr :key="invoice.idFile+'Iframe'"></tr>
                <tr :key="invoice.idFile+'IframeShow'">
                    <td class="text-center" colspan="11" v-if="checkVisibility(invoice)">
                        <iframe :src="streaming(invoice)"></iframe>
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
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import pagination from "../pagination/pagination.vue";
import Flag from "../Element/Flag.vue";
import TableBasic from "../Tables/TableBasic.vue";
export default {
    components: {
        TableBasic,
        inputFromTable,
        selectFromTable,
        dateRangeBt,
        pagination,
        Flag
    },
    props: ["open-invoice"],
    data: function() {
        return {
            error: null,
            documentsType: [],
            open: [],
            showLoader: false,
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
            view: []
        };
    },
    methods: {
        getDocumentsType: function() {
            this.axios
                .get("getDocumentsType?docType[]=4&docType[]=5&docType[]=8")
                .then(response => {
                    this.documentsType = [
                        { id: "", name: "Select Category" }
                    ].concat(response.data.RESPONSE.RESULTS);
                });
        },
        getinvoice: function(pg) {
            pg = Number.isInteger(pg) ? pg : this.footerTable.start;
            this.showLoader = true;
            this.axios
                .post("getBill", {
                    start: pg,
                    limit: this.footerTable.limit,
                    code: this.filters.code.trim(),
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
        setDataFilter: function(campo, value) {
            this.filters[campo] = value;
            this.getinvoice(0);
        },
        setDataPaginate: function(campo, value) {
            this.footerTable[campo] = value;
            this.getinvoice();
        },
        addinvoice: function(invoice) {
            this.$emit("addInvoice", invoice);
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
            this.getinvoice(0);
        }
    },
    mounted() {
        this.getinvoice();
        this.getDocumentsType();
    },
    computed: {
        docType: function() {
            return this.documentsType.reduce(function(m, e) {
                m[e.idFile] = e.name;
                return m;
            }, {});
        }
    },
    watch: {
        openInvoice: function(newVal) {
            window.console.log(newVal);
            this.open = (newVal || []).map(function(value) {
                return value.idFile;
            });
        }
    }
};
</script>