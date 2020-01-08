import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './Home.vue';
import Create from './Create.vue';
import Join from './Join.vue';
import Game from './Game.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'create',
    path: '/create',
    component: Create,
  },
  {
    name: 'join',
    path: '/join',
    component: Join,
  },
  {
    name: 'game',
    path: '/game/:id',
    component: Game,
  },
];
const router = new VueRouter({ routes });

Vue.use(VueRouter);
export default router;
