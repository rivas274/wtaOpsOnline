<template>
    <TableBasic :show-loader="showLoader">
        <template slot="filters">
            <div class="row" :class="{'has-danger':error}">
                <input-from-table
                    class="col-md-4 form-group"
                    name="description"
                    :watermark="$t('document.description')"
                    icon="la flaticon-interface-5"
                    v-on:input="setDataFilter"
                    :value="filters.description"
                ></input-from-table>
                <date-range-bt
                    class="col-md-4 form-group"
                    name="date"
                    :watermark="$t('general.selectDateRange')"
                    v-on:input="setDataFilter"
                    :value="filters.date"
                ></date-range-bt>
            </div>
            <div class="row m--align-right">
                <div v-if="error" class="col-lg-9">
                    <div class="alert-danger alert alert-dismissible m--align-left">
                        <button type="button" class="close" @click="error=null"></button>
                        <span>{{ error }}</span>
                    </div>
                </div>
                <div class="col-lg-3" :class="{'offset-lg-9':error==null}">
                    <button class="btn btn-info ml-2 pull-right" @click="clear">{{$t('general.clear')}}</button>
                </div>
            </div>
        </template>
        <template slot="thead">
            <tr>
                <th>
                    id
                </th>
                <th>
                    {{$t('general.date')}}
                </th>
                <th>
                    {{$t('document.description')}}
                </th>
                <th>
                    {{$t('general.options')}}
                </th>
            </tr>
        </template>
        <template slot="tbody">
            <tr v-for="documents in results" :key="documents.id">
                <td>
                    {{documents.id}}
                </td>
                <td>
                    {{documents.created}}
                </td>
                <td>
                    {{documents.description}}
                </td>
                <td>
                    <a
                        :href="documents.url_file"
                        target="_blank"
                        class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill"
                    >
                        <i class="fa fa-cloud-download-alt"></i>
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
import pagination from "../pagination/pagination.vue";
import Flag from "../Element/Flag.vue";
import TableBasic from "../Tables/TableBasic.vue";
export default {
    components: {
        TableBasic,
        inputFromTable,
        dateRangeBt,
        pagination,
    },
    data: function() {
        return {
            error: null,
            filters: {
                description: "",
                date: {},
            },
            results: [],
            footerTable: {
                start: 0,
                limit: 15,
                size: 0
            },
            showLoader: false
        };
    },
    methods: {
        getDocument: function(pg) {
            pg = Number.isInteger(pg) ? pg : this.footerTable.start;
            this.showLoader = true;
            this.error = null;
            this.axios
                .post("getDocumentClient", {
                    start: pg,
                    limit: this.footerTable.limit,
                    prefix: this.$session.get("prefix"),
                    description: this.filters.description,
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
            this.getDocument(0);
        },
        setDataPaginate: function(campo, value) {
            this.footerTable[campo] = value;
            this.getDocument();
        },
        clear: function() {
            this.filters = {
                description: "",
                date: {
                    endDate: "",
                    startDate: ""
                }
            };
            this.getDocument(0);
        },
    },
    mounted() {
        this.getDocument();
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