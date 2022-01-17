<script setup>
import socket from './utils/socket.js';
import Vue, { ref, onUnmounted } from 'vue';
import chat from './components/chat.vue';
const messages = ref([]);
const name = ref('');
const contacts = ref([]);
const start = ref(false);
const id = ref(undefined);

const showUpdateUI = ref(false);

if (Vue.$workbox) {
  Vue.$workbox.addEventListener("waiting", () => {
    showUpdateUI.value = true;
  });
}

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const startChatting = () => {
  if (!name.value.trim() === false) {
    start.value = true;
    socket.auth = { username: name.value };
    socket.connect();
  }
}

const getMessages = (tempId) => {
  //We dont use forEach or prototypes of the array to keep reference
  for (let i = 0; i < contacts.value.length; i++) {
    if (contacts.value[i].userID === tempId) {
      messages.value = contacts.value[i].messages;
    }
  }
  //console.log('get messages', tempId);
}
// This method will send a new Message if userID is selected
const send = ({message, userID}) => {
  if (userID) {
    socket.emit("private message", {
      message,
      to: userID,
    });
    console.log('userID', userID);
    console.log('socket ID', socket.id);
    messages.value.push({message, fromSelf: true})
  }
}

onUnmounted(() => {
  socket.off("connect_error");
});
socket.on("connect_error", (err) => {
  if (err.message === "invalid username") {
    console.error(err);
    start.value = false;
  }
});
/*

    Reading users list

  */
socket.on("users", (users) => {
  let tempUser = [];
  users.forEach((user) => {
    user.self = user.userID === socket.id;
    tempUser.push({...user, messages: [], connect: true});
  });
  // put the current user first, and then sort by username
  tempUser = tempUser.sort((a, b) => {
    if (a.self) return -1;
    if (b.self) return 1;
    if (a.username < b.username) return -1;
    return a.username > b.username ? 1 : 0;
  });
  contacts.value = [...tempUser];
  console.log(tempUser);
});
// Listening new users joining

const verifyUserName = ({username, userID}) => {
  let toSend = false;
  for (let i = 0; i < contacts.value.length; i++) {
    if (contacts.value[i].username === username) {
      toSend = true; 
      contacts.value[i].userID = userID;
      contacts.value[i].connect = true;
      break;
    }
  } 
  return toSend;
};

socket.on("user connected", (user) => {
  alert('un usuario se ha conectado');
  if (!verifyUserName(user)) {
    contacts.value = [
      ...contacts.value, 
      {
        ...user, 
        self: false, 
        messages: [],
        connect: true,
      }
    ];
    console.log(user);
  }
});
/*

  Waiting for messages

 */
socket.on("private message", ({ message, from }) => {
  for (let i = 0; i < contacts.value.length; i++) {
    // This time we will keep the reference avoid spread operator
    const user = contacts.value[i];
    if (user.userID === from) {
      user.messages.push({
        message,
        fromSelf: false,
      });
      if (user.userID !== id.value) {
        user.hasNewMessages = true;
      }
      break;
    }
  }
});

// Online, offline values

socket.on("connect", () => {
  contacts.value.forEach((user) => {
    if (user.self) {
      user.connected = true;
    }
  });
});

socket.on("disconnect", () => {
  contacts.value.forEach((user) => {
    if (user.self) {
      user.connected = false;
    }
  });
});

// Each time a user disconnects we change their status
socket.on('user disconnected', ({userID}) => {
  alert('un usuario se ha desconectado');
  for (let i = 0; i < contacts.value.length; i++) {
    if (userID === contacts.value[i].userID) {
      contacts.value[i].connect = false; 
      break;
    } 
  }  
});

socket.on("session", ({ sessionID, userID }) => {
  // attach the session ID to the next reconnection attempts
  socket.auth = { sessionID };
  // store it in the localStorage
  localStorage.setItem("sessionID", sessionID);
  // save the ID of the user
  socket.userID = userID;
});

</script>

<template>
  <div>
    <chat
      v-if="start"
      :contacts='contacts'
      :messages='messages'
      v-model:id='id'
      @fetch-chat='getMessages'
      @send='send'
    />
    <div v-else>
      <div class='columns is-mobile is-vcentered is-centered login'>
        <div class='column is-half form-login'>
          <label>Ingrese el nombre</label>
          <input class="input is-info" v-model='name' @keyup.enter.exact='startChatting()'/>
          <button @click='startChatting()' class='button is-info'>Iniciar</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang='scss'>
@import './assets/styles/main.scss';
</style>
