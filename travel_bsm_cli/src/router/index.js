import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../views/Layout.vue'

const routes = [
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import(/* webpackChunkName: "about" */ '../views/user/User.vue'),
        children: [{
          path: '/getAlluser',
          name: 'GetAlluser',
          component: () => import(/* webpackChunkName: "about" */ '../views/user/GetAlluser.vue'),
        },
        {
          path: '/getPersonInfo',
          name: 'GetPersonInfo',
          component: () => import(/* webpackChunkName: "about" */ '../views/user/GetPersonInfo.vue'),
        },

        ]
      },
      {
        path: '/scenic',
        name: 'Scenic',
        component: () => import(/* webpackChunkName: "about" */ '../views/scenic/Scenic.vue'),
      },
      {
        path: '/article',
        name: 'Article',
        component: () => import(/* webpackChunkName: "about" */ '../views/article/Article.vue')
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import(/* webpackChunkName: "about" */ '../views/order/Order.vue')
      },
      {
        path: '/comment',
        name: 'Comment',
        component: () => import(/* webpackChunkName: "about" */ '../views/comment/Comment.vue')
      },
      {
        path: '/updatePassword',
        name: 'UpdatePassword',
        component: () => import(/* webpackChunkName: "about" */ '../views/updatePassword/updatePassword.vue')
      },
      {
        path: '/upload',
        name: 'Upload',
        component: () => import(/* webpackChunkName: "about" */ '../views/upload/upload.vue')
      },

    ]
  },
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/loginRegister/LoginRegister.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    return next()
  } else {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return next('/')
    }
  }
  next()
})

export default router
