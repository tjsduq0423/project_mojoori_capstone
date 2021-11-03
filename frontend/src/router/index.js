import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Default",
    component: () => import("@/views/Default.vue"),
  },
  {
    path: "/user-authentication",
    name: "UserAuthentication",
    component: () => import("@/views/UserAuthentication.vue"),
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/find-password",
    name: "FindPassword",
    component: () => import("@/views/FindPassword.vue"),
  },
  {
    path: "/email-authentication",
    name: "EmailAuthentication",
    component: () => import("@/views/EmailAuthentication.vue"),
  },
  {
    path: "/logined",
    name: "Logined",
    component: () => import("@/views/Logined.vue"),
  },
  {
    path: "/board-logined",
    name: "BoardLogined",
    component: () => import("@/views/BoardLogined.vue"),
  },
  {
    path: "/board",
    name: "Board",
    component: () => import("@/views/Board.vue"),
  },
  {
    path: "/my-board",
    name: "MyBoard",
    component: () => import("@/views/MyBoard.vue"),
  },
  {
    path: "/interest",
    name: "Interest",
    component: () => import("@/views/Interest.vue"),
  },
  {
    path: "/like-report",
    name: "LikeReport",
    component: () => import("@/views/LikeReport.vue"),
  },
  {
    path: "/*",
    redirect: { path: "/" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
