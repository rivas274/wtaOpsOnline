<template>
  <form class="m-form m-form--fit m-form--label-align-right m-form--state" @submit.prevent="chagePassword">
    <content-m :navigation="[{title:'My acount'}]">
      <template slot="title">My acount</template>
      <template slot="header">My acount</template>
      <template slot="body">
        <div class="form-group m-form__group" :class="{'has-danger': errors.has('oldPass')}">
          <label for="oldPass">Old Password</label>
          <input
            class="form-control m-input"
            type="password"
            id="oldPass"
            placeholder="Old Password"
            name="oldPass"
            autocomplete="off"
            v-model="inputsData.oldPass"
            v-validate="'required|min:4|max:40'"
          >
          <form-error :attribute_name="'oldPass'" :errors_form="errors"></form-error>
        </div>
        <div class="form-group m-form__group" :class="{'has-danger': errors.has('newPass')}">
          <label for="newPass">New Password</label>
          <input
            class="form-control m-input"
            type="password"
            id="newPass"
            placeholder="New Password"
            name="newPass"
            autocomplete="off"
            v-validate="'required|min:6|max:40|verify_password'"
            v-model="inputsData.newPass"
            ref="newPass"
          >
          <form-error :attribute_name="'newPass'" :errors_form="errors"></form-error>
        </div>
        <div class="form-group m-form__group" :class="{'has-danger': errors.has('confNewPass')}">
          <label for="confNewPass">Confirm new Password</label>
          <input
            class="form-control m-input"
            type="password"
            id="confNewPass"
            placeholder="confirm new Password"
            name="confNewPass"
            autocomplete="off"
            data-vv-as="password"
            v-validate="'confirmed:newPass'"
          >
          <form-error :attribute_name="'confNewPass'" :errors_form="errors"></form-error>
        </div>
        <div v-if="resp.STATUS == 'ERROR'" class="alert-danger alert alert-dismissible" role="alert">
          <button type="button" class="close" @click="resp.STATUS=''"></button>
          <span v-for="(error,key) in resp.ERROR" :key="key">{{ error }}</span>
        </div>
        <div v-if="resp.STATUS == 'OK'" class="alert-success alert alert-dismissible" role="alert">
          <button type="button" class="close" @click="resp.STATUS=''"></button>
          <span>{{ resp.MESSAGE }} / redirect {{ redirect }} seg</span>
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
      disableForm: false,
      redirect:0,
      interval:null
    }
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
                this.redirect=15;
                this.interval = setInterval(function(){
                    this.redirect--;
                    if(this.redirect<1){
                      this.$router.push('/dasboard');
                    }
                }.bind(this), 1000);
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
/* this.$validator.extend('email_exists', {
  getMessage: field => `The email is already in the system.`,
  validate: value => {
      return this.$http.get('api/users/email/'+value).then(response => {
          return {
              valid: response.data.valid // Your api could return a response containing a 'valid property'
          }
      }).catch(error=> { return { error: response.error.val } });
  }
}); */
</script>