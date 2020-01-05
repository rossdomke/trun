<template>
  <div>
    <h1>Game: {{ gameId }}</h1>
  </div>
</template>

<script>
export default {
  name: 'game',
  data() {
    return {

    };
  },
  computed: {
    gameId() {
      return this.$route.params.id;
    },
  },
};
</script>
