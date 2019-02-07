<template>
  <div class="m-grid__item m-grid__item--fluid m-wrapper">
    <div class="m-subheader">
      <div class="d-flex align-items-center">
        <div class="mr-auto">
          <h3 class="m-subheader__title m-subheader__title--separator">
              <a href class="m-nav__link">
                <slot name="title"></slot>
              </a>
          </h3>
          <ul class="m-subheader__breadcrumbs m-nav m-nav--inline" v-if="navigation">
            <li class="m-nav__item m-nav__item--home">
                <i class="m-nav__link-icon la la-home"></i>
            </li>
            <template v-for="nav in navigation">
                <li class="m-nav__separator">-</li>
                <li class="m-nav__item">
                  <a class="m-nav__link" v-if="nav.link">
                    <span class="m-nav__link-text">{{ nav.title }}</span>
                  </a>
                  <span v-else class="m-nav__link-text">{{ nav.title }}</span>
                </li>
            </template>  
          </ul>
        </div>
      </div>
    </div>
    <div class="m-content">
      <div class="row">
        <div class="col-lg-12">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['navigation']
};
</script>