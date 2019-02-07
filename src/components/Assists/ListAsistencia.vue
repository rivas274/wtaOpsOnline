<style>
.fa-status .fa{
  font-size: 1.4rem;
}
</style>
<template>
  <TableBasic>
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
          watermark="Code"
          icon="flaticon-interface-5"
          v-on:input="setDataFilter"
        ></input-from-table>
        <input-from-table
          class="col-md-4 m-form__group-sub"
          name="passager"
          watermark="Passenger"
          icon="flaticon-avatar"
          v-on:input="setDataFilter"
        ></input-from-table>
      </div>
      <div class="form-group m-form__group row" v-if="clients.length>0">
        <multi-selects
          class="col-md-4 m-form__group-sub"
          name="arrPrefix"
          watermark="Search Clients"
          :options="clients"
          v-on:input="setDataFilter"
        ></multi-selects>
        <!-- <div class="col m--align-right">
            <button class="btn btn-brand" @click="getAssistance(0)">Search</button>
        </div>-->
      </div>
    </template>
    <template slot="thead">
      <tr>
        <th style="width: 85px;">
          <span>Nro Case</span>
        </th>
        <th>
          <span>Company</span>
        </th>
        <th>
          <span>Voucher</span>
        </th>
        <th>
          <span>Passengers</span>
        </th>
        <th>
          <span>Symptom</span>
        </th>
        <th>
          <span>Type of Case</span>
        </th>
        <th style="width: 90px;">
          <span>Date Event</span>
        </th>
        <th style="width: 90px;">
          <span>Opening Date</span>
        </th>
        <th>
          <span>Country</span>
        </th>
        <th>
          <span>Status</span>
        </th>
        <th>
          <span>Options</span>
        </th>
      </tr>
    </template>
    <template slot="tbody">
      <tr v-for="assist in results">
        <td>
          <span>{{assist.codeAssist}}</span>
        </td>
        <td>
          <span>{{assist.clientName}}</span>
        </td>
        <td>
          <span>{{assist.codigo}}</span>
        </td>
        <td>
          <span v-html="assist.fisrtName+' '+assist.lastName"></span>
        </td>
        <td>
          <span>{{assist.symptom}}</span>
        </td>
        <td>
          <span>{{assist.descCaseType}}</span>
        </td>
        <td>
          <span>{{assist.reportedDate.date}}</span>
        </td>
        <td>
          <span>{{assist.registeredDate.date}}</span>
        </td>
        <td>
          <span>
            <Flag :iso="assist.isoCountry"></Flag>
            <!--<span class="m-badge m-badge--info m-badge--wide">Info</span>-->
          </span>
        </td>
        <td class="text-center fa-status">
          <span>
            <i  :class="infoStatus(assist.statusAssist).ico" 
                v-tooltip:top="infoStatus(assist.statusAssist).label"></i>
          </span>
        </td>
        <td class="text-center fa-status">
          <span>
            <a @click.prevent="addAssist(assist)"
            class="m-portlet__nav-link btn m-btn m-btn--hover-brand m-btn--icon m-btn--icon-only m-btn--pill">
              <i class="fa" :class="[open.indexOf(assist.codeAssist)>-1?'fa-location-arrow':'fa-pencil-alt']" ></i>
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
import Flag from "../Element/Flag.vue";
import TableBasic from "../Tables/TableBasic.vue";
import MultiSelects from "../Tables/filters/Multiselect.vue";
export default {
  components: {
    TableBasic,
    inputFromTable,
    dateRangeBt,
    pagination,
    Flag,
    MultiSelects
  },
  props:["open-asist"],
  data: function() {
    return {
      filters: {
        code: "",
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
      open:[]
    };
  },
  methods: {
    getAssistance: function(pg) {
      let arrPrefix =
        this.filters.arrPrefix.length == 0
          ? JSON.parse(this.$session.get("USERDATA")).prefix
          : this.filters.arrPrefix;
      pg = Number.isInteger(pg) ? pg : this.footerTable.start;
      this.axios
        .post("getAssistance", {
          start: pg,
          limit: this.footerTable.limit,
          prefix: arrPrefix,
          code: this.filters.code.trim(),
          passenger: this.filters.passager.trim(),
          endDate: this.filters.date.endDate,
          startDate: this.filters.date.startDate
        })
        .then(response => {
          this.results = response.data.results;
          this.footerTable = {
            start: response.data.start,
            limit: response.data.limit,
            size: response.data.size
          };
        });
    },
    getClients: function() {
      this.axios
        .post("getClient", {
          prefix: JSON.parse(this.$session.get("USERDATA")).prefix
        })
        .then(response => {
          let data = response.data.results;

          this.clients = data.map(function(value, key) {
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
    addAssist:function(assist){
      this.$emit('addAssist',assist);
    },
    infoStatus:function(status){
      let label={
        1:'Opening',
        2:'Validation',
        3:'In progress',
        4:'Monitoring',
        5:'Closed',
      };
      let ico={
        1:'fa fa-unlock',
        2:'fa fa-check-square-o',
        3:'fa fa-history',
        4:'fa fa-eye',
        5:'fa fa-lock',
      };
      return {
        label:label[status],
        ico:ico[status],
      };
    }
  },
  mounted() {
    this.getAssistance();
    this.getClients();
  },
  watch:{
    openAsist:function(newVal){
      this.open=(newVal||[]).map(function(value){ return value.codeAssist; });
    }
  }
};
</script>