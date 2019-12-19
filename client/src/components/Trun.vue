<template>
  <div>
    <h1>Trun</h1>
  </div>
</template>

<script>
import io from 'socket.io';

export default {
  name: 'Trun',
  components: {

  },
  data() {
    return {
      socket: null,
    };
  },
  mounted() {
    this.socket = io('http://localhost:3000');
  },
};
</script>

<style lang="scss">
</style>
