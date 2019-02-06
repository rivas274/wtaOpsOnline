<template>
  <div class="m-content container-fluid">
    <div class="col-xl-12 m--margin-bottom-10">
      <div class="m-portlet m-portlet--mobile m--padding-bottom-20">
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
          <div class="m-form m-form--label-align-right m--margin-top-10 m--margin-bottom-20">
            <div class="row align-items-center">
              <div class="col-xl-12 order-2 order-xl-1">
                <slot name="filters"></slot>
              </div>
            </div>
          </div>
          <div class="m-section__content">
            <table class="table-responsive table table-striped m-table--head-bg-success">
              <thead>
                <tr>
                  <th v-for="head in title">
                    <span>{{ head }}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in content">
                  <td v-for="campo in row">
                    <span v-html="campo"></span>
                  </td>
                </tr>
              </tbody>
            </table>
						<div class='m-datatable m-datatable--default'>
            	<slot name="footer"></slot>
						</div>
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
      head: (this.thead||[]),
      body: (this.tbody||[]),
    };
  },
  computed: {
    title: function() {
      return this.head.length>0?this.head.map(function(value, index) {
        return value["label"];
      }):[];
    },
    content: function() {
      var head = this.head;
      return this.body.length>0?this.body.map(function(valueRow) {
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
      }):[];
    }
  },
  watch: {
    tbody: function(newVal) {
      this.body = newVal;
    }
  }
};
</script>
