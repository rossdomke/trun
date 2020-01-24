<template>
  <div>
    <top-nav />
    <div id="wait" v-if="!this.game.id">
      <h1>Waiting On Host..<span @click="forceTakeover" class="clickable">.</span>
      </h1>
    </div>
    <div id="game-container" v-if="this.game.id">
      <player-container
        :players="game.players"
        :currentPlayerId="player.id"
        :hostId="game.host"
      />
      <h1>{{ this.game.name }}</h1>
      <hr />
      <h3>Players</h3>
      <ul>
        <li
          v-for="gamePlayer in this.game.players"
          :key="gamePlayer.id"
          :style="{color: gamePlayer.color}"
        >
          <span v-if="gamePlayer.id === game.host">(Host)</span>
          {{ gamePlayer.name }}
          <span v-if="gamePlayer.id === player.id">&lt;== You</span>
        </li>
      </ul>
      <hr />
      <h3>Chat</h3>
      <input v-model="messageText" type="text" @keyup.enter="sendMessage"/>
      <ul>
        <li v-for="message in serverStatus.messages" :key="message.sentAt">
          {{ message.name}} - {{ message.text }}
        </li>
      </ul>
      <hr />
      <small>Game: {{ this.game }}</small>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import _ from 'lodash';
import {
  JOIN_GAME,
  LEAVE_GAME,
  SYNC,
  MESSAGE_SEND,
} from './store/action-types';
import { SOCKET_ACTION_PREFIX } from './store/socket-prefix';
import TopNav from './components/TopNav.vue';
import PlayerContainer from './components/PlayerContainer.vue';

export default {
  name: 'lobby',
  components: {
    TopNav,
    PlayerContainer,
  },
  data() {
    return {
      advertiseGame: null,
      hostTimeout: null,
      messageText: '',
    };
  },
  created() {
    this.joinGame(this.$route.params.id);
    this.advertiseGame = setInterval(() => {
      this.sync(this.$route.params.id);
    }, 5000);
  },
  beforeDestroy() {
    this.leaveGame();
    clearInterval(this.advertiseGame);
  },
  computed: {
    ...mapState(['player', 'game', 'serverStatus']),
  },
  methods: {
    sendMessage() {
      this.emitMessage(this.messageText);
      this.messageText = '';
    },
    forceTakeover() {
      const g = _.clone(this.game);
      g.lastSync = 1;
      this.commitSync(g);
      this.sync(this.$route.params.id);
    },
    ...mapActions({
      joinGame: JOIN_GAME,
      leaveGame: LEAVE_GAME,
      sync: SYNC,
      commitSync: SOCKET_ACTION_PREFIX + SYNC,
      emitMessage: MESSAGE_SEND,
    }),
  },
};
</script>
