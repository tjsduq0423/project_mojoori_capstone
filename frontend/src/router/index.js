import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import * as authApi from "@/api/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {},
  },
  {
    path: "/report",
    name: "Report",
    component: () => import("@/views/Report.vue"),
    meta: { authReduired: false },
  },
  {
    path: "/user-authentication",
    name: "UserAuthentication",
    component: () => import("@/views/UserAuthentication.vue"),
    meta: {},
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("@/views/SignUp.vue"),
    meta: {},
  },
  {
    path: "/find-password",
    name: "FindPassword",
    component: () => import("@/views/FindPassword.vue"),
    meta: {},
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: () => import("@/views/ChangePassword.vue"),
    meta: {},
  },
  {
    path: "/email-authentication",
    name: "EmailAuthentication",
    component: () => import("@/views/EmailAuthentication.vue"),
    meta: {},
  },
  {
    path: "/email-authentication-done/:id",
    name: "EmailAuthenticationDone",
    component: () => import("@/views/EmailAuthenticationDone.vue"),
    meta: {},
  },
  {
    path: "/like-report",
    name: "LikeReport",
    component: () => import("@/views/LikeReport.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/board/:theme",
    name: "Board",
    component: () => import("@/views/Board.vue"),
    meta: { authReduired: false },
  },
  {
    path: "/my-board",
    name: "MyBoard",
    component: () => import("@/views/MyBoard.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/board-write",
    name: "BoardWrite",
    component: () => import("@/views/BoardWrite.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/board-modify/:id",
    name: "BoardModify",
    component: () => import("@/views/BoardModify.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/interest-corporation",
    name: "InterestCorporation",
    component: () => import("@/views/InterestCorporation.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/interest-industry",
    name: "InterestIndustry",
    component: () => import("@/views/InterestIndustry.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/article/:id",
    name: "Article",
    component: () => import("@/views/Article.vue"),
    meta: { authReduired: false },
  },
  {
    path: "/*",
    redirect: { name: "Home" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((routeInfo) => routeInfo.meta.authReduired === true)) {
    try {
      const response = await authApi.getUser();

      if (response.status === 200) {
        store.commit("auth/setUserInfo", {
          auth: true,
          userId: response.data.userId,
          nickname: response.data.nickname,
        });
        next();
      }
    } catch (err) {
      alert("로그인이 필요합니다");
      store.commit("auth/setUserInfo", {
        auth: false,
        userId: null,
        nickname: null,
      });
      next({ path: "/user-authentication" });
    }
  }
  if (to.matched.some((routeInfo) => routeInfo.meta.authReduired === false)) {
    try {
      const response = await authApi.getUser();

      if (response.status === 200) {
        // console.log(response.data.data);
        store.commit("auth/setUserInfo", {
          auth: true,
          userId: response.data.userId,
          nickname: response.data.nickname,
        });
        next();
      }
    } catch (err) {
      // console.log(err.response);
      store.commit("auth/setUserInfo", {
        auth: false,
        userId: null,
        nickname: null,
      });
      next();
    }
    // console.log(`routing success : '${to.path} '`);
    // next();
  }
  next();
});

export default router;
