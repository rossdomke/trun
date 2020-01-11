<template>
  <div>
    <top-nav />
    <logo />
    <h1 class="px-2">Create new game</h1>
    <div class="input-container">
      <input
        class="name-input"
        v-model="gameName"
        placeholder="Game Name"
        @keydown.enter="createGame" />
    </div>
    <div class="input-container pt-2">
      <div class="button orange create-button" @click="createGame">Create Game</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import TopNav from './components/TopNav.vue';
import Logo from './components/Logo.vue';
import { CREATE_GAME } from './store/mutation-types';

export default {
  name: 'create',
  data() {
    return {
      gameName: '',
    };
  },
  components: {
    TopNav,
    Logo,
  },
  computed: {
    ...mapState(['game']),
  },
  methods: {
    createGame() {
      this.storeCreateGame(this.gameName);
      this.$router.push({ name: 'game', params: { id: this.game.id } });
    },
    ...mapMutations({
      storeCreateGame: CREATE_GAME,
    }),
  },
};
</script>
<style scoped lang="scss">
@import "./scss/trun_vars.scss";
.name-input {
  font-size: 2em;
  border: solid 0.5px $trun-orange;
  background-color: transparent;
  color: $trun-orange;
  padding: 10px;
  width: 75%;
  margin: 0 auto;
  display: block;
  &:focus {
    outline: none;
    border: solid 0.5px $trun-orange;
    box-shadow: 1px 1px 3px 0 $trun-orange;
  }
}
.input-container {
  width: 100%;
  margin: 0;
  padding: 0;
}
.create-button {
  margin: 0 auto;
  display: block;
  width: 75%;
  padding: 10px;
  text-align: center

}
</style>
