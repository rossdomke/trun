<template>
  <div id="app">
    <trun/>
  </div>
</template>

<script>
import Trun from './components/Trun.vue';

export default {
  name: 'app',
  components: {
    Trun,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
