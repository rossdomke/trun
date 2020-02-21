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
      messages: [],
    },
    game: {
      id: null,
      host: null,
      players: [],
      status: null,
      state: [],
      checkSum: null,
      advertising: false,
      lastSync: null,
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
    [m.CHANGE_NAME](state, name) {
      state.player.name = name || NameGenerator();
    },
    [m.CHANGE_COLOR](state, color) {
      let clr = color;
      if (color && !color.match(/^#[0-9a-fA-F]{6}/)) {
        state.serverStatus.messages.push({
          name: 'system',
          color: 'red',
          textColor: 'lightred',
          text: `Color must be valid 6 char hex color (${ColorGenerator()})`,
          sentAt: Date.now(),
        });
        clr = null;
      }
      state.player.color = clr || ColorGenerator();
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
    [m.SYNC](state, game) {
      state.game = game;
    },
    [SOCKET_MUTATION_PREFIX + m.ADVERTISE](state, game) {
      const idx = _.findIndex(state.serverStatus.availableGames, ag => ag.id === game.id);
      if (idx !== -1) state.serverStatus.availableGames.splice(idx, 1);
      const advGame = game;
      advGame.lastHeardAt = Date.now();
      state.serverStatus.availableGames.push(advGame);
    },
    [SOCKET_MUTATION_PREFIX + m.MESSAGE_RECIEVE](state, message) {
      state.serverStatus.messages.push(message);
    },
    [m.LEAVE_GAME](state) {
      state.game = {
        id: null,
        host: null,
        players: [],
        status: null,
        state: [],
        checkSum: null,
        advertising: false,
        lastSync: null,
      };
      state.serverStatus.messages = [];
      state.serverStatus.availableGames = [];
    },
    [m.CHAT_HELP](state) {
      const timestamp = Date.now();
      state.serverStatus.messages.push({
        name: 'system',
        color: 'red',
        textColor: 'lightgrey',
        text: 'List of available commands: ',
        sentAt: timestamp - 1,
      });
      const commands = [
        '/help - shows this menu',
        '/name {name} - change player name',
        '/color - change to random color',
        '/game-name {name} - change the game name',
      ];
      commands.forEach((c, i) => {
        console.log(i);
        state.serverStatus.messages.push({
          name: '',
          textColor: 'lightgrey',
          text: `>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${c}`,
          sentAt: timestamp - 2 * (i + 1),
        });
      });
    },
  },
  actions: {
    [a.PLAYER_CHANGE_NAME]({ state, commit, dispatch }, name) {
      commit(m.CHANGE_NAME, name);
      if (state.game && state.game.id) dispatch(a.JOIN_GAME, state.game.id);
    },
    [a.PLAYER_CHANGE_COLOR]({ state, commit, dispatch }, color) {
      commit(m.CHANGE_COLOR, color);
      if (state.game && state.game.id) dispatch(a.JOIN_GAME, state.game.id);
    },
    [a.MESSAGE_SEND]({ state }, messageText) {
      this._vm.$socket.io.emit(a.MESSAGE_SEND, {
        gameId: state.game.id,
        name: state.player.name,
        color: state.player.color,
        text: messageText,
      });
    },
    [SOCKET_ACTION_PREFIX + a.PLAYER_DISCONNECT]({ state, commit, dispatch }, playerId) {
      const sGame = _.clone(state.game);
      const idx = _.findIndex(sGame.players, p => p.id === playerId);
      console.log('player disconnecting', playerId);
      if (idx !== -1) sGame.players.splice(idx, 1);
      if (sGame.host === playerId) {
        const nextHost = _.first(sGame.players);
        if (nextHost.id === state.player.id) {
          sGame.host = state.player.id;
          sGame.name = `${state.player.name}'s Game!`;
          commit(m.SYNC, sGame);
        }
      }
      dispatch(a.SYNC);
    },
    [SOCKET_ACTION_PREFIX + a.PLAYER_JOIN]({ commit, dispatch }, player) {
      commit(m.PLAYER_JOIN, player);
      dispatch(a.SYNC);
    },
    [a.JOIN_GAME]({ state }, gameId) {
      this._vm.$socket.io.emit(a.JOIN_GAME, { gameId, player: state.player });
    },
    [a.LEAVE_GAME]({ state, commit }) {
      this._vm.$socket.io.emit(a.LEAVE_GAME, state.game.id);
      commit(m.LEAVE_GAME);
    },
    [SOCKET_ACTION_PREFIX + a.SYNC]({ commit }, game) {
      commit(m.SYNC, game);
    },
    [a.GAME_CHANGE_NAME]({ state, commit, dispatch }, name) {
      if (state.player.id !== state.game.host) return;
      commit(m.SYNC, { ...state.game, name: name || `${state.player.name}'s Game!` });
      dispatch(a.SYNC);
    },
    [a.SYNC]({ state, commit, dispatch }, gameId) {
      if (state.game.host === state.player.id) {
        console.log('syncing');
        this._vm.$socket.io.emit(a.SYNC, state.game);
      } else {
        if (state.game.lastSync === null) {
          const sGame = state.game;
          sGame.lastSync = Date.now();
          commit(m.SYNC, sGame);
          return;
        }

        const timePassed = Date.now() - state.game.lastSync;
        if (timePassed > (Math.random() * 30 + 11) * 1000) {
          const sGame = state.game;
          sGame.id = gameId;
          sGame.host = state.player.id;
          sGame.name = `${state.player.name}'s Game!`;
          sGame.players = [];
          sGame.advertising = true;
          commit(m.SYNC, sGame);
          dispatch(a.SYNC);
        }
      }
      const idx = _.findIndex(state.game.players, p => p.id === state.player.id);
      if (idx === -1) dispatch(a.JOIN_GAME, gameId);
    },
  },
});

store.commit(m.CHANGE_NAME);
store.commit(m.CHANGE_COLOR);
export default store;
