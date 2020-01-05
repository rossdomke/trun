<template>
  <div>
    <h1>Home</h1>
  </div>
</template>
<script>
export default {
  name: 'home',
  sockets: {
    connectedUserCount(o) {
      console.log(o); // eslint-disable-line no-console
    },
  },
};
</script>
