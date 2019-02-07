<style>
</style>
<template>
    <li
      class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light"
      m-dropdown-toggle="click"
    >
      <a href="#" class="m-nav__link m-dropdown__toggle">
        <span class="m-topbar__userpic">
          <custom-img :src="'/app/admin/img_user/'+imgUser" default="/app/img/avatar.jpg"></custom-img>
        </span>
      </a>
      <div class="m-dropdown__wrapper">
        <span
          class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"
        ></span>
        <div class="m-dropdown__inner">
          <div
            class="m-dropdown__header m--align-center"
            style="background: url(assets/img/login/user_profile_bg.jpg); background-size: cover;"
          >
            <div class="m-card-user m-card-user--skin-dark">
              <div class="m-card-user__pic">
                <custom-img :src="'/app/admin/img_user/'+imgUser" default="/app/img/avatar.jpg"></custom-img>
              </div>
              <div class="m-card-user__details">
                <span class="m-card-user__name m--font-weight-500">{{ fullName | ucwords }}</span>
                <a
                  href
                  class="m-card-user__email m--font-weight-300 m-link"
                >{{ email | lower }}</a>
              </div>
            </div>
          </div>
          <div class="m-dropdown__body">
            <div class="m-dropdown__content">
              <ul class="m-nav m-nav--skin-light">
                <!-- <li class="m-nav__item">
                  <a href="profile.html" class="m-nav__link">
                    <i class="m-nav__link-icon flaticon-profile-1"></i>
                    <span class="m-nav__link-title">
                      <span class="m-nav__link-wrap">
                        <span class="m-nav__link-text">My Profile</span>
                        <span class="m-nav__link-badge">
                          <span class="m-badge m-badge--success">2</span>
                        </span>
                      </span>
                    </span>
                  </a>
                </li> -->
                <li class="m-nav__separator m-nav__separator--fit"></li>
                <li class="m-nav__item">
                  <a @click.prevent="logOut"
                    class="btn m-btn--pill btn-outline-primary m-btn m-btn--custom m-btn--label-brand m-btn--bolder"
                    :class="{'m-login__btn--primary m-loader m-loader--right': spin}"
                  >Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
</template>
<script>
import customImg from "../Element/custom-img.vue";
export default {
  components:{customImg},
  data: function () {
    let user=JSON.parse(this.$session.get("USERDATA"));
    user['spin']=false;
    return user;
  },
  computed:{
    fullName:function(){
      return this.firstName+' '+this.lastName;
    }
  },
  methods:{
    logOut:function(){
      this.spin=true;
      this.$session.destroy();
      this.$router.go('/');
    }
  }
};
</script>