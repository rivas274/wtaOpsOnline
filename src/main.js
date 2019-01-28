import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import AddTicket from './components/AddTicket.vue';
import TicketView from './components/TicketView.vue';
import Login from './components/Login.vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

/*Vue.mixin({
  methods: {
    fetchData: function (url,method,request) {
      let uri = url;
      if (method == 'get') {
        return this.axios.get(uri).then((response) => {
          return response.data;
        });

      } else if (method == 'post') {
        
        return this.axios.post(uri,qs.stringify(request)).then((response) => {
          return response.data; 
        });
        
      }
     
    }
  }
});
*/

const routes = [
  {
      name: 'add',
      path: '/add',
      component: AddTicket
  },
  {
    name: 'index',
    path: '/index',
    component: TicketView
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  }
  
];
const router = new VueRouter({ mode: 'history', routes: routes });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router

}).$mount('#app')
