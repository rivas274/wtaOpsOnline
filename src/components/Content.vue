<style>
.m-subheader .m-subheader__title {
  display: inline-block;
}
.m-subheader .m-subheader__title.m-subheader__title--separator {
  border-right: 1px solid #e2e5ec;
}
</style>
<template>
  <div>
    <div class="m-subheader">
      <div class="d-flex align-items-center">
        <div class="mr-auto">
          <h3 class="m-subheader__title m-subheader__title--separator">
            <slot name="title"></slot>
          </h3>
          <ul class="m-subheader__breadcrumbs m-nav m-nav--inline" v-if="nav">
            <li class="m-nav__item m-nav__item--home">
              <a href class="m-nav__link m-nav__link--icon">
                <i class="m-nav__link-icon la la-home"></i>
              </a>
            </li>
            <template v-for="navi in nav">
              <li class="m-nav__separator"><strong>-</strong></li>
              <li class="m-nav__item">
                <a class="m-nav__link" v-if="navi.link">
                  <strong class="m-nav__link-text">{{ navi.title }}</strong>
                </a>
                <strong v-else class="m-nav__link-text">{{ navi.title }}</strong>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <div class="m-content">
      <div class="row">
        <div class="col-lg-12">
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
              <slot name="body"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["navigation"],
  data(){
    return {nav:this.navigation}
  },
  watch:{
    navigation:function(newVal){
      console.log('navigation',newVal);
      this.nav=newVal;
    }
  }
};
</script>