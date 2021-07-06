import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueSession from './custom/vue-session-custom';
import routes from './custom/routes';
import middleware from './custom/middleware';
import permission from './custom/permission.json';
import globalFilters from './custom/vue-global-filters';
import globalDirectives from './custom/vue-global-directives';
import VeeValidate from 'vee-validate';
import i18n from "./custom/i18n";
import './custom/vue-vee-custom';


Vue.use(VueRouter);
Vue.use(globalDirectives);
Vue.use(globalFilters);

Vue.use(VueSession, {
    persist: true
});

Vue.use(middleware, permission);

const router = new VueRouter({ mode: 'history', routes: routes });
const customAxios = axios.create({
    baseURL: process.env.VUE_APP_URL + '/app/apiWtaOnline/',
});

customAxios.interceptors.response.use(
    function (response) {
        Vue._session.set('lastCheck', window.moment().format('YYYY-MM-DD hh:mm A'));
        Vue._session.set('checkTimeOut', false);
        return response;
    },
    function (error) {
        if (error.response.status == 401 && router.currentRoute.fullPath !== '/') {
            Vue._session.set('TOKEN', '');
            router.go('/');
        }
        return error.response;
    }
);
customAxios.interceptors.request.use(function (config) {
    if (!Vue._session.exists()) {
        Vue._session.start();
    }
    config.headers.common['SESSION'] = Vue._session.id().replace('sess:', '');
    if (i18n._vm.$root.$root.locale) {
        config.headers.common['lang'] = i18n._vm.$root.$root.locale;
    }
    
    if (config.baseURL.indexOf(['dev'])>-1) {
        config.headers.common['DEBUG'] = true;
    }
    if ((Vue._session.get('TOKEN') || '').length == 16 && (config.headers.common['TOKEN'] || '').length == 0) {
        config.headers.common['TOKEN'] = Vue._session.get('TOKEN');
        config.headers.common['USER'] = Vue._session.get("user");
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
Vue.mixin({
    methods: {
        baseUrlApi: function () {
            return 'https://' + this.axios.defaults.baseURL.replace('http://', '')
                .replace('https://', '')
                .replace('www.', '')
                .split(/[/?#]/)[0] + '/';
        }
    }
})
Vue.use(VueAxios, customAxios);

router.beforeEach((to, from, next) => {
    i18n._vm.$root.$root.locale = (to.params.lang || (Vue._session.get('lang')||'en'));
    VeeValidate.Validator.locale = i18n._vm.$root.$root.locale;
    if (to.meta.isPublic) {
        if (to.name == "Login" && (Vue._session.get('TOKEN') || '').length == 16) {
            if (Vue.$middleware("repricing", "read")) {
                next("/re-pricing");
            } else {
                next("/dasboard");
            }
        } else {
            next();
        }
    } else {
        if (Vue._session.exists() && (Vue._session.get('TOKEN') || '').length == 16) {
            if (Vue._session.get('changePassword') == 1 && to.name != 'MyAcount') {
                next('MyAcount');
            } else {
                next();
            }
        } else {
            next('/');
        }
    }
});

Vue.config.productionTip = false;

new Vue({
    mounted: function () {
        setInterval(() => {
            if (router.currentRoute.fullPath !== '/') {
                let lastCheck = window.moment(Vue._session.get('lastCheck')),
                    check = Vue._session.get('checkTimeOut'),
                    duration = window.moment.duration(window.moment().diff(lastCheck)).asMinutes();
                if (duration >= 10) {
                    this.axios.post("timeOut", { 'reset': check }).then(response => {
                        if (response.data.STATUS == "OK") {
                            Vue._session.set('lastCheck', window.moment().format('YYYY-MM-DD hh:mm A'));
                            Vue._session.set('checkTimeOut', false);
                        }
                    });
                }
            }
        }, (5 * 60 * 1000));
        document.addEventListener("click", function () {
            Vue._session.set('checkTimeOut', true);
        });
    },
    render: h => h(App),
    router,
    i18n,
}).$mount('#app')