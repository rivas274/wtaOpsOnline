<style>
.m-brand__logo-wrapper img {
    max-height: 66px;
    max-width: 100px;
}
</style>
<template>
    <header
        id="m_header"
        class="m-grid__item m-header"
        m-minimize-offset="200"
        m-minimize-mobile-offset="200"
    >
        <div class="m-container m-container--fluid m-container--full-height">
            <div class="m-stack m-stack--ver m-stack--desktop">
                <div class="m-stack__item m-brand m-brand--skin-dark">
                    <div class="m-stack m-stack--ver m-stack--general">
                        <div
                            class="m-stack__item m-stack__item--middle m-stack__item--center m-brand__logo"
                        >
                            <router-link :to="{ path: '/'}" replace class="m-brand__logo-wrapper">
                                <img alt src="assets/img/logos/logo_empresa.png" />
                            </router-link>
                        </div>
                        <div class="m-stack__item m-stack__item--middle m-brand__tools">
                            <a
                                href="javascript:;"
                                id="m_aside_left_offcanvas_toggle"
                                class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block"
                            >
                                <span></span>
                            </a>
                            <a
                                id="m_aside_header_topbar_mobile_toggle"
                                href="javascript:;"
                                class="m-brand__icon m--visible-tablet-and-mobile-inline-block"
                            >
                                <i class="flaticon-more fa fa-2x fa-ellipsis"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
                    <header-top-bar></header-top-bar>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import HeaderTopBar from "./HeaderTopBar.vue";
export default {
    components: { HeaderTopBar }
};
</script>