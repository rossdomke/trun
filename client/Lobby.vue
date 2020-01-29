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
      <game />
      <chat />
      <hr/>
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
} from './store/action-types';
import { SOCKET_ACTION_PREFIX } from './store/socket-prefix';
import TopNav from './components/TopNav.vue';
import PlayerContainer from './components/PlayerContainer.vue';
import Game from './components/Game.vue';
import Chat from './components/Chat.vue';

export default {
  name: 'lobby',
  components: {
    TopNav,
    PlayerContainer,
    Game,
    Chat,
  },
  data() {
    return {
      advertiseGame: null,
      hostTimeout: null,
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
    }),
  },
};
</script>
