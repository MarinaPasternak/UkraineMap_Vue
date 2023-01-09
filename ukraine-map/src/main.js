import * as Vue from 'vue';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.createApp(App).use(router, store).mount('#app');
