<style>
</style>
<template>
    <li
        class="m-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light"
        m-dropdown-toggle="click"
    >
        <a href="#" class="m-nav__link m-dropdown__toggle">
            <h5 class="m-topbar__userpic pr-3">
                <div class="m--hidden-mobile">{{fullName}}</div>
                <small v-if="detaillUser">{{detaillUser}}</small>
            </h5>
            <span class="m-topbar__userpic">
                <custom-img
                    :src="baseUrlApi()+'app/admin/img_user/'+imgUser"
                    default="assets/img/login/account.svg"
                ></custom-img>
            </span>
        </a>
        <div class="m-dropdown__wrapper">
            <span class="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust"></span>
            <div class="m-dropdown__inner">
                <div
                    class="m-dropdown__header m--align-center"
                    style="background: url(assets/img/login/user_profile_bg.jpg); background-size: cover;"
                >
                    <div class="m-card-user m-card-user--skin-dark">
                        <div class="m-card-user__pic">
                            <custom-img
                                :src="baseUrlApi()+'app/admin/img_user/'+imgUser"
                                default="assets/img/login/account.svg"
                            ></custom-img>
                        </div>
                        <div class="m-card-user__details">
                            <span
                                class="m-card-user__name m--font-weight-500"
                            >{{ fullName | ucwords }}</span>
                            <small v-if="detaillUser" class="m-card-user__email m--font-weight-600 m-link">
                                {{ detaillUser }}
                            </small>
                            <span class="m-card-user__email m--font-weight-300 m-link">{{ email | lower }}</span>
                        </div>
                    </div>
                </div>
                <div class="m-dropdown__body">
                    <div class="m-dropdown__content">
                        <ul class="m-nav m-nav--skin-light">
                            <li class="m-nav__separator m-nav__separator--fit"></li>
                            <li class="m-nav__item d-flex justify-content-between">
                                <a
                                    @click.prevent="logOut"
                                    class="btn m-btn--pill btn-outline-primary pull-right m-btn m-btn--custom m-btn--label-brand m-btn--bolder"
                                    :class="{'m-login__btn--primary m-loader m-loader--right': spin}"
                                >{{$t('general.logout')}}</a>
                                <router-link
                                    :to="{ path: '/MyAcount'}"
                                    replace
                                    class="btn m-btn--pill btn-outline-success m-btn m-btn--custom m-btn--label-brand m-btn--bolder"
                                >{{$t('general.account')}}</router-link>
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
    components: { customImg },
    data: function() {
        return {
            fullName:
                this.$session.get("firstName") +
                " " +
                this.$session.get("lastName"),
            imgUser: this.$session.get("imgUser"),
            email: this.$session.get("email"),
            spin: false
        };
    },
    methods: {
        logOut: function() {
            this.spin = true;
            this.$session.set("TOKEN", "");
            this.$router.go("/");
        }
    },
    computed: {
        detaillUser: function() {
            var detaill = this.$session.getAll();
            switch (true) {
                case "provider" in detaill:
                    detaill = detaill.provider.name;
                    break;
                case "company" in detaill:
                    detaill = detaill.company.name;
                    break;
                case "client" in detaill:
                    detaill = detaill.client.name;
                    break;
                case "master_client" in detaill:
                    detaill = detaill.master_client.name;
                    break;    
            }
            return typeof detaill=="string"?detaill:'';
        }
    }
};
</script>