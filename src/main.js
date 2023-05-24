import 'bootstrap/dist/css/bootstrap.css';
import { createApp } from "vue";
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';

const token = localStorage.getItem('user-token')
// if (token) {
//   axios.defaults.headers.common['x-access-token'] = token  // this code of block prevent user logout - after refresh
// }

const app = createApp(App);

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://fastapi-server-ezey.onrender.com';  // the FastAPI backend
axios.interceptors.request.use(function (config) {
  // change the url scheme from http to https
  config.url = config.url.replace('http://', 'https://')

  return config
})

app.use(router);
app.use(store);
if (token) {
  localStorage.setItem("user-token", token);
}
app.mount("#app");