<template>
  <div class="m-content container-fluid">
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
                  <div class="form-group m-form__group row align-items-center">
                    <slot name="filters"></slot>
                  </div>
              </div>
            </div>
          </div>
          <div class="m-section__content">
            <table class="table-responsive table table-striped">
              <thead>
                <slot name="thead" v-if="$slots.thead"></slot>
              </thead>
              <tbody v-if="$slots.tbody">
                <slot name="tbody"></slot>
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
};
</script>
