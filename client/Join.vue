<template>
  <div>
    <top-nav />
    <logo />
    <h1>Join</h1>
    <ul>
      <li v-for="game in serverStatus.availableGames" :key="game.id">
        <router-link :to="{ name: 'game', params: { id: game.id }}" >
          {{ game.name }} {{ game.players.length }}/8
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TopNav from './components/TopNav.vue';
import Logo from './components/Logo.vue';

export default {
  name: 'join',
  components: {
    TopNav,
    Logo,
  },
  computed: {
    ...mapState(['serverStatus']),
  },
};
</script>
