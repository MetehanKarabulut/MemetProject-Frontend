import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePageView.vue'
import FirstPage from '../views/FirstPageView.vue'
import LogPage from '../views/LogPageView.vue'
import UserPage from '../components/UserPage/UserPage.vue'
import AdminPage from '../components/AdminPage/AdminPage.vue'
import InfoPage from '../components/InfoPage/InfoPage.vue'
import MainPage from '../components/MainPage/MainPage.vue'


const routes = [
  {
    path: '/login',
    name: 'login',
    component:LogPage
  },
  {
    path: '/signup',
    name: 'signup',
    component:LogPage
  },
  {
    path: '/home',
    name: 'homepage',
    component: HomePage
  },
  {
    path:'/first',
    name:'firstpage',
    component:FirstPage
  },
  {
    path:'/logpage',
    name:'logpage',
    component:LogPage
  },
  {
    path:'/user',
    name:'UserPage',
    component:UserPage
  },
  {
    path:'/admin',
    name:'AdminPage',
    component:AdminPage
  },
  {
    path:'/info',
    name:'InfoPage',
    component:InfoPage
  },
  {
    path:'/main',
    name:'MainPage',
    component:MainPage
  }

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
