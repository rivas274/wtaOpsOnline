<template>
    <div>
        <!-- BEGIN: Left Aside -->
        <button class="m-aside-left-close m-aside-left-close--skin-dark" id="m_aside_left_close_btn">
            <i class="la la-close"></i>
        </button>
        <div id="m_aside_left" class="m-grid__item	m-aside-left  m-aside-left--skin-dark ">
            <!-- BEGIN: Aside Menu -->
            <div id="m_ver_menu" class="m-aside-menu  m-aside-menu--skin-dark m-aside-menu--submenu-skin-dark m-aside-menu--dropdown "  data-menu-vertical="true" m-menu-dropdown="1" m-menu-scrollable="0" m-menu-dropdown-timeout="500" >
                <ul class="m-menu__nav  m-menu__nav--dropdown-submenu-arrow ">
                    <li class="m-menu__item  m-menu__item--active" aria-haspopup="true" >
                        <a  href="index.html" class="m-menu__link ">
                            <span class="m-menu__item-here"></span>
                            <i class="m-menu__link-icon flaticon-line-graph"></i>
                            <span class="m-menu__link-text">
                                Dashboard
                            </span>
                        </a>
                    </li>
                    <li class="m-menu__item  m-menu__item--submenu" aria-haspopup="true"  m-menu-submenu-toggle="hover">
                        <a  href="javascript:;" class="m-menu__link m-menu__toggle">
                            <span class="m-menu__item-here"></span>
                            <i class="m-menu__link-icon flaticon-open-box"></i>
                            <span class="m-menu__link-text">
                                Layouts
                            </span>
                            <i class="m-menu__ver-arrow la la-angle-right"></i>
                        </a>
                        <div class="m-menu__submenu ">
                            <span class="m-menu__arrow"></span>
                            <ul class="m-menu__subnav">
                                <li class="m-menu__item  m-menu__item--parent" aria-haspopup="true" >
                                    <span class="m-menu__link">
                                        <span class="m-menu__item-here"></span>
                                        <span class="m-menu__link-text">
                                            Layouts
                                        </span>
                                    </span>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true" >
                                    <a  href="builder.html" class="m-menu__link ">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-text">
                                            Layout Builder
                                        </span>
                                    </a>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="builder.html" class="m-menu__link ">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-text">
                                            Boxed Layout
                                        </span>
                                    </a>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="builder.html" class="m-menu__link ">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-text">
                                            Right Sidebar
                                        </span>
                                    </a>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="builder.html" class="m-menu__link ">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-text">
                                            Fixed Footer
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="m-menu__item  m-menu__item--submenu" aria-haspopup="true"  m-menu-submenu-toggle="hover">
                        <a  href="javascript:;" class="m-menu__link m-menu__toggle">
                            <span class="m-menu__item-here"></span>
                            <i class="m-menu__link-icon flaticon-layers"></i>
                            <span class="m-menu__link-title">
                                <span class="m-menu__link-wrap">
                                    <span class="m-menu__link-text">
                                        Reports
                                    </span>
                                    <span class="m-menu__link-badge">
                                        <span class="m-badge m-badge--danger">
                                            2
                                        </span>
                                    </span>
                                </span>
                            </span>
                            <i class="m-menu__ver-arrow la la-angle-right"></i>
                        </a>
                        <div class="m-menu__submenu ">
                            <span class="m-menu__arrow"></span>
                            <ul class="m-menu__subnav">
                                <li class="m-menu__item  m-menu__item--parent" aria-haspopup="true" >
                                    <span class="m-menu__link">
                                        <span class="m-menu__item-here"></span>
                                        <span class="m-menu__link-title">
                                            <span class="m-menu__link-wrap">
                                                <span class="m-menu__link-text">
                                                    Reports
                                                </span>
                                                <span class="m-menu__link-badge">
                                                    <span class="m-badge m-badge--danger">
                                                        2
                                                    </span>
                                                </span>
                                            </span>
                                        </span>
                                    </span>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true" >
                                    <a  href="inner.html" class="m-menu__link ">
                                        <i class="m-menu__link-icon flaticon-pie-chart"></i>
                                        <span class="m-menu__link-text">
                                            Finance Reports
                                        </span>
                                    </a>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="inner.html" class="m-menu__link ">
                                        <i class="m-menu__link-icon flaticon-line-graph"></i>
                                        <span class="m-menu__link-text">
                                            Accouning Audit
                                        </span>
                                    </a>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="inner.html" class="m-menu__link ">
                                        <i class="m-menu__link-icon flaticon-statistics"></i>
                                        <span class="m-menu__link-text">
                                            Investments
                                        </span>
                                    </a>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="inner.html" class="m-menu__link ">
                                        <i class="m-menu__link-icon flaticon-coins"></i>
                                        <span class="m-menu__link-text">
                                            Sales
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="m-menu__item  m-menu__item--submenu" aria-haspopup="true"  m-menu-submenu-toggle="hover" m-menu-link-redirect="1">
                        <a  href="javascript:;" class="m-menu__link m-menu__toggle">
                            <span class="m-menu__item-here"></span>
                            <i class="m-menu__link-icon flaticon-lifebuoy"></i>
                            <span class="m-menu__link-text">
                                Support
                            </span>
                            <i class="m-menu__ver-arrow la la-angle-right"></i>
                        </a>
                        <div class="m-menu__submenu ">
                            <span class="m-menu__arrow"></span>
                            <ul class="m-menu__subnav">
                                <li class="m-menu__item  m-menu__item--parent" aria-haspopup="true"  m-menu-link-redirect="1">
                                    <span class="m-menu__link">
                                        <span class="m-menu__item-here"></span>
                                        <span class="m-menu__link-text">
                                            Support
                                        </span>
                                    </span>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="inner.html" class="m-menu__link ">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-text">
                                            Reports
                                        </span>
                                    </a>
                                </li>
                                <li class="m-menu__item  m-menu__item--submenu" aria-haspopup="true"  m-menu-submenu-toggle="hover" m-menu-link-redirect="1">
                                    <a  href="javascript:;" class="m-menu__link m-menu__toggle">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-text">
                                            Cases
                                        </span>
                                        <i class="m-menu__ver-arrow la la-angle-right"></i>
                                    </a>
                                    <div class="m-menu__submenu ">
                                        <span class="m-menu__arrow"></span>
                                        <ul class="m-menu__subnav">
                                            <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                                <a  href="inner.html" class="m-menu__link ">
                                                    <i class="m-menu__link-icon flaticon-computer"></i>
                                                    <span class="m-menu__link-title">
                                                        <span class="m-menu__link-wrap">
                                                            <span class="m-menu__link-text">
                                                                Pending
                                                            </span>
                                                            <span class="m-menu__link-badge">
                                                                <span class="m-badge m-badge--warning m-badge--wide">
                                                                    10
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                                <a  href="inner.html" class="m-menu__link ">
                                                    <i class="m-menu__link-icon flaticon-signs-2"></i>
                                                    <span class="m-menu__link-title">
                                                        <span class="m-menu__link-wrap">
                                                            <span class="m-menu__link-text">
                                                                Urgent
                                                            </span>
                                                            <span class="m-menu__link-badge">
                                                                <span class="m-badge m-badge--danger m-badge--wide">
                                                                    6
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                                <a  href="inner.html" class="m-menu__link ">
                                                    <i class="m-menu__link-icon flaticon-clipboard"></i>
                                                    <span class="m-menu__link-title">
                                                        <span class="m-menu__link-wrap">
                                                            <span class="m-menu__link-text">
                                                                Done
                                                            </span>
                                                            <span class="m-menu__link-badge">
                                                                <span class="m-badge m-badge--success m-badge--wide">
                                                                    2
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                            <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                                <a  href="inner.html" class="m-menu__link ">
                                                    <i class="m-menu__link-icon flaticon-multimedia-2"></i>
                                                    <span class="m-menu__link-title">
                                                        <span class="m-menu__link-wrap">
                                                            <span class="m-menu__link-text">
                                                                Archive
                                                            </span>
                                                            <span class="m-menu__link-badge">
                                                                <span class="m-badge m-badge--info m-badge--wide">
                                                                    245
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="inner.html" class="m-menu__link ">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-text">
                                            Clients
                                        </span>
                                    </a>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="inner.html" class="m-menu__link ">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-text">
                                            Audit
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="m-menu__item  m-menu__item--submenu" aria-haspopup="true"  m-menu-submenu-toggle="hover" m-menu-link-redirect="1">
                        <a  href="javascript:;" class="m-menu__link m-menu__toggle">
                            <span class="m-menu__item-here"></span>
                            <i class="m-menu__link-icon flaticon-share"></i>
                            <span class="m-menu__link-text">
                                Feedbacks
                            </span>
                            <i class="m-menu__ver-arrow la la-angle-right"></i>
                        </a>
                        <div class="m-menu__submenu ">
                            <span class="m-menu__arrow"></span>
                            <ul class="m-menu__subnav">
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="inner.html" class="m-menu__link ">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-title">
                                            <span class="m-menu__link-wrap">
                                                <span class="m-menu__link-text">
                                                    Product Feedbacks
                                                </span>
                                                <span class="m-menu__link-badge">
                                                    <span class="m-badge m-badge--accent">
                                                        3
                                                    </span>
                                                </span>
                                            </span>
                                        </span>
                                    </a>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="inner.html" class="m-menu__link ">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-text">
                                            Customer Reviews
                                        </span>
                                    </a>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="inner.html" class="m-menu__link ">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-text">
                                            Product Ratings
                                        </span>
                                    </a>
                                </li>
                                <li class="m-menu__item " aria-haspopup="true"  m-menu-link-redirect="1">
                                    <a  href="inner.html" class="m-menu__link ">
                                        <i class="m-menu__link-bullet m-menu__link-bullet--dot">
                                            <span></span>
                                        </i>
                                        <span class="m-menu__link-text">
                                            Customer Support
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Menu',
  
}
</script>