import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

import router from './router';
import Trun from './Trun.vue';
import { SOCKET_ACTION_PREFIX } from './store/socket-prefix';

import store from './store/store';

const connection = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '/'; // https://trun.domke.io


// Vue.use(VueSocketIO, SocketInstance);
Vue.use(new VueSocketIO({
  debug: process.env.NODE_ENV === 'development',
  connection,
  vuex: {
    store,
    actionPrefix: SOCKET_ACTION_PREFIX,
    // mutationPrefix: SOCKET_MUTATION_PREFIX,
  },
}));

Vue.config.productionTip = false;

new Vue({
  render: h => h(Trun),
  router,
  store,
}).$mount('#app');
