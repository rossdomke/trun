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
import { MESSAGE_SEND, PLAYER_CHANGE_NAME, PLAYER_CHANGE_COLOR } from '../store/action-types';
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
      this.messageText = '';
      if (message === '') return;
      const [match, command, param] = message.match(/^(\/\S*)(.*)/i) || new Array(3);
      console.log(match);
      switch (command.toLowerCase()) {
        case '/help':
          this.chatHelp();
          break;
        case '/name':
          this.changeName(param.trim());
          break;
        case '/color':
          this.changeColor(param.trim());
          break;
        default:
          this.emitMessage(message);
          break;
      }
      // if (message.match(/^\/help/i)) {
      //   this.chatHelp();
      // }
      // if (message.match(/^\/name/i)) {
      //   this.changeName();
      // }
      // if (message.match(/^\/color/i)) {
      //   this.changeColor();
      // } else {
      //   this.emitMessage(this.messageText);
      // }
    },
    ...mapMutations({
      chatHelp: CHAT_HELP,
    }),
    ...mapActions({
      emitMessage: MESSAGE_SEND,
      changeName: PLAYER_CHANGE_NAME,
      changeColor: PLAYER_CHANGE_COLOR,
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
