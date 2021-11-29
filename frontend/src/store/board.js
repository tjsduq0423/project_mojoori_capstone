import * as boardApi from "@/api/board";

export default {
  namespaced: true,
  state: {
    articles: [],
    pages: null,
  },
  getters: {},
  mutations: {
    setArticles(state, data) {
      let arr = [];
      data.forEach((value, index) => {
        if (index % 25 === 0) arr.push(data.slice(index, index + 25));
      });
      state.pages = arr.length;
      state.articles = arr;
    },
  },
  actions: {
    async callArticles({ commit }, { theme }) {
      try {
        const response = await boardApi.board(theme);
        if (response.status === 200) {
          commit("setArticles", response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
