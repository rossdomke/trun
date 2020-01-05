import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './Home.vue';
import Create from './Create.vue';
import Join from './Join.vue';
import Game from './Game.vue';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/create',
    component: Create,
  },
  {
    path: '/join',
    component: Join,
  },
  {
    path: '/game/:id',
    component: Game,
  },
];
const router = new VueRouter({ routes });

Vue.use(VueRouter);
export default router;
