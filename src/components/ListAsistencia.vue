<template>
  <div>
    <TableBasic>
      <template slot="header">Assistance</template>
      <template slot="filters">
        <input-from-table
          name="passager"
          watermark="Passenger"
          icon="flaticon-avatar"
          v-on:input="setDataFilter"
        ></input-from-table>
        <input-from-table
          name="code"
          watermark="Code"
          icon="flaticon-interface-5"
          v-on:input="setDataFilter"
        ></input-from-table>
        <Multiselects
          name="arrPrefix"
          watermark="Search Clients"
          :options="clients"
          v-on:input="setDataFilter"
        ></Multiselects>
        <date-range-bt 
          name="date" 
          watermark="Select date range" 
          v-on:input="setDataFilter"
        ></date-range-bt>
        <button class="btn btn-brand" @click="getAssistance(0)">Search</button>
      </template>
      <template slot="thead">
        <tr>
          <th>
            <span>Numero de Caso</span>
          </th>
          <th>
            <span>Compania</span>
          </th>
          <th>
            <span>Voucher</span>
          </th>
          <th>
            <span>Pasajeros</span>
          </th>
          <th>
            <span>Sintomas</span>
          </th>
          <th>
            <span>Tipo de Caso</span>
          </th>
          <th>
            <span>Fecha Evento</span>
          </th>
          <th>
            <span>Fecha Apertura</span>
          </th>
          <th>
            <span>Pais</span>
          </th><<<<<<< HEAD
          =======
          <th>
            <span>Tipo</span>
          </th>>>>>>>> hrivas
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
  </div>
</template>
<script>
import dateRangeBt from "./Tables/filters/dateRangeBt.vue";
import inputFromTable from "./Tables/filters/inputFromTable.vue";
import pagination from "./pagination/pagination.vue";
import Flag from "./Tables/Flag.vue";
import TableBasic from "./Tables/TableBasic.vue";
import Multiselects from "./Tables/filters/Multiselect.vue";

export default {
  components: {
    TableBasic,
    inputFromTable,
    dateRangeBt,
    pagination,
    Flag,
    Multiselects
  },
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
      clients: []
    };
  },
  methods: {
    getAssistance: function(pg) {
      let arrPrefix =
        this.filters.arrPrefix.length == 0
          ? JSON.parse(this.$session.get("USERDATA")).prefix
          : this.filters.arrPrefix;
      pg=Number.isInteger(pg)?pg:this.footerTable.start;
      this.axios
        .post("getAssistance", {
          start: pg,
          limit: this.footerTable.limit,
          prefix: arrPrefix,
          code: this.filters.code.trim(),
          passenger: this.filters.passager.trim(),
          endDate: this.filters.date.endDate,
          startDate: this.filters.date.startDate,
          prefix: JSON.parse(this.$session.get("USERDATA")).prefix
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
    },
    setDataPaginate: function(campo, value) {
      this.footerTable[campo] = value;
      this.getAssistance();
    }
  },
  mounted() {
    this.getAssistance();
    this.getClients();
  }
};
</script>