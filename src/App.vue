<template>
  <div id="app" class="m-grid m-grid--hor m-grid--root m-page">
    <template  v-if="showMenu()">
      <header-custom></header-custom>
      <div class="m-grid__item m-grid__item--fluid m-grid m-grid--ver-desktop m-grid--desktop m-body">
        <Menu></Menu>
        <router-view></router-view>
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
import Menu from "./components/Menu.vue";
export default {
  components: {
    FooterCustom,
    HeaderCustom,
    Menu
  },
  methods:{
    showMenu:function(){
      return (this.$session.get('TOKEN')||'').length == 16 && this.$route.name !='http404'
    }  
  }
};
</script>