<template>
  <div>
    <h1>Trun</h1>
    <h3 style="color: darkgreen" v-if="socketConnected">
      {{onlineUsers}} Users Online
    </h3>
    <h3 style="color: darkred" v-else>Disconnected</h3>
    <h4>Player Name: {{playerName}}</h4>
  </div>
</template>

<script>

export default {
  name: 'Trun',
  components: {

  },
  data() {
    return {
      socketConnected: false,
      onlineUsers: 0,
      playerName: '',
    };
  },
  created() {
    this.playerName = 'RandomMooseName';
  },
  sockets: {
    connect() {
      this.socketConnected = true;
    },
    connectedUserCount(onlineUsers) {
      this.onlineUsers = onlineUsers;
    },
    disconnect() {
      this.socketConnected = false;
    },
    message(data) {
      console.log('recieved Message', data);
      this.messagesRecieved.push(data);
    },
  },
  methods: {
    sendMessage() {
      console.log(this.message);
      this.$socket.emit('message', this.message);
      this.message = '';
    },
  },
};
</script>

<style lang="scss">
</style>
