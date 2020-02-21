<template>
  <div>
    <br/>
    <p class="player-count">{{ playerCount }} Players Online</p>
    <logo/>
    <p class="welcome">
      Welcome:
      <span class="playerName" :style="{ color: player.color}">{{ player.name }}</span>&nbsp;
      <font-awesome-icon icon="dice" @click="randomizePlayer();" class="clickable" />
    </p>
    <div class="create-join">
      <router-link
        to="/create"
        class="button blue"
      >
        Create
      </router-link>
      <router-link
        to="/join"
        class="button orange"
      >
        Join
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { CHANGE_NAME, CHANGE_COLOR } from './store/mutation-types';
import Logo from './components/Logo.vue';

export default {
  name: 'home',
  components: {
    Logo,
  },
  methods: {
    randomizePlayer() {
      this.nameChange();
      this.colorChange();
    },
    ...mapMutations({
      nameChange: CHANGE_NAME,
      colorChange: CHANGE_COLOR,
    }),
  },
  computed: {
    playerCount() {
      return this.serverStatus.onlinePlayerCount;
    },
    ...mapState(['player', 'serverStatus']),
  },
};
</script>
<style lang="scss" scoped>
  @import "./scss/trun_vars.scss";

  .welcome {
    text-align: center;
    font-size: 1.5em;
  }
  .player-count {
    margin: 0;
    padding: 0;
    font-size: .8em;
    text-align: right;
    color: lighten($trun-dark, 50%);
  }
  .create-join {
    text-align: center;
    font-size: 1.5em;
    >.button {
      margin: 0px 10px
    }
  }
</style>
