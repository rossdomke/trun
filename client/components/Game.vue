<template>
  <div>
    <h1>{{ game.name }}</h1>
    <canvas ref="game" width="640" height="480" style="border: 1px solid black;"></canvas>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'game',
  data() {
    return {
      context: null,
    };
  },
  mounted() {
    this.context = this.$refs.game.getContext('2d');
    this.draw();
  },
  computed: {
    ...mapState(['player', 'game']),
  },
  methods: {
    draw() {
      this.context.clearRect(0, 0, this.$refs.game.width, this.$refs.game.height);
      this.context.fillStyle = '#FFFFFF';
      this.context.fillRect(0, 0, this.$refs.game.width, this.$refs.game.width);
    },
  },
};
</script>
