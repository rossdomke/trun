<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
import './scss/trun.scss';

export default {
  name: 'trun',
  components: {
  },
  computed: {

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
    padding: 10px;
  }
</style>
