<template>
  <div class='column is-3 container border-right'>
    <div class='columns is-multiline is-gapless'>
      <div class='column is-12 list-messages__header--container'>
        <div class='list-messages__header'>
          <div class='list-messages__header--text'>
            <span>Looking for a specific chat?</span>
          </div>
          <div class='list-messages__header--input'>
            <!-- <input  class='input is-normal' placeholder='write here what are you looking for...'/> -->
          </div>
        </div>
      </div>
      <div class='column is-12 message-list__container' >
        <div 
          class='columns is-multiline is-gapless no-margin' 
          v-for='dato in  data'
          @click='changeActualUserChat(dato)'
        >
          <div class='column is-12'>
            <div class='user-message__container'>
              <div class='user-message__avatar'>
                <span>VH</span>
              </div>
              <div class='user-message__body'>
                <div class='user-message__body-name'>
                  <span>{{dato.username}} {{hostName(dato)}}</span>
                </div>
                <div class='user-message__body-message'>
                  <span>{{isConnected(dato.connect)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    contacts: {
      type: Array,
    },
  },
  methods: {
    changeActualUserChat({username, userID}) {
      if (username && userID) {
        this.$emit('update:name', username);
        this.$emit('update:id', userID);
        this.$emit('change-values');
      }
    },
    hostName({self: selfValue}) {
      return selfValue ? '- Eres tu' : '';
    },
    isConnected(connect) {
      return connect ? 'En linea' : 'Lejos del chat';
    },
  },
  computed: {
    data() {
      return this.contacts;
    },
  },
}
</script>
