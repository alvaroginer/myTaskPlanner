import { createApp } from 'vue';
import { store } from './store';
import './style.css';
import App from './App.vue';
import router from './router/router';

await store.dispatch('initFirebaseAuth');

createApp(App).use(router).use(store).mount('#app');
