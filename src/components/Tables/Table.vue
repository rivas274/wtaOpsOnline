<template>
  <div class="m-content container-fluid">
    <div class="col-xl-12">
      <div class="m-portlet m-portlet--mobile">
        <div class="m-portlet__head">
          <div class="m-portlet__head-caption">
            <div class="m-portlet__head-title">
              <h3 class="m-portlet__head-text">
                <slot name="header"></slot>
              </h3>
            </div>
          </div>
        </div>
        <div class="m-portlet__body">
          <div class="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
            <div class="row align-items-center">
              <div class="col-xl-8 order-2 order-xl-1">
                <slot name="filters"></slot>
              </div>
            </div>
          </div>
          <div class="m-datatable m-datatable--default m-datatable--brand m-datatable--loaded">
            <table
              class="m-datatable__table"
              id="html_table"
              width="100%"
              style="display: block; min-height: 300px; position: static; zoom: 1; overflow-x: auto;"
            >
              <thead class="m-datatable__head">
                <tr class="m-datatable__row" style="left: 0px;">
                  <th v-for="head in title" class="m-datatable__cell m-datatable__cell--sort">
                    <span style="width: 110px;">{{ head }}</span>
                  </th>
                </tr>
              </thead>
              <tbody class="m-datatable__body">
                <tr
                  v-for="(row, index) in content"
                  :class="{ 'm-datatable__row--even': index % 2 == 0 }"
                  class="m-datatable__row"
                  style="left: 0px;"
                >
                  <td v-for="campo in row" class="m-datatable__cell">
                    <span>{{ campo }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["thead", "tbody"],
  data: function() {
    return {
      head: this.thead,
      body: this.tbody,
    };
  },
  computed: {
    title: function() {
      return this.head.map(function(value, index) {
        return value["label"];
      });
    },
    content: function() {
      var head = this.head;
      return this.body.map(function(valueRow) {
        var row = valueRow;
        return head.map(function(value, campo) {
          switch (typeof value.filter) {
            case "function":
              return value.filter(row[value.prop]);
              break;
            default:
              return row[value.prop];
              break;
          }
        });
      });
    }
  },
  watch: {
    tbody: function(newVal, oldVal) {
      this.body = newVal;
    }
  }
};
</script>