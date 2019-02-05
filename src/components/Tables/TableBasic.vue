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
          <div class="m-form m-form--label-align-right m--margin-top-10 m--margin-bottom-20">
            <div class="row align-items-center">
              <div class="col-xl-8 order-2 order-xl-1">
                <slot name="filters"></slot>
              </div>
            </div>
          </div>
          <div class="m-section__content">
            <table class="table-responsive table table-striped m-table--head-bg-success">
              <thead>
                <slot name="thead"></slot>
              </thead>
              <tbody>
                <slot name="tbody"></slot>
              </tbody>
              <tfooter>
                <slot name="tfooter"></slot>
              </tfooter>
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
};
</script>
