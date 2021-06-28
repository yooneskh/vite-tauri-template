import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/home/HomePage.vue';


export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/about-us',
      component: () => import('./pages/about/AboutUsPage.vue' /* webpackChunkName: "about-us-page" */)
    }
  ]
});
