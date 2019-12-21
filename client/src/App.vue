<template>
  <div id="app">
    <h1>{{playerName}}</h1>
    <p>{{onlineUsers}} Players Online</p>

    <div v-if="!game.id">
      <button @click="createGame">Create Game</button>
      <a href="#" v-for="ag in availableGames" :key="ag.gameId" @click="joinGame(ag.gameId)">
        {{ag}}
      </a>
    </div>
    <div v-else>
      {{ game }}
    </div>
    <!-- <trun/> -->
  </div>
</template>

<script>
// import Trun from './components/Trun.vue';
import _ from 'lodash';
import NameGenerator from './helpers/NameGenerator';

export default {
  name: 'app',
  data() {
    return {
      onlineUsers: 0,
      playerName: '',
      gameId: null,
      availableGames: [],
      advertiseGame: null,
      game: {
        id: null,
        players: [],
      },
    };
  },
  components: {
    // Trun,
  },
  created() {
    this.playerName = NameGenerator.NameGenerator();
  },
  beforeDestroy() {
    clearInterval(this.advertiseGame);
  },
  sockets: {
    connectedUserCount(onlineUsers) {
      this.onlineUsers = onlineUsers;
    },
    playerJoin(player) {
      this.game.players.push(player);
      this.sync();
    },
    sync(game) {
      this.game = game;
    },
    advertise(gameId) {
      const idx = _.findIndex(this.availableGames, ag => ag.gameId === gameId);
      if (idx !== -1) {
        this.availableGames.splice(idx, 1);
      }
      this.availableGames.push({ time: Date.now(), gameId });
    },
  },
  computed: {},
  methods: {
    createGame() {
      this.game = { id: 1, players: [] };
      this.joinGame(this.game.id);
      this.advertise();
      this.advertiseGame = setInterval(() => {
        this.advertise();
        this.sync();
      }, 5000);
    },
    advertise() {
      this.$socket.emit('advertise', this.game.id);
    },
    sync() {
      this.$socket.emit('sync', this.game);
    },
    joinGame(gameId) {
      this.$socket.emit('join', {
        gameId,
        playerId: null,
        playerName: this.playerName,
        color: null,
      });
    },
    leaveGame() {
      clearInterval(this.advertiseGame);
      this.$socket.emit('leave', this.game.id);
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
