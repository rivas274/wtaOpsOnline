<style>
.options-btn{
  display: inline-flex;
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
        <th style="width: 90px;">
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
          <span>Bill Status</span>
        </th>
        <th>
          <span>Options</span>
        </th>
      </tr>
    </template>
    <template slot="tbody">
      <template v-for="bill in results">
        <tr :key="bill.idFile">
          <td>
            <span>{{bill.idFile}}</span>
          </td>
          <td>
            <span>{{bill.reference||'N/A'}}</span>
          </td>
          <td>
            <span>{{bill.billDate||'N/A'}}</span>
          </td>
          <td>
            <span>{{bill.provider.providerName||'N/A'}}</span>
          </td>
          <td>
            <span v-tooltip="'Currency '+bill.currency">{{ bill.originalAmount | currency(bill.currency) }}</span>
          </td>
          <td>
            <span>{{ bill.exchangeRate }}</span>
          </td>
          <td>
            <span v-tooltip="'Currency USD'">{{ bill.usdAmount | currency("USD") }}</span>
          </td>
          <td>
            <span v-tooltip="'Currency USD'">{{ bill.coveredAmount | currency("USD") }}</span>
          </td>
          <td class="text-center">
            <span class="m-badge m-badge--wide" :class="[billStatusColor(bill.billStatus)]">{{ bill.billStatusDesc }}</span>
          </td>
          <td class="text-center fa-status">
            <span class="options-btn">
              <a @click="togleBill(bill)"
              class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill">
                <i class="fa" :class="[checkVisibility(bill)?'fa-eye-slash':'fa-eye']"></i>
              </a>
              <a :href="download(bill)" target="_blank"
                class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill">
                <i class="fa fa-cloud-download-alt"></i>
              </a>
            </span>
          </td>
        </tr>
        <tr :key="bill.idFile"></tr>
        <tr :key="bill.idFile" v-show="checkVisibility(bill)">
          <td class="text-center fa-status" colspan="10">
            <span>{{bill}}</span>
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
      showLoader:false,
      view:[]
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
    billStatusColor(status){
      let colors={
        1:'m-badge--accent',
        2:'m-badge--success',
        3:'m-badge--danger',
        4:'m-badge--warning',
        5:'m-badge--focus',
      };
      return colors[status];
    },
    togleBill: function({idFile}) {
      let tab = this.view.filter(function(v) {
        return v== idFile;
      });
      if (tab.length == 0) {
        this.view.push(idFile);
      }else{
        this.view = this.view.filter(function(v) {
          return v != idFile;
        });
      }
    },
    checkVisibility({idFile}){
      return this.view.filter(function(v) {
        return v== idFile;
      }).length!=0;
    },
    download({fileName}){
      return this.axios.defaults.baseURL.split('/app/')[0]+"/download/"+fileName;
    },
  },
  mounted() {
    this.getBill();
  },
};
</script>