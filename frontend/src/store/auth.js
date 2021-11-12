import * as authApi from "@/api/auth";

export default {
  namespaced: true,
  state: {
    accessToken: null,
    refreshToken: null,
  },
  getters: {},
  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
    },
  },
  actions: {
    async login({ commit }, { userId, password, stateMaintain }) {
      try {
        const response = await authApi.login(userId, password, stateMaintain);

        if (response.status === 200) {
          commit("setAccessToken", response.data.accesstoken);
          commit("setRefreshToken", response.data.refreshToken);
        }
      } catch (err) {
        alert("아이디 비밀번호를 확인해주세요.");
      }
    },
  },
};
