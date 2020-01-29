<template>
  <div>
    <input type="text" class="chat-box" v-model="messageText" @keydown.enter="sendMessage" />
    <div class="message-box">
      <div class="message" v-for="message in serverStatus.messages" :key="message.sentAt">
        {{ message.name }} - {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { MESSAGE_SEND } from '../store/action-types';

export default {
  name: 'chat',
  data() {
    return {
      messageText: '',
    };
  },
  computed: {
    ...mapState(['serverStatus']),
  },
  methods: {
    sendMessage() {
      this.emitMessage(this.messageText);
      this.messageText = '';
    },
    ...mapActions({
      emitMessage: MESSAGE_SEND,
    }),
  },
};
</script>

<style lang="scss" scoped>
  .chat-box {
    display: block;
    border: none;
    font-size: 2em;
    padding: 1%;
    width: 98%;
  }
</style>
