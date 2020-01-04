import Vue from 'vue';
// import Socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';

const connection = '//localhost:3000/'; // https://trun.domke.io

// const SocketInstance = new Socketio('http://localhost:3000');

// Vue.use(VueSocketIO, SocketInstance);
Vue.use(new VueSocketIO({
  debug: true,
  connection,
}));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
