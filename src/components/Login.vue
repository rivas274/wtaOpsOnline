<style>
.m-login__logo {
  padding: 1em;
}
.m-login__logo img {
  max-width: 70% !important;
  max-height: 60% !important;
  margin-top: 1em;
}
.m-form__group.has-danger .form-control-feedback {
  font-size: 1.1rem !important;
}
</style>
<template>
<body
  class="m--skin- m-header--fixed m-header--fixed-mobile m-aside-left--enabled m-aside-left--skin-dark m-aside-left--fixed m-aside-left--offcanvas m-footer--push m-aside--offcanvas-default"
>
  <div class="m-grid m-grid--hor m-grid--root m-page">
    <div
      class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-2"
      id="m_login"
      style="background-image: url(assets/img/login/login.jpg);"
    >
      <div class="m-grid__item m-grid__item--fluid m-login__wrapper">
        <div class="m-login__container">
          <div class="m-login__logo">
            <a href="#">
              <img
                src="https://wtaops.com/app/admin/pictures/thumbnail/1logo_empresa201712080920245063.png"
              >
            </a>
          </div>
          <div class="m-login__signin">
            <form class="m-login__form m-form" @submit.prevent="validLogin">
              <div
                v-show="resp.STATUS == 'ERROR'"
                class="m-alert m-alert--outline alert-danger alert alert-dismissible"
                role="alert"
              >
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>
                <span>{{ resp.RESPONSE }}</span>
              </div>
              <div class="form-group m-form__group" :class="{'has-danger': errors.has('user')}">
                <input
                  class="form-control m-input"
                  type="text"
                  placeholder="User"
                  name="user"
                  autocomplete="off"
                  v-model.lazy="inputsData.user"
                  v-validate="'required|min:4|max:12|'"
                >
                <FormError :attribute_name="'user'" :errors_form="errors"></FormError>
              </div>
              <div class="form-group m-form__group" :class="{'has-danger': errors.has('password')}">
                <input
                  class="form-control m-input m-login__form-input--last"
                  type="password"
                  placeholder="Password"
                  name="password"
                  v-model.lazy="inputsData.password"
                  v-validate="'required|min:4|max:12|'"
                >
                <FormError :attribute_name="'password'" :errors_form="errors"></FormError>
              </div>
              <div class="m-login__form-action">
                <button
                  type="submit"
                  id="m_login_signin_submit"
                  class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn"
                  :disabled="disableForm"
                  :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
                >Sign In</button>
              </div>
            </form>
          </div>
          <div class="m-login__account">
            <span
              class="m-login__account-msg"
            >All users of our online services subject to Privacy Statement and agree to be bound by Terms of Service. Please read. © 2019 Ils. All rights reserved. Powered by ILS-D2PW Solutions</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
</template>
<script>
import FormError from "./FormError";
export default {
  name: "Login",
  components: {
    FormError
  },
  data: function() {
    return {
      inputsData: {},
      resp: {
        STATUS: ""
      },
      disableForm: false
    };
  },
  methods: {
    validLogin: function() {
      if (!this.disableForm) {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.disableForm = true;
            this.axios.post("Login", this.inputsData).then(response => {
              this.resp = response.data;
              this.disableForm = false;
              if (response.data.STATUS == "OK") {
                this.$session.start();
                this.$session.set('TOKEN',response.data.TOKEN);
                this.$session.set('USER',response.data.RESPONSE.user);
                this.$session.set('USERDATA',JSON.stringify(response.data.RESPONSE));
                this.$router.push("dasboard");
              }
            });
          }
        });
      }
    }
  }
};
</script>