import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Secure from './views/Secure';
import { currentUser } from './controllers/authController';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/secure',
      component: Secure,
      beforeEnter: (to, from, next) => {
        const token = window.localStorage.getItem('token');
        if (!token) return next(false);

        currentUser(token).then(user => {
          if (user) return next();

          return next(false);
        });
      }
    }
  ]
});
