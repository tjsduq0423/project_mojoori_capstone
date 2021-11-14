export default {
  namespaced: true,
  state: {
    auth: false,
  },
  getters: {},
  mutations: {
    setAuth(state, data) {
      state.auth = data;
    },
  },
  actions: {},
};
