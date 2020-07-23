<style scoped>
#particles-js,
.absolute {
    position: absolute !important;
    width: 100%;
    height: 100%;
}
.m-page {
    background-color: #ffffff !important;
}
</style>
<template>
    <div class="m-grid m-grid--hor m-grid--root m-page">
        <div
            class="m-grid__item m-grid__item--fluid m-grid m-grid--hor m-login m-login--signin m-login--2 m-login-2--skin-2"
            id="m_login"
        >
            <vue-particles
                color="#7b9dd6"
                :particleOpacity="1"
                :particlesNumber="80"
                shapeType="circle"
                :particleSize="5"
                linesColor="#7b9dd6"
                :linesWidth="2"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="170"
                :moveSpeed="2"
            ></vue-particles>
            <div class="absolute">
                <div class="m-grid__item m-grid__item--fluid m-login__wrapper">
                    <div class="m-login__container">
                        <div class="m-login__logo">
                            <custom-img
                                height="80"
                                width="280"
                                :src="baseUrlApi()+'app/admin/pictures/thumbnail/1logo_empresa201712080920245063.png'"
                            ></custom-img>
                        </div>
                        <div class="m-login__signin">
                            <form class="m-login__form m-form" @submit.prevent="validLogin">
                                <div
                                    v-if="resp.STATUS == 'ERROR'"
                                    class="alert-danger alert alert-dismissible"
                                    role="alert"
                                >
                                    <button type="button" class="close" @click="resp.STATUS=''"></button>
                                    <span>{{ resp.RESPONSE }}</span>
                                </div>
                                <div
                                    class="form-group m-form__group"
                                    :class="{'has-danger': errors.has('user')}"
                                >
                                    <input
                                        class="form-control m-input"
                                        type="text"
                                        placeholder="User"
                                        name="user"
                                        autocomplete="off"
                                        v-model.lazy="inputsData.user"
                                        v-validate="'required|min:4|max:40|'"
                                    />
                                    <form-error :attribute_name="'user'" :errors_form="errors"></form-error>
                                </div>
                                <div
                                    class="form-group m-form__group"
                                    :class="{'has-danger': errors.has('password')}"
                                >
                                    <input
                                        class="form-control m-input m-login__form-input--last"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        v-model.lazy="inputsData.password"
                                        v-validate="'required|min:4|max:40|'"
                                    />
                                    <form-error :attribute_name="'password'" :errors_form="errors"></form-error>
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
                            >All users of our online services subject to Privacy Statement and agree to be bound by Terms of Service. Please read. © {{ new Date().getFullYear() }} Ils. All rights reserved. Powered by ilstechnik.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import VueParticles from "vue-particles";
import customImg from "../Element/custom-img";
import FormError from "../FormError";

Vue.use(VueParticles);

export default {
    name: "Login",
    components: {
        FormError,
        customImg
    },
    mounted() {},
    data: function() {
        let user = "";
        if (this.$session.get("user")) {
            user = this.$session.get("user");
        }
        return {
            inputsData: {
                user: user,
                password: ""
            },
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
                        this.axios
                            .post("Login", this.inputsData)
                            .then(response => {
                                this.resp = response.data;
                                this.disableForm = false;
                                if (response.data.STATUS == "OK") {
                                    this.$session.clear();
                                    this.$session.set(
                                        "TOKEN",
                                        response.data.TOKEN
                                    );
                                    let user = response.data.RESPONSE;
                                    for (var prop in user) {
                                        this.$session.set(prop, user[prop]);
                                    }
                                    this.$router.go("/");
                                }
                            });
                    }
                });
            }
        }
    }
};
</script>