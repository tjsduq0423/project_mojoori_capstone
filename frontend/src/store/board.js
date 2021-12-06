import * as boardApi from "@/api/board";

export default {
  namespaced: true,
  state: {
    articles: [],
    pages: null,
    articleslength: null,
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
    setArticleslength(state, data) {
      state.articleslength = data;
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
    async callMyArticles({ commit }, payload) {
      try {
        const response = await boardApi.myboard(payload);
        if (response.status === 200) {
          console.log(response.data.data);
          commit("setArticles", response.data.data);
          commit("setArticleslength", response.data.data.length);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
