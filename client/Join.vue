<template>
  <div>
    <top-nav />
    <logo />
    <h1>Join</h1>
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue';
import Logo from './components/Logo.vue';

export default {
  name: 'join',
  components: {
    TopNav,
    Logo,
  },
};
</script>
