<style>
</style>
<template>
    <div id="m_header_topbar" class="m-topbar m-stack m-stack--ver m-stack--general">
      <div class="m-stack__item m-topbar__nav-wrapper">
        <ul class="m-topbar__nav m-nav m-nav--inline">
          <!-- <li
            class="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center m-dropdown--mobile-full-width"
            m-dropdown-toggle="click"
            m-dropdown-persistent="1"
          >
            <a
              href="#"
              class="m-nav__link m-dropdown__toggle"
              id="m_topbar_notification_icon"
            >
              <span class="m-nav__link-badge m-badge m-badge--accent">3</span>
              <span class="m-nav__link-icon">
                <i class="flaticon-alert-2"></i>
              </span>
            </a>
          </li> -->
          <info-user></info-user>
        </ul>
      </div>
    </div>
</template>
<script>
import InfoUser from './InfoUser.vue'
export default {
  components:{InfoUser}
};
</script>