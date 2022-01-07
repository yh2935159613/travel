import Router from 'vue-router'
import Home from '../pages/home/Home'
import Login from '../pages/loginRegister/LoginRegister'
import HotScenic from '../components/HotScenic'
import HotScenicDetail from '../components/HotScenicDetail.vue'
import HotNotes from '../components/HotNotes.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/hotScenic',
    name: 'HotScenic',
    component: HotScenic,
  },
  {
    path: '/hotScenicDetail',
    name: 'HotScenicDetail',
    component: HotScenicDetail,
  },
  {
    path: '/hotNotes',
    name: 'HotNotes',
    component: HotNotes,
  },
]

const router = new Router({
  routes
})
export default router
