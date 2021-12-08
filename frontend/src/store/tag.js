export default {
  namespaced: true,
  state: {
    tags: [],
  },
  getters: {},
  mutations: {
    InsertTags(state, data) {
      if (data.magnify != null && !state.tags.includes(data.magnify)) {
        if (state.tags.length < 5) {
          state.tags.unshift(data);
        } else {
          state.tags.pop();
          state.tags.unshift(data);
        }
      }
    },
    RemoveTags(state, data) {
      state.tags.splice(data, 1);
    },
  },
  actions: {},
};
