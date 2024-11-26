import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import vuetify from './plugins/vuetify';  
import 'vuetify/styles';

axios.defaults.baseURL = 'https://three275-finalbackend.onrender.com/api';

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);
app.use(vuetify);
app.mount('#app');
