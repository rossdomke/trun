<template>
  <div class="top-nav text-light" >
    <router-link to="/" class="text-light" ><font-awesome-icon icon="home"/></router-link>
    <span class="player-name">
      <font-awesome-icon icon="user" color="text-light"/>
      <span :style="{ 'color': player.color }"> {{ player.name }}</span>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'top-nav',
  computed: {
    ...mapState([
      'player',
    ]),
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/trun.scss";

.top-nav {
  padding: 5px;
  line-height: 30px;
  vertical-align: middle;
  height: 30px;
  font-size: 1.5em;
  background: lighten($trun-dark, 10%);
  border-bottom: solid 1px $trun-blue;
}
.player-name {
  float: right;
  font-size: .7em;
}
</style>
