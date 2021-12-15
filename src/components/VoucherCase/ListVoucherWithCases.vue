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
            <div class="row">
                <input-group
                    class="col-md-4 form-group"
                    :class="{'has-danger': errors.has('codeVoucher')}"
                    v-validate="'required'"
                    :data-vv-as="$t('voucher.voucher')"
                    name="codeVoucher"
                    :watermark="$t('voucher.voucher')"
                    icon="la flaticon-interface-5"
                    v-on:input="setDataFilter"
                    :value="filters.codeVoucher">
                    <button class="btn btn-info" @click="getVoucherWithCases(0)">{{$t('general.search')}}</button>
                    <form-error slot="error" :attribute_name="'codeVoucher'" :errors_form="errors"></form-error>
                </input-group>
                <div class="col-lg-8">
                    <div class="alert-info alert m--align-left">
                        {{$t('voucher.searchMultipleCommas')}}
                    </div>
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
                    {{$t('voucher.source')}}
                </th>
                <th>
                    {{$t('assistance.symptom')}}
                </th>
                <th>
                    {{$t('assistance.type')}}
                </th>
                <th style="min-width: 90px;"  class="text-center">
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
                    {{assist.origin}}
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
import inputGroup from "../Tables/filters/inputGroup.vue";
import selectFromTable from "../Tables/filters/selectFromTable.vue";
import pagination from "../pagination/pagination.vue";
import Flag from "../Element/Flag.vue";
import TableBasic from "../Tables/TableBasic.vue";
import MultiSelects from "../Tables/filters/Multiselect.vue";
import dateSingleBt from "../Tables/filters/dateSingleBt.vue";
import FormError from "../FormError";
export default {
    components: {
        TableBasic,
        inputGroup,
        selectFromTable,
        dateRangeBt,
        pagination,
        Flag,
        MultiSelects,
        dateSingleBt,
        FormError
    },
    props: ["open-asist"],
    data: function() {
        return {
            filters: {
                codeVoucher:"",
            },
            results: [],
            footerTable: {
                start: 0,
                limit: 15,
                size: 0
            },
            clients: [],
            open: [],
            showLoader: false
        };
    },
    methods: {
        getVoucherWithCases: function(pg) {
            this.$validator.validateAll().then(result => {
                if(result){
                    pg = Number.isInteger(pg) ? pg : this.footerTable.start;
                    this.showLoader = true;
                    this.axios
                        .post("getVoucherWithCases", {
                            start: pg,
                            limit: this.footerTable.limit,
                            prefix: this.$session.get("prefix"),
                            codeVoucher: (this.filters.codeVoucher||'').trim().split(','),
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
                }
            })
        },
        setDataFilter: function(campo, value) {
            this.filters[campo] = value;
        },
        setDataPaginate: function(campo, value) {
            this.footerTable[campo] = value;
            this.getVoucherWithCases();
        },
        addAssist: function(assist) {
            this.$emit("addAssist", assist);
        },
        clear: function() {
            this.filters = {
                codeVoucher: ""
            };
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