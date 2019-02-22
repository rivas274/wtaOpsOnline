import Login from '../components/Login/Login.vue';
import MyAcount from '../components/Login/MyAcount.vue';
import http404 from '../components/http404.vue';
import MainAsistencia from '../components/Assists/MainAsistencia.vue';
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
  {
    path: "**",
    name: "http404",
    component: http404,
    meta: {
      isPublic: true
    }
  }
];