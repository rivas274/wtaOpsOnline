<template>
  <TableBasic :show-loader="showLoader">
    <template slot="filters">
      <div class="form-group m-form__group row">
        <date-range-bt
          class="col-md-4 m-form__group-sub"
          name="date"
          watermark="Select date range"
          v-on:input="setDataFilter"
        ></date-range-bt>
        <input-from-table
          class="col-md-4 m-form__group-sub"
          name="code"
          watermark="Reference / Description"
          icon="flaticon-interface-5"
          v-on:input="setDataFilter"
        ></input-from-table>
      </div>
    </template>
    <template slot="thead">
      <tr>
        <th>
          <span>ID</span>
        </th>
        <th>
          <span>Deference</span>
        </th>
        <th>
          <span>Bill Date</span>
        </th>
        <th>
          <span>Provider</span>
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
          <span>Covered Amount</span>
        </th>
        <th>
          <span>Options</span>
        </th>
      </tr>
    </template>
    <template slot="tbody">
      <tr v-for="assist in results" :key="assist.codeAssist">
        <td>
          <span>{{assist.idFile}}</span>
        </td>
        <td>
          <span>{{assist.reference||'N/A'}}</span>
        </td>
        <td>
          <span>{{assist.billDate||'N/A'}}</span>
        </td>
        <td>
          <span>{{assist.provider.providerName}}</span>
        </td>
        <td>
          <span v-tooltip="'Currency '+assist.currency">{{ assist.originalAmount | currency(assist.currency) }}</span>
        </td>
        <td>
          <span>{{ assist.exchangeRate }}</span>
        </td>
        <td>
          <span v-tooltip="'Currency USD'">{{ assist.usdAmount | currency("USD") }}</span>
        </td>
        <td>
          <span v-tooltip="'Currency USD'">{{ assist.coveredAmount | currency("USD") }}</span>
        </td>
        <td class="text-center fa-status">
          <span>
            <a class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill">
              <i class="fa fa-pencil-alt"></i>
            </a>
          </span>
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
import contentM from "../Content.vue";
import dateRangeBt from "../Tables/filters/dateRangeBt.vue";
import inputFromTable from "../Tables/filters/inputFromTable.vue";
import pagination from "../pagination/pagination.vue";
import TableBasic from "../Tables/TableBasic.vue";
export default {
  components: {
    TableBasic,
    inputFromTable,
    dateRangeBt,
    pagination,
  },
  props:["id-assist"],
  data: function() {
    return {
      assist:this.idAssist,
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
      showLoader:false
    };
  },
  methods: {
    getBill: function(pg) {
      pg = Number.isInteger(pg) ? pg : this.footerTable.start;
      this.showLoader=true;
      this.axios
        .post("getBill", {
          start: pg,
          limit: this.footerTable.limit,
          code: this.filters.code.trim(),
          idAssist:this.assist,
          endDate: this.filters.date.endDate,
          startDate: this.filters.date.startDate
        })
        .then(response => {
          this.showLoader=false;
          this.results = response.data.results;
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
  },
  mounted() {
    this.getBill();
  },
};
</script>