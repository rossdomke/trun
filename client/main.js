import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
// import Socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
// import App from './App.vue';
import Trun from './Trun.vue';
import Home from './Home.vue';
import Create from './Create.vue';
import Join from './Join.vue';
import Game from './Game.vue';

const connection = process.env.NODE_ENV === 'development' ? '//localhost:3000/' : '/'; // https://trun.domke.io
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

// Vue.use(VueSocketIO, SocketInstance);
Vue.use(new VueSocketIO({
  debug: true,
  connection,
}));
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  render: h => h(Trun),
  router,
}).$mount('#app');
