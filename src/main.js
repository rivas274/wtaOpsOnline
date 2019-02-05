import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Assist from './components/Assist.vue';
import ListAsistencia from './components/ListAsistencia.vue';
import Login from './components/Login.vue';
import VeeValidate from 'vee-validate';
import VueSession from './custom/vue-session-custom';

const customAxios = axios.create({
  baseURL: 'https://dev.wtaops.com/app/apiWtaOnline/',
  headers: {
    DEBUG: false,
    'Content-Type':'multipart/form-data'
  },
  requestInterceptor: (config,element) => {
    console.log('requestInterceptor',config,element);
    //config.headers.common['Authorization'] = 'Bearer ' + store.state.token
    return config
  }
});

Vue.use(VueAxios, customAxios);
Vue.use(VeeValidate);
Vue.use(VueRouter);
Vue.use(VueSession,{persist: true});

const routes = [
  {
    name: 'Assist',
    path: '/Assist/:code',
    component: Assist,
  },
  {
    name: 'dasboard',
    path: '/dasboard',
    component: ListAsistencia,
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
    if (to.name == "Login" && (Vue._session.get('TOKEN')||'').length == 16) {
      next('/dasboard');
    } else {
      next();
    }
  } else {
    if (Vue._session.exists() && Vue._session.get('USER')) {
      next();
    } else {
      next('/');
    }
  }
});
Vue.config.productionTip = false;
Vue.mixin({
  beforeCreate: function () {
    if ((this.$session.get('TOKEN') || '').length == 16 && (this.axios.defaults.headers.common['TOKEN'] || '').length == 0) { 
      this.axios.defaults.headers.common['TOKEN']=this.$session.get('TOKEN');
      this.axios.defaults.headers.common['USER']=this.$session.get('USER');
    }
  },
})
new Vue({
  render: h => h(App),
  router,
  beforeCreate: function () { 
    Vue._sess=this.$session;
  }
}).$mount('#app')
