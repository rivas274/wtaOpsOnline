<template>
    <div id="m_aside_left" class="m-grid__item m-aside-left m-aside-left--skin-dark">
        <!-- BEGIN: Aside Menu -->
        <div
            id="m_ver_menu"
            class="m-aside-menu m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark m-aside-menu--dropdown"
            data-menu-vertical="true"
            m-menu-dropdown="1"
            m-menu-scrollable="0"
            m-menu-dropdown-timeout="500"
        >
            <ul class="m-menu__nav m-menu__nav--dropdown-submenu-arrow">
                <li class="m-menu__item m-menu__item--active" aria-haspopup="true" v-if="assist">
                    <router-link :to="{ path: '/dasboard'}" replace class="m-menu__link">
                        <span class="m-menu__item-here"></span>
                        <i class="m-menu__link-icon flaticon-squares-3"></i>
                        <span class="m-menu__link-text">Assistance</span>
                    </router-link>
                </li>
                <li class="m-menu__item m-menu__item--active" aria-haspopup="true" v-if="repricing">
                    <router-link :to="{ path: '/re-pricing'}" replace class="m-menu__link">
                        <span class="m-menu__item-here"></span>
                        <i class="m-menu__link-icon flaticon-open-box"></i>
                        <span class="m-menu__link-text">RePricing</span>
                    </router-link>
                </li>
                <!-- <li
            class="m-menu__item m-menu__item--submenu"
            aria-haspopup="true"
            m-menu-submenu-toggle="hover"
          >
            <a href="javascript:;" class="m-menu__link m-menu__toggle">
              <span class="m-menu__item-here"></span>
              <i class="m-menu__link-icon flaticon-open-box"></i>
              <span class="m-menu__link-text">Layouts</span>
              <i class="m-menu__ver-arrow la la-angle-right"></i>
            </a>
            <div class="m-menu__submenu">
              <span class="m-menu__arrow"></span>
              <ul class="m-menu__subnav">
                <li class="m-menu__item m-menu__item--parent" aria-haspopup="true">
                  <span class="m-menu__link">
                    <span class="m-menu__item-here"></span>
                    <span class="m-menu__link-text">Layouts</span>
                  </span>
                </li>
              </ul>
            </div>
                </li>-->
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: "Menu",
    data() {
        return {
            repricing: this.middleware("repricing", "read"),
            assist: this.middleware("assist", "read")
        };
    }
};
</script>