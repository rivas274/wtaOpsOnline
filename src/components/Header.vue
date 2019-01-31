<template>
<header id="m_header" class="m-grid__item m-header "  m-minimize-offset="200" m-minimize-mobile-offset="200" >
    <div class="m-container m-container--fluid m-container--full-height">
        <div class="m-stack m-stack--ver m-stack--desktop">
            <div class="m-stack__item m-brand  m-brand--skin-dark ">
                <div class="m-stack m-stack--ver m-stack--general">
                    <div class="m-stack__item m-stack__item--middle m-stack__item--center m-brand__logo">
                        <a href="index.html" class="m-brand__logo-wrapper">
                            <img alt="" src="https://wtaops.com/app/admin/pictures/thumbnail/1logo_empresa201712080920245063.png" style="height: 30px;"/>
                        </a>
                    </div>
                    <div class="m-stack__item m-stack__item--middle m-brand__tools">
                        <a href="javascript:;" id="m_aside_left_offcanvas_toggle" class="m-brand__icon m-brand__toggler m-brand__toggler--left m--visible-tablet-and-mobile-inline-block">
                            <span></span>
                        </a>
                        
                        <a id="m_aside_header_menu_mobile_toggle" href="javascript:;" class="m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block">
                            <span></span>
                        </a>
                        
                        <a id="m_aside_header_topbar_mobile_toggle" href="javascript:;" class="m-brand__icon m--visible-tablet-and-mobile-inline-block">
                            <i class="flaticon-more"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
                <button class="m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-dark " id="m_aside_header_menu_mobile_close_btn">
                    <i class="la la-close"></i>
                </button>
                <div id="m_header_topbar" class="m-topbar  m-stack m-stack--ver m-stack--general">
                    <div class="m-stack__item m-topbar__nav-wrapper">
                        <ul class="m-topbar__nav m-nav m-nav--inline">
                            <li class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light" m-dropdown-toggle="click">
                               
                                <a href="#" class="m-nav__link m-dropdown__toggle">
                                    <span class="m-topbar__userpic">
                                        Bienvenido {{nameUser}}
                                    </span>
                                </a>
                               
                            </li>
                            
                        </ul>
                        <ul class="m-topbar__nav m-nav m-nav--inline">
                            <li class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light" m-dropdown-toggle="click">
                               
                                <a href="#" class="m-nav__link m-dropdown__toggle">
                                    <span class="m-topbar__userpic">
                                       <i class="fas fa-users fa-2x"></i>
                                    </span>
                                </a>
                               
                            </li>
                        </ul>
                        <ul class="m-topbar__nav m-nav m-nav--inline">
                            <li class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light" m-dropdown-toggle="click">
                               
                                <div class="m-nav__link m-dropdown__toggle">
                                    <span class="m-topbar__userpic">
                                       <i class="fas fa-sign-out-alt fa-2x"></i>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
</template>
<script>
export default {
  name: 'Header',
  data: function () {
      var dataUser = JSON.parse(localStorage.getItem('USERDATA')),
      nameUser = dataUser.firstName + ' '+dataUser.lastName;
      return {
          nameUser : nameUser.replace(/\b\w/g, l => l.toUpperCase())
      }
  }
}
</script>