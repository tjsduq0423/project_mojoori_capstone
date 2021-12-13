import * as interestApi from "@/api/interest";

export default {
  namespaced: true,
  state: {
    stocks: [],
    industries: [],
    stockscount: "",
    industriescount: "",
    _stocks: [],
    _industries: [],
    pages: "",
    authors: [],
  },
  mutations: {
    setStocks(state, data) {
      let arr = [];
      data.forEach((value, index) => {
        if (index % 25 === 0) arr.push(data.slice(index, index + 25));
      });
      state.stocks = arr;
      state._stocks = data;
    },
    setpages(state, data) {
      state.pages = Math.ceil(data / 25);
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
      state._industries = data;
    },
    setauthors(state, data) {
      state.authors = data;
    },
  },
  actions: {
    async callInterest({ commit }) {
      const responsestock = await interestApi.stock();
      const responseindustry = await interestApi.industry();
      const responseauthor = await interestApi.author();
      commit("setStocks", responsestock.data.stocks);
      commit("setStocksCount", responsestock.data.stocks.length);
      commit("setpages", responsestock.data.stocks.length);
      commit("setIndustries", responseindustry.data.industries);
      commit("setIndustriesCount", responseindustry.data.industries.length);
      commit("setauthors", responseauthor.data.authors);
    },
    async callSearchStocks({ commit }, payload) {
      const responsestock = await interestApi.getSearchStocks(payload);
      commit("setStocks", responsestock.data.stocks);
      commit("setStocksCount", responsestock.data.stocks.length);
      commit("setpages", responsestock.data.stocks.length);
    },
  },
};
