import Login from '../components/Login/Login';
import MyAcount from '../components/Login/MyAcount';
import http404 from '../components/http404';
import MainAsistencia from '../components/Assists/MainAsistencia';
import Refunds from '../components/Refunds/dasboard';
import RePricing from '../components/RePricing/dasboard';

export default [
  {
    name: 'dasboard',
    path: '/dasboard',
    component: MainAsistencia,
  },
  {
    name: 'RePricing',
    path: '/re-pricing',
    component: RePricing,
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
    path: '/refunds/:code',
    redirect: '/en/refunds/:code',
  },
  {
    name: 'Refunds',
    path: '/:lang/refunds/:code',
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