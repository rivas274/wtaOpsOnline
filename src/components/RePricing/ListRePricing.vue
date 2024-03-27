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
                <input-from-table
                    class="col-md-4 m-form__group-sub"
                    name="codeAssist"
                    :watermark="$t('assistance.caseNumber')"
                    icon="la flaticon-interface-5"
                    v-on:input="setDataFilter"
                    :value="filters.codeAssist"
                ></input-from-table>
                <input-from-table
                    class="col-md-4 m-form__group-sub"
                    name="codeVoucher"
                    :watermark="$t('voucher.voucher')"
                    icon="la flaticon-interface-5"
                    v-on:input="setDataFilter"
                    :value="filters.codeVoucher"
                ></input-from-table>
                <date-range-bt
                    class="col-md-4 m-form__group-sub"
                    name="date"
                    :watermark="$t('general.selectDateRange')"
                    v-on:input="setDataFilter"
                    :value="filters.date"
                ></date-range-bt>
            </div>
            <div class="form-group m-form__group row" :class="{'has-danger':error}">
                <select-from-table
                    name="docType"
                    class="col-md-4 m-form__group-sub"
                    :watermark="$t('document.category')"
                    :options="documentsType"
                    :selected="filters.docType"
                    v-on:input="setDataFilter"
                ></select-from-table>
                <input-from-table
                    class="col-md-4 m-form__group-sub"
                    name="passager"
                    :watermark="$t('voucher.name')"
                    icon="la flaticon-avatar"
                    v-on:input="setDataFilter"
                    :value="filters.passager"
                ></input-from-table>
                <input-from-table
                    class="col-md-4 m-form__group-sub"
                    name="provider"
                    :watermark="$t('invoice.invoiceProvider')"
                    icon="la flaticon-avatar"
                    v-on:input="setDataFilter"
                    :value="filters.provider"
                ></input-from-table>
            </div>
            <div class="form-group m-form__group row" :class="{'has-danger':error}">
                <input-from-table
                    class="col-md-4 m-form__group-sub"
                    name="amount"
                    :watermark="$t('document.amount')"
                    icon="la flaticon-coins"
                    v-on:input="setDataFilter"
                    :value="filters.amount"
                ></input-from-table>
                <select-from-table
                    name="status"
                    class="col-md-4 m-form__group-sub"
                    :watermark="$t('general.status')"
                    :options="arrStatus"
                    :selected="filters.status"
                    v-on:input="setDataFilter"
                ></select-from-table>
            </div>
            <div class="row m--align-right">
                <div v-if="error" class="col-md-9">
                    <div class="alert-danger alert alert-dismissible m--align-left">
                        <button type="button" class="close" @click="error=null"></button>
                        <span>{{ error }}</span>
                    </div>
                </div>
                <div class="col-md-3" :class="{'offset-md-9':error==null}">
                    <button class="btn btn-outline-info ml-2 pull-right" @click="clear">{{$t('general.clear')}}</button>
                </div>
            </div>
        </template>
        <template slot="thead">
            <tr>
                <th>
                    {{$t('voucher.voucher')}}
                </th>
                <th>
                    {{$t('assistance.caseNumber')}}
                </th>
                <th>
                    {{$t('voucher.name')}}
                </th>
                <th>
                    {{$t('general.date')}}
                </th>
                <th>
                    {{$t('invoice.invoiceAmount')}}
                </th>
                <th>
                    {{$t('assistanceBills.classification')}}
                </th>
                <th>
                    {{$t('invoice.invoiceProvider')}}
                </th>
                <th>
                    {{$t('general.status')}}
                </th>
                <th style="width: 50px;">
                    {{$t('general.options')}}
                </th>
            </tr>
        </template>
        <template slot="tbody">
            <tr v-for="rePricing in results" :key="rePricing.id">
                <td>
                    <span>{{ rePricing[0].assist.codigo }}</span>
                </td>
                <td>
                    <span>{{ rePricing[0].assist.codigo }}</span>
                </td>
                <td>
                    <span v-html="rePricing[0].passenger.firstName+' '+rePricing[0].passenger.lastName"></span>
                </td>
                <td>
                    <span>{{ rePricing[0].repricingDate }}</span>
                </td>
                <td>
                    <span>{{ (rePricing[0].invoice.amount) ? rePricing[0].invoice.amount+' '+rePricing[0].invoice.currency : '' }}</span>
                </td>
                <td>
                    <span>{{ docType[rePricing[0].invoice.docType]||$t('general.notLoaded') }}</span>
                </td>
                <td>
                    <span>{{ rePricing[0].InvoiceProvider.providerName }}</span>
                </td>
                <td>
                    <b
                        class="m-badge m-badge--wide"
                        :class="[' m-badge--'+rePricing[0].status.color]"
                    >{{rePricing[0].status.label}}</b>
                </td>
                <td class="text-center fa-status">
                    <a
                        @click.prevent="addRePricing(rePricing[0])"
                        class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                    >
                        <i
                            class="fa"
                            :class="[open.indexOf(rePricing[0].id)>-1?'fa-location-arrow':'fa-plus-circle']"
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
export default {
    components: {
        TableBasic,
        inputFromTable,
        selectFromTable,
        dateRangeBt,
        pagination,
        Flag
    },
    props: ["open-asist"],
    data: function() {
        return {
            permission: {
                bills: this.middleware("bills", "read"),
            },
            error: null,
            documentsType: [],
            arrStatus: [
                { id: "", name: this.$t('general.status') },
                { id: 1, name: this.$t('rePricing.staus.noProvider')},
                { id: 2, name: this.$t('rePricing.staus.selected')},
                { id: 3, name: this.$t('rePricing.staus.providerIn')},
                { id: 4, name: this.$t('rePricing.staus.inProcess')},
                { id: 5, name: this.$t('rePricing.staus.updated')},
                { id: 6, name: this.$t('rePricing.staus.invoiced')},
                { id: 7, name: this.$t('rePricing.staus.completed')},
                { id: 8, name: this.$t('rePricing.staus.withEOB')}
            ],
            filters: {
                docType: "",
                code: "",
                passager: "",
                date: {
                    endDate: "",
                    startDate: ""
                },
                status: "",
                provider: "",
                amount: ""
            },
            results: [],
            footerTable: {
                start: 0,
                limit: 15,
                size: 0
            },
            open: [],
            showLoader: false
        };
    },
    methods: {
        getDocumentsType: function() {
            this.axios
                .get("getDocumentsType?docType[]=4&docType[]=5")
                .then(response => {
                    this.documentsType = [
                        { id: "", name: this.$t('document.category') }
                    ].concat(response.data.RESPONSE.RESULTS);
                });
        },
        getRepricing: function(pg) {
            pg = Number.isInteger(pg) ? pg : this.footerTable.start;
            this.showLoader = true;
            this.error = null;
            this.axios
                .post("getRepricing", {
                    start: pg,
                    limit: this.footerTable.limit,
                    code: (this.filters.code) ? this.filters.code.trim() : '',
                    passenger: (this.filters.passager) ? this.filters.passager.trim() : '',
                    docType: this.filters.docType,
                    endDate: this.filters.date.endDate,
                    startDate: this.filters.date.startDate,
                    idProvider: this.$session.get("provider").id,
                    status: this.filters.status,
                    providerInvoice: (this.filters.provider) ? this.filters.provider.trim() : '',
                    amount: (this.filters.amount) ? this.filters.amount.trim() : '',
                })
                .then(response => {
                    this.showLoader = false;
                    window.console.log(response.data.RESPONSE.RESULTS);
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
            this.getRepricing(0);
        },
        setDataPaginate: function(campo, value) {
            this.footerTable[campo] = value;
            this.getRepricing();
        },
        addRePricing: function(repricing) {
            this.$emit("addRePricing", repricing);
        },
        clear: function() {
            this.filters = {
                code: "",
                arrPrefix: [],
                passager: "",
                date: {
                    endDate: "",
                    startDate: ""
                }
            };
            this.getRepricing(0);
        },
    },
    mounted() {
        this.getRepricing();
        this.getDocumentsType();
        //this.statusRepricing();
    },
    computed: {
        docType: function() {
            return this.documentsType.reduce(function(m, e) {
                m[e.id] = e.name;
                return m;
            }, {});
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