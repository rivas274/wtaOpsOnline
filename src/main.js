import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VeeValidate from 'vee-validate';
import VueSession from './custom/vue-session-custom';
import routes from './custom/routes';
import globalFilters from'./custom/vue-global-filters';
import globalDirectives from'./custom/vue-global-directives';

Vue.use(VueRouter);
Vue.use(globalDirectives);
Vue.use(globalFilters);
Vue.use(VeeValidate);
Vue.use(VueSession, { persist: true });
const router = new VueRouter({ mode: 'history', routes: routes });
const customAxios = axios.create({
  baseURL: 'https://dev.wtaops.com/app/apiWtaOnline/',
  headers: {
    DEBUG: false,
    'Content-Type': 'multipart/form-data'
  }
});
customAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401 && router.currentRoute.fullPath!=='/') {
      Vue._session.destroy();
      router.go('/');
    }
    return error.response;
  }
);
customAxios.interceptors.request.use(function (config) {
  if ((Vue._session.get('TOKEN') || '').length == 16 && (config.headers.common['TOKEN'] || '').length == 0) {
    config.headers.common['TOKEN'] = Vue._session.get('TOKEN');
    config.headers.common['USER'] = Vue._session.get('USER');
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});
Vue.use(VueAxios, customAxios);
router.beforeEach((to, from, next) => {
  if (to.meta.isPublic) {
    if (to.name == "Login" && (Vue._session.get('TOKEN') || '').length == 16) {
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
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
