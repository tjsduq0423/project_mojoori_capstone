import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import * as authApi from "@/api/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Default",
    component: () => import("@/views/Default.vue"),
    meta: { authReduired: false },
  },
  {
    path: "/user-authentication",
    name: "UserAuthentication",
    component: () => import("@/views/UserAuthentication.vue"),
    meta: { authReduired: false },
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: () => import("@/views/SignUp.vue"),
    meta: { authReduired: false },
  },
  {
    path: "/find-password",
    name: "FindPassword",
    component: () => import("@/views/FindPassword.vue"),
    meta: { authReduired: false },
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: () => import("@/views/ChangePassword.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/email-authentication",
    name: "EmailAuthentication",
    component: () => import("@/views/EmailAuthentication.vue"),
    meta: { authReduired: false },
  },
  //라우터 가드 넣어야함. 인증 페이지임.
  {
    path: "/email-authentication-done/:id",
    name: "EmailAuthenticationDone",
    component: () => import("@/views/EmailAuthenticationDone.vue"),
    meta: { authReduired: false },
  },
  {
    path: "/logined",
    name: "Logined",
    component: () => import("@/views/Logined.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/bookmark",
    name: "Bookmark",
    component: () => import("@/views/Bookmark.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/board-logined",
    name: "BoardLogined",
    component: () => import("@/views/BoardLogined.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/like-report",
    name: "LikeReport",
    component: () => import("@/views/LikeReport.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/board",
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
    path: "/article-logined/:id",
    name: "ArticleLogined",
    component: () => import("@/views/ArticleLogined.vue"),
    meta: { authReduired: true },
  },
  {
    path: "/*",
    redirect: { name: "Default" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((routeInfo) => routeInfo.meta.authReduired)) {
    try {
      const response = await authApi.getUser();

      if (response.status === 200) {
        store.commit("auth/setUserId", response.data.userId);
        store.commit("auth/setNickname", response.data.nickname);
        store.commit("auth/setAuth", true);
        next();
      }
    } catch (err) {
      // console.log(err.response.data.message);
      alert("로그인이 필요합니다");
      store.commit("auth/setAuth", false);
      next({ path: "/user-authentication" });
    }
  } else {
    try {
      const response = await authApi.getUser();

      if (response.status === 200) {
        // console.log(response.data.data);
        store.commit("auth/setUserId", response.data.userId);
        store.commit("auth/setNickname", response.data.nickname);
        store.commit("auth/setAuth", true);
        next({ path: "/logined" });
      }
    } catch (err) {
      // console.log(err.response);
      store.commit("auth/setAuth", false);
      next();
    }
    // console.log(`routing success : '${to.path} '`);
    // next();
  }
});

export default router;
