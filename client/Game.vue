<template>
  <div>
    <top-nav />
    <h1>{{ this.game.name }}</h1>
    <hr />
    <h3>Players</h3>
    <ul>
      <li
        v-for="player in this.game.players"
        :key="player.id"
        :style="{color: player.color}"
      >
        {{ player.name }}
      </li>
    </ul>
    <hr />
    <h3>Chat</h3>
    <input :model="messageText" type="text" @keydown.enter="sendMessage"/>
    <ul>
      <li v-for="message in serverStatus.messages" :key="message.sentAt">
        {{ message }}
      </li>
    </ul>
    <hr />
    <small>Game: {{ this.game }}</small>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  JOIN_GAME,
  LEAVE_GAME,
  SYNC,
  MESSAGE_SEND,
} from './store/action-types';
import TopNav from './components/TopNav.vue';

export default {
  name: 'game',
  components: {
    TopNav,
  },
  data() {
    return {
      advertiseGame: null,
      messageText: '',
    };
  },
  created() {
    this.joinGame(this.$route.params.id);
    this.advertiseGame = setInterval(() => {
      this.sync();
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
    ...mapActions({
      joinGame: JOIN_GAME,
      leaveGame: LEAVE_GAME,
      sync: SYNC,
      emitMessage: MESSAGE_SEND,
    }),
  },
};
</script>
