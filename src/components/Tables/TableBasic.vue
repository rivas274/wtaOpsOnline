<template>
  <div class="m-content">
    <div class="col-xl-12 m--padding-bottom-20">
      <div class="m-portlet m-portlet--mobile">
        <div class="m-portlet__head" v-if="$slots.header">
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
            <table class="table table-striped table-bordered table-hover">
              <thead>
                <slot name="thead"></slot>
              </thead>
              <tbody>
                <slot name="tbody"></slot>
                <template v-if="!$slots.tbody">
                  <tr>
                    <td :colspan="$slots.thead[0].children.length" class="text-center">
                      <strong class="text-danger">No records found</strong>
                    </td>
                  </tr>
                </template>
              </tbody>
              <tfoot v-if="$slots.tfoot">
                <slot name="tfoot"></slot>
              </tfoot>
            </table>
						<div class='m-datatable m-datatable--default' v-if="$slots.footer">
            	<slot name="footer"></slot>
						</div>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>
<script>
export default {
  mounted(){
    console.log(this.$slots.thead[0].children.length)
    console.log(this.$slots.thead.$children.length)
  }
};
</script>
