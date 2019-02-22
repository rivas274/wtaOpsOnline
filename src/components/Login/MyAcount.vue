<template>
  <form class="m-form m-form--fit m-form--label-align-right m-form--state" @submit.prevent="chagePassword">
    <content-m :navigation="[{title:'My acount'}]">
      <template slot="title">My acount</template>
      <template slot="header">My acount</template>
      <template slot="body">
        <div class="form-group m-form__group">
          <label for="OldPassword" :class="{'has-danger': errors.has('OldPassword')}">Old Password</label>
          <input
            class="form-control m-input"
            type="password"
            id="OldPassword"
            placeholder="OldPassword"
            name="OldPassword"
            v-model.lazy="inputsData.email"
            v-validate="'required|min:4|max:40'"
          >
          <form-error :attribute_name="'OldPassword'" :errors_form="errors"></form-error>
        </div>
        <div class="form-group m-form__group" :class="{'has-danger': errors.has('newPassword')}">
          <label for="newPassword">New Password</label>
          <input
            class="form-control m-input"
            type="password"
            id="newPassword"
            placeholder="New Password"
            name="newPassword"
            v-validate="'required|min:4|max:40|verify_password'"
            v-model.lazy="inputsData.newPass"
            ref="newPassword"
          >
          <form-error :attribute_name="'newPassword'" :errors_form="errors"></form-error>
        </div>
        <div class="form-group m-form__group" :class="{'has-danger': errors.has('confirmPassword')}">
          <label for="confirmPassword">Confirm new Password</label>
          <input
            class="form-control m-input"
            type="password"
            id="confirmPassword"
            placeholder="confirm new Password"
            name="confirmPassword"
            data-vv-as="password"
            v-validate="'confirmed:newPassword'"
          >
          <form-error :attribute_name="'confirmPassword'" :errors_form="errors"></form-error>
        </div>
      </template>
      <template slot="footer-fit">
        <div class="m-form__actions">
          <button
            @click="chagePassword"
            type="submit"
            id="m_login_signin_submit"
            class="btn btn-focus m-btn m-btn--pill m-btn--custom m-btn--air m-login__btn"
            :disabled="disableForm"
            :class="{'m-login__btn--primary m-loader m-loader--right m-loader--light': disableForm}"
          >Save</button>
        </div>
      </template>
    </content-m>
  </form>
</template>
<script>
import contentM from "../Content";
import FormError from "../FormError";
export default {
  components: {
    contentM,
    FormError
  },
  data() {
    return {
      inputsData: {
        oldPass: null,
        newPass: null,
        user:this.$session.get("user")
      },
      resp: {
        STATUS: ""
      },
      disableForm: false
    };
  },
  methods: {
    chagePassword: function() {
      if (!this.disableForm) {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.disableForm = true;
            this.axios.post("setNewPassword", this.inputsData).then(response => {
              this.resp = response.data;
              this.disableForm = false;
              if (response.data.STATUS == "OK") {
                this.$session.set("changePassword", 0);
              }else{
                this.resp=response.data;
              }
            });
          }
        });
      }
    }
  }
};
</script>