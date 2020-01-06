import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import router from './router';
import store from './store/store';

import { SOCKET_ACTION_PREFIX, SOCKET_MUTATION_PREFIX } from './store/socket-prefix';
// eslint-disable-next-line
import library from './font-awesome-lib';
import Trun from './Trun.vue';

const connection = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '/'; // https://trun.domke.io

Vue.component('font-awesome-icon', FontAwesomeIcon);

// Vue.use(VueSocketIO, SocketInstance);
const vueSocketIO = new VueSocketIO({
  debug: process.env.NODE_ENV === 'development',
  connection,
  vuex: {
    store,
    actionPrefix: SOCKET_ACTION_PREFIX,
    mutationPrefix: SOCKET_MUTATION_PREFIX,
  },
});

Vue.use(vueSocketIO);
Vue.prototype.$socket = vueSocketIO;

Vue.config.productionTip = false;

export default new Vue({
  render: h => h(Trun),
  router,
  store,
}).$mount('#app');
