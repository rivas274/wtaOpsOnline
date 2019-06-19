import Login from '../components/Login/Login.vue';
import MyAcount from '../components/Login/MyAcount.vue';
import http404 from '../components/http404.vue';
import MainAsistencia from '../components/Assists/MainAsistencia.vue';
import Refunds from '../components/Refunds/dasboard.vue';
//import findAssist from '../components/Refunds/findAssist.vue';

export default [
  {
    name: 'dasboard',
    path: '/dasboard',
    component: MainAsistencia,
  },
  {
    name: 'Login',
    path: '/',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    name: 'MyAcount',
    path: '/MyAcount',
    component: MyAcount,
  },
  /* {
    name: 'Refunds',
    path: '/refunds',
    component: findAssist,
    meta: {
      isPublic: true
    }
  }, */
  {
    name: 'Refunds',
    path: '/refunds/:code',
    component: Refunds,
    meta: {
      isPublic: true
    }
  },
  {
    path: "**",
    name: "http404",
    component: http404,
    meta: {
      isPublic: true
    }
  }
]