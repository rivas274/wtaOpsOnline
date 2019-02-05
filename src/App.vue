<template>
  <div id="app">
    <div class="m-grid m-grid--hor m-grid--root m-page" v-if="($session.get('TOKEN')||'').length == 16">
      <HeaderCustom></HeaderCustom>
      <div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
        <Menu></Menu>
        <router-view></router-view>
      </div>
      <FooterCustom></FooterCustom>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import FooterCustom from "./components/Footer.vue";
import HeaderCustom from "./components/Header.vue";
import Menu from "./components/Menu.vue";
export default {
  components: {
    FooterCustom,
    HeaderCustom,
    Menu
  }
};
</script>