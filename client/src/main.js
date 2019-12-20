import Vue from 'vue';
// import Socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';

// const SocketInstance = new Socketio('http://localhost:3000');

// Vue.use(VueSocketIO, SocketInstance);
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
}));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
