import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/home/home-page.vue';
import List from './pages/contact/list-page.vue';
import Anime from './pages/anime/info-page.vue';



export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/liste',
      component: List
    },
    {
      path: '/anime/:id',
      component: Anime
    },
  ]
});
