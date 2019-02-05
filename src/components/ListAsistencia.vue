<template>
  <TableBasic :thead="headerTable" :tbody="bodyTable" :tfooter="footerTable">
    <template slot="header">
      <Flag iso="ve"></Flag>Asistencias
    </template>
    <template slot="filters">
      <inputFromTable name="searchPassager" watermark="Passager" v-on:input="setDataFilter"></inputFromTable>
    </template>
    <template slot="thead">
      <inputFromTable name="searchPassager" watermark="Passager" v-on:input="setDataFilter"></inputFromTable>
    </template>
    <template slot="tbody">
      <inputFromTable name="searchPassager" watermark="Passager" v-on:input="setDataFilter"></inputFromTable>
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
import inputFromTable from "./Tables/filters/inputFromTable.vue";
import pagination from "./pagination/pagination.vue";
import Flag from "./Tables/Flag.vue";
import TableBasic from "./Tables/TableBasic.vue";
export default {
  components: {
    TableBasic,
    inputFromTable,
    pagination,
    Flag
  },
  data: function() {
    return {
      filters: {
        searchPassager: ""
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
          prefix: JSON.stringify(this.$session.get("USERDATA")).prefix
        })
        .then(response => {
          this.bodyTable = response.data.results;
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