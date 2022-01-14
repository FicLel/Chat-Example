<template>
  <div class='columns is-gapless'>
    <contacts 
      :contacts='data'
      v-model:name='username'
      v-model:id='userID'
      @change-values='fetchChat'
    /> 
    <!-- Messages -->
    <messages 
      :username='getUserName'
      :messages='messages'
      @send='send'
    /> 
  </div>
</template>
<script>
import contacts from './contact-list.vue';
import messages from './messages.vue';
export default {
  components: {
    contacts,
    messages,
  },
  props: {
    contacts: {
      type: Array,
    },
    messages: {
      type: Array,
    },
  },
  data() {
    return {
      username: 'Choose a chat',
      userID: undefined,
    }
  },
  methods: {
    fetchChat() {
      this.$emit('update:id', this.userID);
      this.$emit('fetch-chat', this.userID);
    },
    send(message) {
      this.$emit('send', {message, userID: this.userID});
    },
  },
  computed: {
    data() {
      return this.contacts;
    },
    getUserName() {
      return this.username;
    },
    getMessages() {
      return [...this.messages];
    },
  },

};
</script>
