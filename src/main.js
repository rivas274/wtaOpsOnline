import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Assist from './components/Assist.vue';
import Content from './components/Content.vue';
import Login from './components/Login.vue';
import VeeValidate from 'vee-validate';
import VueSession from 'vue-session';

const customAxios = axios.create({
  baseURL: 'https://dev.wtaops.com/app/apiWtaOnline/',
  headers: {
    DEBUG: true,
  }
});
const VueSessionOptions = {
  persist: true
}
Vue.use(VueAxios, customAxios);
Vue.use(VueRouter);
Vue.use(VeeValidate);


Vue.use(VueSession, VueSessionOptions);
const routes = [
  {
    name: 'Assist',
    path: '/Assist/:code',
    component: Assist,
  },
  {
    name: 'dasboard',
    path: '/dasboard',
    component: Content,
  },
  {
    name: 'Login',
    path: '/',
    component: Login,
    meta: {
        isPublic: true
    }
  }
];
const router = new VueRouter({ mode: 'history', routes: routes });
router.beforeEach((to, from, next) => {
  if (to.meta.isPublic) {
    if (to.name == "Login" && (localStorage.getItem('TOKEN')||'').length == 16) {
      next('/dasboard');
    } else {
      next();
    }
  } else {
    if (localStorage.getItem('TOKEN') || localStorage.getItem('USER')) {
      next();
    } else {
      next('/');
    }
  }
});
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
