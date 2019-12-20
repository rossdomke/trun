<template>
  <div>
    <h1>Trun</h1>
    <h3 style="color: darkgreen" v-if="socketConnected">Connected</h3>
    <h3 style="color: darkred" v-else>Disconnected</h3>
    <input type="text" v-model="message" @keydown.enter="sendMessage" />
    <ul>
      <li v-for="(message, idx) in messagesRecieved" :key="idx">{{message}}</li>
    </ul>
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
      messagesRecieved: ['test1', 'test2'],
      message: '',
    };
  },
  sockets: {
    connect() {
      this.socketConnected = true;
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
