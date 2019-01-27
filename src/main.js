import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import AddTicket from './components/AddTicket.vue';
import TicketView from './components/TicketView.vue';
import HelloWorld from './components/HelloWorld.vue';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);

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
    name: 'Hello',
    path: '/hello',
    component: HelloWorld
  }
];
const router = new VueRouter({ mode: 'history', routes: routes });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
