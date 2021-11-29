import * as interestApi from "@/api/interest";

export default {
  namespaced: true,
  state: {
    stocks: [],
    industries: [],
    stockscount: "",
    industriescount: "",
    _stocks: [],
    s: "",
  },
  mutations: {
    setStocks(state, data) {
      let arr = [];
      data.forEach((value, index) => {
        if (index % 25 == 0) arr.push(data.slice(index, index + 25));
      });
      state.stocks = arr;
      state._stocks = data;
    },
    setStocksCount(state, data) {
      state.stockscount = data;
    },
    setIndustriesCount(state, data) {
      state.industriescount = data;
    },
    setIndustries(state, data) {
      let arr = [];
      data.forEach((value, index) => {
        if (index % 25 == 0) arr.push(data.slice(index, index + 25));
      });
      state.industries = arr;
    },
  },
  actions: {
    async callInterest({ commit }) {
      const responsestock = await interestApi.stock();
      const responseindustry = await interestApi.industry();
      commit("setStocks", responsestock.data.stocks);
      commit("setStocksCount", responsestock.data.stocks.length);
      commit("setIndustries", responseindustry.data.industries);
      commit("setIndustriesCount", responseindustry.data.industries.length);
    },
    async callSearchStocks({ commit }, payload) {
      const responsestock = await interestApi.getSearchStocks(payload);
      console.log(responsestock);
      //const responseindustry = await interestApi.industry();
      commit("setStocks", responsestock.data.stocks);
      commit("setStocksCount", responsestock.data.stocks.length);
      //commit("setIndustries", responseindustry.data.industries);
      //commit("setIndustriesCount", responseindustry.data.industries.length);
    },
  },
};
