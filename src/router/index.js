import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import UserView from '../views/UserView.vue'
// import store from '../store'
// import { AUTH_LOGOUT } from "../store/actions/auth";

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/resources',
    name: 'resources',
    component: ResourcesView
  },
  {
    path: '/profile',
    name: 'user',
    component: UserView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// this code of block check token_exp every time user change ui path

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.getters.isAuthenticated
//   const tokenExp = store.state.auth.token_exp

//   if (isAuthenticated) {
//     const now = new Date().getTime() / 1000
//     console.log(now);
//     console.log(tokenExp);
//     if (tokenExp < now) {
//       store.dispatch(AUTH_LOGOUT).then(() => {
//         alert("Access token expired. You will be automatically logged out.")
//       })
//     } else {
//       // The user is authenticated and the token has not expired, allow them to proceed
//       next()
//     }
//   } else {
//     // The user is not authenticated and the route does not require authentication, allow them to proceed
//     next()
//   }
// })

export default router
