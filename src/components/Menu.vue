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
                <li
                    class="m-menu__item"
                    :class="[subIsActive('/dasboard')?'m-menu__item--active':'']"
                    aria-haspopup="true"
                    v-if="assist"
                >
                    <router-link :to="{ path: '/dasboard'}" replace class="m-menu__link">
                        <span class="m-menu__item-here"></span>
                        <i class="m-menu__link-icon fa fa-headset"></i>
                        <span class="m-menu__link-text">{{$t('menu.assistance')}}</span>
                    </router-link>
                </li>
                <li
                    class="m-menu__item"
                    :class="[subIsActive('/voucher_case')?'m-menu__item--active':'']"
                    aria-haspopup="true"
                    v-if="voucherCase"
                >
                    <router-link :to="{ path: '/voucher_case'}" replace class="m-menu__link">
                        <span class="m-menu__item-here"></span>
                        <i class="m-menu__link-icon fa fa-list"></i>
                        <span class="m-menu__link-text">{{$t('menu.voucherCase')}}</span>
                    </router-link>
                </li>
                <li
                    class="m-menu__item"
                    :class="[subIsActive('/upload_document')?'m-menu__item--active':'']"
                    aria-haspopup="true"
                    v-if="addDocuments"
                >
                    <router-link :to="{ path: '/upload_document'}" replace class="m-menu__link">
                        <span class="m-menu__item-here"></span>
                        <i class="m-menu__link-icon fa fa-folder"></i>
                        <span class="m-menu__link-text">{{$t('document.uploadDocuments')}}</span>
                    </router-link>
                </li>
                <li
                    class="m-menu__item"
                    :class="[subIsActive('/shared_document')?'m-menu__item--active':'']"
                    aria-haspopup="true"
                    v-if="sharedDocuments"
                >
                    <router-link :to="{ path: '/shared_document'}" replace class="m-menu__link">
                        <span class="m-menu__item-here"></span>
                        <i class="m-menu__link-icon la la-share-alt"></i>
                        <span class="m-menu__link-text">{{$t('document.sharedDocuments')}}</span>
                    </router-link>
                </li>
                <li
                    class="m-menu__item"
                    :class="[subIsActive('/re-pricing')?'m-menu__item--active':'']"
                    aria-haspopup="true"
                    v-if="repricing"
                >
                    <router-link :to="{ path: '/re-pricing'}" replace class="m-menu__link">
                        <span class="m-menu__item-here"></span>
                        <i class="m-menu__link-icon fa fa-box-open"></i>
                        <span class="m-menu__link-text">{{$t('menu.rePricing')}}</span>
                    </router-link>
                </li>
                <li
                    class="m-menu__item"
                    :class="[subIsActive('/invoice')?'m-menu__item--active':'']"
                    aria-haspopup="true"
                    v-if="invoice"
                >
                    <router-link :to="{ path: '/invoice'}" replace class="m-menu__link">
                        <span class="m-menu__item-here"></span>
                        <i class="m-menu__link-icon fa fa-coins"></i>
                        <span class="m-menu__link-text">{{$t('menu.invoice')}}</span>
                    </router-link>
                </li>
                <li
                    class="m-menu__item"
                    :class="[subIsActive('/reports-client')?'m-menu__item--active':'']"
                    aria-haspopup="true"
                    v-if="reportsClient"
                >
                    <router-link :to="{ path: '/reports-client'}" replace class="m-menu__link">
                        <span class="m-menu__item-here"></span>
                        <i class="m-menu__link-icon fa fa-chart-bar"></i>
                        <span class="m-menu__link-text">{{$t('general.reports')}}</span>
                    </router-link>
                </li>
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
            voucherCase: this.middleware("voucher_case", "read"),
            assist: this.middleware("assist", "read"),
            invoice: this.middleware("invoiceProvider", "read"),
            reportsClient: this.middleware("guard_by_client", "read"),
            addDocuments: this.middleware("add_documents", "read"),
            sharedDocuments: this.middleware("shared_documents", "read"),
        };
    },
    methods: {
        subIsActive(input) {
            const paths = Array.isArray(input) ? input : [input];
            return paths.some(path => {
                return this.$route.path.indexOf(path) === 0;
            });
        }
    }
};
</script>