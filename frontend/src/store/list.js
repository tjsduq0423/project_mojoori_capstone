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
      console.log(response.data.data.reports);
      commit("setList", response.data.data.reports);
      commit("setListCount", response.data.data.reports.length);
    },
    async callLikeData({ commit }) {
      const response = await reportApi.likereport();
      console.log(response.data.data);
      commit("setList", response.data.data);
      commit("setListCount", response.data.data.length);
    },
  },
};
