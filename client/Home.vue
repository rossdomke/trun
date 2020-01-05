<template>
  <div>
    <p class="player-count">{{ playerCount }} Players Online</p>
    <logo/>
    <p class="welcome">
      Welcome:
      <span class="playerName" :style="{ color: player.color}">{{ player.name }}</span>&nbsp;
      <font-awesome-icon icon="dice" @click="nameChange" class="clickable" />
    </p>
    <div class="create-join">
      <div class="button blue">Create</div>
      <div class="button orange">Join</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { CHANGE_NAME } from './store/mutation-types';
import Logo from './components/Logo.vue';

export default {
  name: 'home',
  components: {
    Logo,
  },
  methods: {
    ...mapMutations({
      nameChange: CHANGE_NAME,
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
    font-size: 1.1em;
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
    >.button {
      margin: 0px 10px
    }
  }
</style>
