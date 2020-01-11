<template>
  <div>
    <top-nav />
    <h1>{{ this.game.name }}</h1>
    <hr />
    <h3>Players</h3>
    <ul>
      <li
        v-for="gamePlayer in this.game.players"
        :key="gamePlayer.id"
        :style="{color: gamePlayer.color}"
      >
        <span v-if="gamePlayer.id === game.host">(Host)</span> {{ gamePlayer.name }}
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
      console.log('sending message', this.messageText);
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
