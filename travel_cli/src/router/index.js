import { createRouter, createWebHashHistory } from "vue-router";
import Register from "../views/login/Register.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Foods" */ "../views/login/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },

  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/home/Home.vue"),
    meta: {
      keepAlive: true, // 需要被缓存
    },
  },
  {
    path: "/info",
    name: "Info",
    component: () =>
      import(/* webpackChunkName: "Info" */ "../views/info/Info.vue"),
  },
  {
    path: "/notes",
    name: "Notes",
    component: () =>
      import(/* webpackChunkName: "Notes" */ "../views/notes/Notes.vue"),
  },
  {
    path: "/addOrder",
    name: "addOrder",
    component: () =>
      import(/* webpackChunkName: "Notes" */ "../views/home/addOrder.vue"),
  },
  {
    path: "/getAllOrder",
    name: "getAllOrder",
    component: () =>
      import(/* webpackChunkName: "Notes" */ "../views/home/getAllOrder.vue"),
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
