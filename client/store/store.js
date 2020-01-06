import Vue from 'vue';
import Vuex from 'vuex';

import * as m from './mutation-types';
import * as a from './action-types';
import { SOCKET_MUTATION_PREFIX } from './socket-prefix';
import { NameGenerator, ColorGenerator, IdGenerator } from '../Helpers';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    serverStatus: {
      onlinePlayerCount: 0,
    },
    game: {
      id: null,
      host: null,
      players: [],
      status: null,
      state: [],
      checkSum: null,
    },
    player: {
      id: null,
      name: null,
      color: null,
      secret: null,
      // checkSum: null,
    },
  },
  getters: {

  },
  mutations: {
    [SOCKET_MUTATION_PREFIX + m.CONNECT](state, socketId) {
      state.player.id = socketId;
    },
    [m.CHANGE_NAME](state) {
      state.player.name = NameGenerator();
      state.player.color = ColorGenerator();
      state.player.secret = IdGenerator();
      console.log(this.$socket);
      // state.player.id = this.$socket.id;
    },
    [SOCKET_MUTATION_PREFIX + a.PLAYER_COUNT_UPDATE](state, payload) {
      state.serverStatus.onlinePlayerCount = payload;
    },
    [m.CREATE_GAME](state, payload) {
      const game = {
        id: IdGenerator(),
        name: payload,
      };
      state.game = game;
    },
  },
  actions: {
  },
});

store.commit(m.CHANGE_NAME);
export default store;
