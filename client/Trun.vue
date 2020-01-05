<template>
  <div class="container">
    <logo/>
    <router-view></router-view>
  </div>
</template>
<script>
import Logo from './components/Logo.vue';
import './scss/trun.scss';

export default {
  name: 'trun',
  components: {
    Logo,
  },
};
</script>
