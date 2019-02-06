import Assist from '../components/Assist.vue';
import ListAsistencia from '../components/ListAsistencia.vue';
import Content from '../components/Content.vue';
import Login from '../components/Login.vue';
import http404 from '../components/http404.vue';
export default [
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
    name: 'Content',
    path: '/Content',
    component: Content,
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