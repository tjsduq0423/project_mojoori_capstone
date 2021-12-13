import * as reportApi from "@/api/report";

export default {
  namespaced: true,
  state: {
    list: [],
    listCount: 0,
    _list: [],
    IncreaseSortDone: false,
    chips: 0,
  },
  getters: {
    chips: (state) => {
      return state.chips;
    },
  },
  mutations: {
    changechips(state, data) {
      state.chips = data;
    },
    changeIncreaseSortDone(state) {
      state.IncreaseSortDone = false;
    },
    setList(state, data) {
      const data2 = data.sort(
        (a, b) => new Date(b.report_date) - new Date(a.report_date)
      );
      state._list = data2;
      let arr = [];
      data2.forEach((value, index) => {
        if (index % 20 == 0) arr.push(data2.slice(index, index + 20));
      });
      state.list = arr;
    },
    setListCount(state, data) {
      state.listCount = data;
    },
    filter(state, data) {
      if (data == 0) {
        let arr = [];
        state._list.forEach((value, index) => {
          if (index % 20 == 0) arr.push(state._list.slice(index, index + 20));
        });
        state.list = arr;
        state.listCount = state._list.length;
      } else {
        const data3 = state._list.filter((v) => v.cla_no == data);
        let arr = [];
        data3.forEach((value, index) => {
          if (index % 20 == 0) arr.push(data3.slice(index, index + 20));
        });
        state.list = arr;
        state.listCount = data3.length;
      }
    },
    IncreaseSort(state, data) {
      if (data > 1) return;
      if (!state.IncreaseSortDone) {
        let arr = [];
        let temp =
          data === 0
            ? [...state._list]
            : [...state._list].filter((v) => v.cla_no === 1);
        temp.sort((a, b) => b.report_upside - a.report_upside);
        temp.forEach((value, index) => {
          if (index % 20 == 0) arr.push(temp.slice(index, index + 20));
        });
        state.list = arr;
        state.IncreaseSortDone = true;
      } else {
        let arr = [];
        let temp =
          data === 0
            ? [...state._list]
            : [...state._list].filter((v) => v.cla_no === 1);
        temp.forEach((value, index) => {
          if (index % 20 == 0) arr.push(temp.slice(index, index + 20));
        });
        state.list = arr;
        state.IncreaseSortDone = false;
      }
    },
  },
  actions: {
    async callData({ commit }) {
      const response = await reportApi.report();
      commit("setList", response.data.data);
      commit("setListCount", response.data.data.length);
    },
    async callSearchData({ commit }, payload) {
      const response = await reportApi.SearchReport(payload);
      commit("setList", response.data.data);
      commit("setListCount", response.data.data.length);
      commit("changechips", 0);
      commit("changeIncreaseSortDone");
    },
    async callLikeData({ commit }, payload) {
      const response = await reportApi.callLikeReport(payload);
      commit("setList", response.data.rows02);
      commit("setListCount", response.data.rows02.length);
    },
    async callInterestCorporationData({ commit }, payload) {
      const response = await reportApi.callInterestCorporationData(payload);
      commit("setList", response.data.rows3);
      commit("setListCount", response.data.rows3.length);
    },
    async callInterestIndustryData({ commit }, payload) {
      const response = await reportApi.callInterestIndustryData(payload);
      commit("setList", response.data.rows3);
      commit("setListCount", response.data.rows3.length);
    },
  },
};
