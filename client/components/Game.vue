<template>
  <div ref="gameContainer" class="game-container">
    <div class="game-cover" v-if="gameStatus" >
      <div class="game-message">
        <h1>{{ game.name }}</h1>
        <span>{{ gameStatus }}</span>
      </div>
    </div>
    <canvas ref="game" class="game" />
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
      gameStatus: 'Waiting for game to start...',
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

<style lang="scss" scoped>
  .game-container {
    position: relative;
  }
  .game {
    display: block;
  }
  .game-cover {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,.8);
    z-index: 10;
  }
  .game-message {
    background-color: white;
    width: 100%;
    min-height: 30px;
    color: black;
    text-align: center;
    padding: 15px;
    > h1 {
      padding: 0;
      margin: 2px;
    }
    > span {
      padding: 0px;
      margin: 0 0 5px;
    }
  }
  .game-position {
    position: relative;
    z-index: 5;
  }
</style>
