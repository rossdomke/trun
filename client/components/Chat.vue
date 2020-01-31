<template>
  <div>
    <input
      placeholder="chat"
      type="text"
      class="chat-box"
      v-model="messageText"
      @keydown.enter="sendMessage" />
    <div class="message-box">
      <div
        class="message"
        v-for="message in messages"
        :key="message.sentAt"
        :style="{color: message.textColor || messageColor}" >
        <span v-if="message.name">
          <span class="">[</span>
          <span :style="{color: message.color}">{{ message.name }}</span>
          <span class="">]</span>
          <span class="time" v-if="showTime"> - {{ message.sentAt | formatTime }}</span>
          <span>: </span>
        </span>
        <span v-html="message.text"></span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions, mapMutations } from 'vuex';
import { MESSAGE_SEND } from '../store/action-types';
import { CHAT_HELP } from '../store/mutation-types';

export default {
  name: 'chat',
  data() {
    return {
      messageText: '',
      showTime: false,
      messageColor: '#0182A0',
    };
  },
  computed: {
    messages() {
      const messages = _.orderBy(this.serverStatus.messages, ['sentAt'], ['desc']);
      return messages;
    },
    ...mapState(['serverStatus']),
  },
  methods: {
    sendMessage() {
      const message = this.messageText.trim();
      if (message === '') return;
      if (message.match(/^\/help/)) {
        this.chatHelp();
      } else {
        this.emitMessage(this.messageText);
      }
      this.messageText = '';
    },
    ...mapMutations({
      chatHelp: CHAT_HELP,
    }),
    ...mapActions({
      emitMessage: MESSAGE_SEND,
    }),
  },
};
</script>

<style lang="scss" scoped>
  @import '../scss/trun_vars.scss';

  .chat-box {
    display: block;
    border: none;
    font-size: 2em;
    padding: 1%;
    width: 98%;
  }
  .message-box {
    max-height: 300px;
    padding: 5px;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }
  .time {
    color: #aaa;
  }
</style>
