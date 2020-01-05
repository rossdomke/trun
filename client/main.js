import Vue from 'vue';
// import Socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';

const connection = process.env.NODE_ENV === 'development' ? '//localhost:3000/' : '/'; // https://trun.domke.io

// Vue.use(VueSocketIO, SocketInstance);
Vue.use(new VueSocketIO({
  debug: true,
  connection,
}));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
