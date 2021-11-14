export default {
  namespaced: true,
  state: {
    auth: false,
    userId: "",
    nickname: "",
  },
  getters: {},
  mutations: {
    setAuth(state, data) {
      state.auth = data;
    },
    setUserId(state, data) {
      state.userId = data;
    },
    setNickname(state, data) {
      state.nickname = data;
    },
  },
  actions: {},
};
