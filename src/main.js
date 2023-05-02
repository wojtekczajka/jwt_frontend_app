import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from "vue";
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['x-access-token'] = token  // this code of block prevent user logout - after refresh
}

const app = createApp(App);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://13.53.107.44';  // the FastAPI backend

app.use(router);
app.use(store);
app.mount("#app");