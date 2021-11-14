import * as reportApi from "@/api/report";

export default {
  namespaced: true,
  state: {
    list: [],
    listCount: 0,
  },
  mutations: {
    setList(state, data) {
      let arr = [];
      data.forEach((value, index) => {
        if (index % 20 == 0) arr.push(data.slice(index, index + 20));
      });
      state.list = arr;
    },
    setListCount(state, data) {
      state.listCount = data;
    },
    LikeOn(state, data) {
      state.list[data].likes = true;
    },
    LikeOff(state, data) {
      state.list[data].likes = false;
    },
  },
  actions: {
    async callData({ commit }) {
      const response = await reportApi.report();
      commit("setList", response.data.data.reports);
      commit("setListCount", response.data.data.reports.length);
    },
  },
};
