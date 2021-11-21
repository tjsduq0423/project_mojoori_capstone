export default {
  namespaced: true,
  state: {
    auth: false,
    userId: "",
    nickname: "",
  },
  getters: {},
  mutations: {
    setUserInfo(state, data) {
      state.auth = data.auth;
      state.userId = data.userId;
      state.nickname = data.nickname;
    },
  },
  actions: {},
};
