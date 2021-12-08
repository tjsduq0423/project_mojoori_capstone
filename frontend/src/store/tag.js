export default {
  namespaced: true,
  state: {
    tags: [],
  },
  getters: {},
  mutations: {
    InsertTags(state, data) {
      let arr = [];
      for (var i = 0; i < state.tags.length; i++) {
        arr.push(state.tags[i].magnify);
      }
      console.log(arr);
      if (data.magnify != null && !arr.includes(data.magnify)) {
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
