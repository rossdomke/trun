import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

import * as m from './mutation-types';
import * as a from './action-types';
import { SOCKET_MUTATION_PREFIX, SOCKET_ACTION_PREFIX } from './socket-prefix';
import { NameGenerator, ColorGenerator, IdGenerator } from '../Helpers';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    serverStatus: {
      onlinePlayerCount: 0,
      availableGames: [],
    },
    game: {
      id: null,
      host: null,
      players: [],
      status: null,
      state: [],
      checkSum: null,
      advertising: false,
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
    },
    [SOCKET_MUTATION_PREFIX + m.PLAYER_COUNT_UPDATE](state, payload) {
      state.serverStatus.onlinePlayerCount = payload;
    },
    [m.CREATE_GAME](state, gameName) {
      state.game.id = IdGenerator();
      state.game.name = gameName;
      state.game.host = state.player.id;
      state.game.players = [];
      state.game.advertising = true;
    },
    [m.PLAYER_JOIN](state, player) {
      const idx = _.findIndex(state.game.players, p => p.id === player.id);
      if (idx !== -1) state.game.players.splice(idx, 1);
      state.game.players.push(player);
    },
    [SOCKET_MUTATION_PREFIX + m.PLAYER_DISCONNECT](state, playerId) {
      const idx = _.findIndex(state.game.players, p => p.id === playerId);
      if (idx !== -1) state.game.players.splice(idx, 1);
    },
    [SOCKET_MUTATION_PREFIX + m.SYNC](state, game) {
      console.log('GAME STATE RECIEVED: ', game);
      state.game = game;
    },
    [SOCKET_MUTATION_PREFIX + m.ADVERTISE](state, game) {
      const idx = _.findIndex(state.serverStatus.availableGames, ag => ag.id === game.id);
      if (idx !== -1) state.serverStatus.availableGames.splice(idx, 1);
      state.serverStatus.availableGames.push(game);
    },
  },
  actions: {
    [SOCKET_ACTION_PREFIX + a.PLAYER_JOIN]({ commit, dispatch }, player) {
      commit(m.PLAYER_JOIN, player);
      dispatch(a.SYNC);
    },
    [a.JOIN_GAME]({ state }, gameId) {
      this._vm.$socket.io.emit(a.JOIN_GAME, { gameId, player: state.player });
    },
    [a.LEAVE_GAME]({ state }) {
      this._vm.$socket.io.emit(a.LEAVE_GAME, state.game.id);
    },
    [a.SYNC]({ state }) {
      console.log('sync called');
      if (state.game.host === state.player.id) {
        console.log('sync: ', state.game);
        this._vm.$socket.io.emit(a.SYNC, state.game);
      }
    },
  },
});

store.commit(m.CHANGE_NAME);
export default store;
