<template>
  <div ref="gameContainer">
    <canvas ref="game" style="border: 1px solid black;"></canvas>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'game',
  data() {
    return {
      context: null,
      width: 400,
    };
  },
  created() {
  },
  mounted() {
    this.context = this.$refs.game.getContext('2d');
    window.addEventListener('resize', this.draw);
    this.draw();
  },
  destroyed() {
    window.removeEventListener('resize', this.draw);
  },
  computed: {
    height() {
      return this.width;
    },
    ...mapState(['player', 'game']),
  },
  methods: {
    resize() {
      console.log('resize');
    },
    draw() {
      console.log('drawing', this.width);
      this.width = this.$refs.gameContainer.clientWidth;
      this.context.clearRect(0, 0, this.width, this.height);
      this.context.canvas.width = this.width;
      this.context.canvas.height = this.height;
      this.context.fillStyle = '#FFFFFF';
      this.context.fillRect(0, 0, this.width, this.height);
    },
  },
};
</script>
