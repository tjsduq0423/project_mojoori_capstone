import * as authApi from "@/api/auth";

export default {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, { userId, password, stateMaintain }) {
      try {
        const response = await authApi.login(userId, password, stateMaintain);

        if (response.status === 200) {
          commit("setToken", response.data.token);
        }
      } catch (err) {
        alert("아이디 비밀번호를 확인해주세요.");
      }
    },
  },
};
