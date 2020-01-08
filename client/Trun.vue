<template>
  <div class="container">
    <router-view v-if="isOnline"></router-view>
    <h1 v-else>Offline</h1>
  </div>
</template>
<script>
import './scss/trun.scss';
import { mapState } from 'vuex';

export default {
  name: 'trun',
  components: {
  },
  computed: {
    isOnline() {
      return this.player.id !== null;
    },
    ...mapState(['player']),
  },
};
</script>
<style lang="scss" scoped>
  @import "./scss/trun_vars.scss";

  .container {
    max-width: 600px;
    margin: 0 auto !important;
    float: none !important;
    background: lighten($trun-dark, 5%);
    padding: 0px 0px 60px;
  }
</style>
