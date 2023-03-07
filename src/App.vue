<style>
.has-danger .form-control,
.has-danger .form-control[readonly] {
    border-color: #f4516c;
}
</style>

<template>
    <div id="app" class="m-grid m-grid--hor m-grid--root m-page">
        <template v-if="showMenu()">
            <header-custom></header-custom>
            <div
                class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body"
            >
                <menu-custom></menu-custom>
                <div class="m-grid__item m-grid__item--fluid m-wrapper">
                    <router-view></router-view>
                </div>
            </div>
            <footer-custom></footer-custom>
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
    </div>
</template>
<script>
import FooterCustom from "./components/Footer.vue";
import HeaderCustom from "./components/Header/Header.vue";
import MenuCustom from "./components/Menu.vue";
export default {
    components: {
        FooterCustom,
        HeaderCustom,
        MenuCustom
    },
    methods: {
        showMenu: function() {
            return (
                (this.$session.get("TOKEN") || "").length == 16 &&
                this.$route.name != "http404" &&
                this.$route.meta.isPublic != true
            );
        }
    }
};
</script>