<template>
  <div>
    <top-nav />
    <h1>{{ this.game.name }}</h1>
    <hr />
    <ul>
      <li
        v-for="player in this.game.players"
        :key="player.id"
        :style="{color: player.color}"
      >
        {{ player }}
      </li>
    </ul>
    <h4>Game: {{ this.game }}</h4>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { JOIN_GAME, LEAVE_GAME } from './store/action-types';
import TopNav from './components/TopNav.vue';

export default {
  name: 'game',
  components: {
    TopNav,
  },
  data() {
    return {

    };
  },
  created() {
    this.joinGame(this.$route.params.id);
  },
  beforeDestroy() {
    this.leaveGame();
  },
  computed: {
    ...mapState(['player', 'game']),
  },
  methods: {
    ...mapActions({
      joinGame: JOIN_GAME,
      leaveGame: LEAVE_GAME,
    }),
  },
};
</script>
