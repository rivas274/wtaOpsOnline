<template>

<div>
  <TableBasic>
    <template slot="header">Asistencias</template>
    <template slot="filters">
      <inputFromTable name="searchPassager" watermark="Passenger" icon="flaticon-avatar" v-on:input="setDataFilter"></inputFromTable>
      <inputFromTable name="code" watermark="Code" icon="flaticon-interface-5" v-on:input="setDataFilter"></inputFromTable>
      <Multiselects watermark="Search Clients"></Multiselects>
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
          <span>{{assist.fisrtName}}</span>
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
import inputFromTable from "./Tables/filters/inputFromTable.vue";
import pagination from "./pagination/pagination.vue";
import Flag from "./Tables/Flag.vue";
import TableBasic from "./Tables/TableBasic.vue";
import Multiselects from "./Tables/filters/Multiselect.vue";

export default {
  components: {
    TableBasic,
    inputFromTable,
    pagination,
    Flag,
    Multiselects
  },
  data: function() {
    return {
      filters: {
        searchPassager: "",
        code:"",
        valueMiltiSelect:""
      },
      results: [],
      footerTable: {
        start: 0,
        limit: 15,
        size: 0
      }
    };
  },
  methods: {
    getAssistance: function() {
      this.axios
        .post("getAssistance", {
          start: this.footerTable.start,
          limit: this.footerTable.limit,
          passenger: this.filters.searchPassager,
          prefix: JSON.parse(this.$session.get("USERDATA")).prefix,
          code: this.filters.code.trim()
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
    setDataFilter: function(campo, value) {
      this.filters[campo] = value;
      this.footerTable.start = 0;
      this.getAssistance();
    },
    setDataPaginate: function(campo, value) {
      this.footerTable[campo] = value;
      this.getAssistance();
    }
  },
  mounted() {
    this.getAssistance();
  }
};
</script>