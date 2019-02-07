import Login from '../components/Login.vue';
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
    path: "**",
    name: "http404",
    component: http404,
    meta: {
      isPublic: true
    }
  }
];