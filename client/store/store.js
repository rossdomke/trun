import Vue from 'vue';
import Vuex from 'vuex';

import * as mtypes from './mutation-types';
// import * as atypes from './action-types';
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
      // id: null,
      name: null,
      color: null,
      secret: null,
      // checkSum: null,
    },
  },
  getters: {

  },
  mutations: {
    [mtypes.CHANGE_NAME](state) {
      state.player.name = NameGenerator();
      state.player.color = ColorGenerator();
      state.player.secret = IdGenerator();
    },
  },
  actions: {
    // [atypes.PLAYER_COUNT_UPDATE](state) {
    //   // console.log('pc update', state);
    // },
  },
});

store.commit(mtypes.CHANGE_NAME);
export default store;
