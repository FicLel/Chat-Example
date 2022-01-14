<template>
  <div class='column is-9'>
    <div class='columns is-mobile is-centered is-vcentered is-multiline is-gapless no-margin'>
      <div class='column is-12 message-box__header'>
        <div class='message-box__header--body'>
          <div class='user-message__avatar'>
            <span>VH</span>
          </div>
          <div>
            {{getUserName}}
          </div>
        </div>
      </div>
      <div class='column is-12 message-box__body'>
        <div 
          class='columns is-multiline is-gapless no-margin' 
          v-for='dato in getMessages'>
          <div class='message-container'
            :class='dato.fromSelf ? "send" : "recived"'>
            <div class='own-message' >
              <p 
                class='message-text' 
                :class='dato.fromSelf ? "my-message" : "their-message"'>
                {{dato.message}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class='column is-12 message-box__footer'>
        <input 
          class='input is-normal'
          v-model='message'
          @keyup.enter.exact='sendNewMessage' 
          placeholder='Presiona enter para enviar el mensaje...'
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    username: {
      type: String,
    },
    messages: {
      type: Array,
    },
  },
  data() {
    return {
      message: '',
    }
  },
  methods: {
    sendNewMessage() {
      this.$emit('send', this.message);
      this.message = '';
    },
  },
  computed: {
    getUserName() {
      return this.username;
    },
    getMessages() {
      return [...this.messages];
    },
  },
};
</script>
