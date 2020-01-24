<template>
  <div class="player-container">
    <div
      class="player"
      v-for="player in players"
      :key="player.id"
      :style="{'background-color': player.color, color: textColor(player.color)}"
    >
      <font-awesome-icon icon="crown" v-if="player.id === hostId"/>
      <font-awesome-icon icon="user" v-else/>
      {{player.name}}
      <span v-if="player.id === currentPlayerId" >
        <font-awesome-icon icon="caret-left" />
        <small>&nbsp;You</small>
      </span>
    </div>
  </div>
</template>

<script>
import { hexToRGB } from '../Helpers';

export default {
  name: 'player-container',
  props: {
    players: Array,
    currentPlayerId: String,
    hostId: String,
  },
  data() {
    return {

    };
  },
  computed: {
    isHost() { return this.currentPlayerId === this.hostId; },
  },
  methods: {
    textColor(color) {
      const { r, g, b } = hexToRGB(color);

      const hsp = Math.sqrt(
        0.299 * (r * r)
        + 0.587 * (g * g)
        + 0.114 * (b * b),
      );

      if (hsp > 127.5) return 'black';

      return 'white';
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../scss/trun_vars.scss";
  .player-container {
    border-bottom: solid 0.5px $trun-blue;
    padding: 5px;
  }
  .player {
    display: inline-block;
    border-radius: 3px;
    padding: 5px;
    margin: 5px;

  }
</style>
