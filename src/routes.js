import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/home/home-page.vue';


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/about-us',
      component: () => import('./pages/about/about-us-page.vue' /* webpackChunkName: "about-us-page" */)
    }
  ]
});
