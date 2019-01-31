import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Assist from './components/Assist.vue';
import Content from './components/Content.vue';
import Login from './components/Login.vue';
import VeeValidate from 'vee-validate';
const customAxios = axios.create({
  baseURL: 'https://dev.wtaops.com/app/apiWtaOnline/',
  headers: {
    DEBUG: false,
    'Content-Type':'multipart/form-data'
  }
});

Vue.use(VueAxios, customAxios);
Vue.use(VeeValidate);
Vue.use(VueRouter);

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
<<<<<<< HEAD
/*router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    console.log(Vue.session.exists());
    if (this.default.app.$session.exists() && !this.default.app.$session.get('TOKEN')) {
      next('/')
    }
  }
  next();
});*/

=======
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
>>>>>>> 28b767f5cf39997189a510750439531098c4c6b5
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
