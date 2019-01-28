import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Assist from './components/Assist.vue';
import TicketView from './components/TicketView.vue';
import Login from './components/Login.vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
const customAxios = axios.create({
  baseURL: 'https://dev.wtaops.com/app/apiWtaOnline/',
  headers: {
    DEBUG: true
  }
});
Vue.use(VueAxios, customAxios);
Vue.use(VueRouter);
const routes = [
  {
    name: 'Assist',
    path: '/Assist/:code',
    component: Assist,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'dasboard',
    path: '/dasboard',
    component: TicketView,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'Login',
    path: '/',
    component: Login,
  }
];
/* router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const session = Vue.prototype.$session;
    if (session.exists('user')){
      console.log('test session storage');
    }
    if (to.path === '/') {
      next();
    }
  }
}); */
const router = new VueRouter({ mode: 'history', routes: routes });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
