import Vue, { createApp} from 'vue'
import App from './App.vue'
import wb from "./registerServiceWorker";

Vue.prototype.$workbox = wb;

createApp(App).mount('#app')
