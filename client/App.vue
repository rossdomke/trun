<template>
  <div id="app">
    <h1>{{playerName}}</h1>
    <p>{{onlineUsers}} Players Online</p>

    <div v-if="!game.id">
      <input
        v-model="game.name"
        @keydown.enter="createGame"/>
      <button @click="createGame">Create Game</button>
      <br/>
      <a
        style="display: block;"
        href="#"
        v-for="ag in availableGames"
        :key="ag.id" @click="joinGame(ag.id)"
      >
        {{ ag.name }} - {{ ag.playerCount }}/8 Players
      </a>
    </div>
    <div v-else>
      <h4>{{this.game.name}}</h4>
      <button @click="leaveGame" v-if="!isHost">Leave Game</button>
      <div class="player" v-for="player in game.players" :key="player.id">
        <div class="player-icon" :style="{ background: player.color }"></div>
        {{player.name}}
      </div>
<hr/>
      {{ game }}
    </div>
    <!-- <trun/> -->
  </div>
</template>

<script>
// import Trun from './components/Trun.vue';
import _ from 'lodash';
import Helpers from './Helpers';

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
        name: '',
        players: [],
        hostId: null,
      },
    };
  },
  components: {
    // Trun,
  },
  created() {
    this.playerName = Helpers.NameGenerator();
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
      this.advertise();
    },
    sync(game) {
      this.game = game;
    },
    advertise(game) {
      const idx = _.findIndex(this.availableGames, ag => ag.id === game.id);
      if (idx !== -1) {
        this.availableGames.splice(idx, 1);
      }
      this.availableGames.push({ time: Date.now(), ...game });
    },
    userDisconnected(userId) {
      const idx = _.findIndex(this.game.players, p => p.id === userId);
      if (idx !== -1) {
        this.game.players.splice(idx, 1);
        if (userId === this.game.hostId) this.leaveGame();
        this.sync();
        this.advertise();
      }
    },
  },
  computed: {
    isHost() {
      return this.game.hostId === this.$socket.id;
    },
  },
  methods: {
    createGame() {
      const game = {
        id: Math.random().toString(36).substr(2, 9),
        name: this.game.name,
        hostId: this.$socket.id,
        players: [],
      };
      this.game = game;
      this.joinGame(game.id);
      this.advertise();
      this.advertiseGame = setInterval(() => {
        this.advertise();
        this.sync();
      }, 5000);
    },
    advertise() {
      if (this.isHost) this.$socket.emit('advertise', { id: this.game.id, name: this.game.name, playerCount: this.game.players.length });
    },
    sync() {
      if (this.isHost) this.$socket.emit('sync', this.game);
    },
    joinGame(gameId) {
      this.$socket.emit('join', {
        gameId,
        playerName: this.playerName,
        playerColor: Helpers.ColorGenerator(),
      });
    },
    leaveGame() {
      clearInterval(this.advertiseGame);
      this.$socket.emit('leave', this.game.id);
      this.game = {
        id: null,
        name: '',
        players: [],
        hostId: '',
      };
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
.player {
  display: block;
  .player-icon {
    width: 10px;
    height: 10px;
  }
}
</style>
