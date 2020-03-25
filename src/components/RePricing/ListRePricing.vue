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
                    class-prop="col-md-4 m-form__group-sub"
                    name="codeAssist"
                    watermark="Code Assist"
                    icon="la flaticon-interface-5"
                    v-on:input="setDataFilter"
                    :value="filters.codeAssist"
                ></input-from-table>
                <input-from-table
                    class-prop="col-md-4 m-form__group-sub"
                    name="codeVoucher"
                    watermark="Code Voucher"
                    icon="la flaticon-interface-5"
                    v-on:input="setDataFilter"
                    :value="filters.codeVoucher"
                ></input-from-table>
                <input-from-table
                    class-prop="col-md-4 m-form__group-sub"
                    name="passager"
                    watermark="Passenger"
                    icon="la flaticon-avatar"
                    v-on:input="setDataFilter"
                    :value="filters.passager"
                ></input-from-table>
            </div>
            <div class="form-group m-form__group row" :class="{'has-danger':error}">
                <date-range-bt
                    class-prop="col-md-4 m-form__group-sub"
                    name="date"
                    watermark="Select date range"
                    v-on:input="setDataFilter"
                    :value="filters.date"
                ></date-range-bt>
                <select-from-table
                    name="docType"
                    class-prop="col-md-4 m-form__group-sub"
                    watermark="Category"
                    :options="documentsType"
                    :selected="filters.docType"
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
                    <button class="btn btn-info ml-2 pull-right" @click="clear">Clear</button>
                </div>
            </div>
        </template>
        <template slot="thead">
            <tr>
                <th>
                    <span>id</span>
                </th>
                <th>
                    <span >Voucher</span>
                </th>
                <th>
                    <span>Case Number</span>
                </th>
                <th>
                    <span>Passenger</span>
                </th>
                <th>
                    <span>Classification</span>
                </th>
                <!-- <th>
                    <span>Invoice Provider</span>
                </th>
                <th>
                    <span>Repricing Provider</span>
                </th> -->
                <th>
                    <span>Status</span>
                </th>
                <th style="width: 50px;">
                    <span>Edit</span>
                </th>
            </tr>
        </template>
        <template slot="tbody">
            <tr v-for="rePricing in results" :key="rePricing.id">
                <td>
                    <span>{{ rePricing.id }}</span>
                </td>
                <td>
                    <span>{{ rePricing.assist.codigo }}</span>
                </td>
                <td>
                    <span>{{ rePricing.voucher.codigo }}</span>
                </td>
                <td>
                    <span v-html="rePricing.passenger.fisrtName+' '+rePricing.passenger.lastName"></span>
                </td>
                <td>
                    <span>{{docType[rePricing.invoice.docType]||"N/A"}}</span>
                </td>
                <td>
                    <span class="m-badge m-badge--wide" :class="[' m-badge--'+rePricing.status.color]">{{rePricing.status.label}}</span>
                </td>
                <td class="text-center fa-status">
                    <a
                        @click.prevent="addRePricing(rePricing)"
                        class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                    >
                        <i
                            class="fa"
                            :class="[open.indexOf(rePricing.id)>-1?'fa-location-arrow':'fa-plus-circle']"
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
        var permission = {
            bills: this.middleware("bills", "read"),
            RP002A: this.middleware("RP002A", "read"),
            RP002AB39: this.middleware("RP002A-B39", "read")
        };
        return {
            permission: permission,
            error: null,
            documentsType: [],
            filters: {
                docType: "",
                code: "",
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
                        { id: "", name: "Select Category" }
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
                    code: this.filters.code.trim(),
                    passenger: this.filters.passager.trim(),
                    docType: this.filters.docType,
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
        }
    },
    mounted() {
        this.getRepricing();
        this.getDocumentsType();
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