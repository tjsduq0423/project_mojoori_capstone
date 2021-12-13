import * as boardApi from "@/api/board";

export default {
  namespaced: true,
  state: {
    _articles: [],
    articles: [],
    pages: null,
    articleslength: null,
  },
  getters: {},
  mutations: {
    setArticles(state, data) {
      let arr = [];
      const temp = data.sort(
        (a, b) => new Date(b.board_reg_date) - new Date(a.board_reg_date)
      );
      temp.forEach((value, index) => {
        if (index % 25 === 0) arr.push(temp.slice(index, index + 25));
      });
      state.pages = arr.length;
      state.articles = arr;
      state._articles = temp;
    },
    setArticleslength(state, data) {
      state.articleslength = data;
    },
    sortArticles(state, data) {
      if (data === "최신순") {
        let arr = [];
        const temp = state._articles.sort(
          (a, b) => new Date(b.board_reg_date) - new Date(a.board_reg_date)
        );
        temp.forEach((value, index) => {
          if (index % 25 === 0) arr.push(temp.slice(index, index + 25));
        });
        state.articles = arr;
      } else {
        let arr = [];
        const temp = state._articles.sort(
          (a, b) => b.board_like - a.board_like
        );
        temp.forEach((value, index) => {
          if (index % 25 === 0) arr.push(temp.slice(index, index + 25));
        });
        state.articles = arr;
      }
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
          commit("setArticles", response.data.data);
          commit("setArticleslength", response.data.data.length);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async searchArticles({ commit }, { searchData, theme }) {
      try {
        const response = await boardApi.searchBoard(searchData, theme);
        if (response.status === 200) {
          commit("setArticles", response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
