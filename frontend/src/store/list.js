import * as reportApi from "@/api/report";

export default {
  namespaced: true,
  state: {
    list: [],
    listCount: 0,
    _list: [],
  },
  mutations: {
    setList(state, data) {
      state._list = data;
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
    IncreaseSort(state) {
      state._list.sort((a, b) => b.report_upside - a.report_upside);
      let arr = [];
      state._list.forEach((value, index) => {
        if (index % 20 == 0) arr.push(state._list.slice(index, index + 20));
      });
      state.list = arr;
    },
  },
  actions: {
    async callData({ commit }) {
      const response = await reportApi.report();
      console.log(response);
      commit("setList", response.data.data);
      commit("setListCount", response.data.data.length);
    },
    async callCorporationData({ commit }) {
      const response = await reportApi.CorporationReport();
      console.log(response);
      commit("setList", response.data.data);
      commit("setListCount", response.data.data.length);
    },
    async callIndustryData({ commit }) {
      const response = await reportApi.IndustryReport();
      console.log(response);
      commit("setList", response.data.data);
      commit("setListCount", response.data.data.length);
    },
    async callMarketData({ commit }) {
      const response = await reportApi.MarketReport();
      console.log(response);
      commit("setList", response.data.data);
      commit("setListCount", response.data.data.length);
    },
    async callLikeData({ commit }, payload) {
      const response = await reportApi.callLikeReport(payload);
      console.log(response.data.rows02);
      commit("setList", response.data.rows02);
      commit("setListCount", response.data.rows02.length);
    },
    async callInterestCorporationData({ commit }, payload) {
      const response = await reportApi.callInterestCorporationData(payload);
      console.log(response);
      commit("setList", response.data.rows3);
      commit("setListCount", response.data.rows3.length);
    },
    async callInterestIndustryData({ commit }, payload) {
      const response = await reportApi.callInterestIndustryData(payload);
      console.log(response);
      commit("setList", response.data.rows3);
      commit("setListCount", response.data.rows3.length);
    },
  },
};
