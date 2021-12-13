import * as tagApi from "@/api/tag";
export default {
  namespaced: true,
  state: {
    tags: [],
    PopularStock: [],
    PopularIndustry: [],
    PopularAuthor: [],
  },
  getters: {},
  mutations: {
    InsertTags(state, data) {
      let arr = [];
      for (var i = 0; i < state.tags.length; i++) {
        arr.push(state.tags[i].magnify);
      }
      if (data.magnify != null && !arr.includes(data.magnify)) {
        if (state.tags.length < 5) {
          state.tags.unshift(data);
        } else {
          state.tags.pop();
          state.tags.unshift(data);
        }
      }
    },
    setPopularStock(state, data) {
      let a = data;
      state.PopularStock.splice(0);
      for (var i = 0; i < a.length; i++) {
        state.PopularStock.push(a[i].company_name);
      }
    },
    setPopularIndustry(state, data) {
      let a = data;
      state.PopularIndustry.splice(0);
      for (var i = 0; i < a.length; i++) {
        state.PopularIndustry.push(a[i].industry_type);
      }
    },
    setPopularAuthor(state, data) {
      state.PopularAuthor.splice(0);
      for (var i = 0; i < data.length; i++) {
        state.PopularAuthor.push(data[i].anal_name);
      }
    },
    RemoveTags(state, data) {
      state.tags.splice(data, 1);
    },
  },
  actions: {
    async callPopularStock({ commit }) {
      const response = await tagApi.PopularStock();
      commit("setPopularStock", response.data.rows);
    },
    async callPopularIndustry({ commit }) {
      const response = await tagApi.PopularIndustry();
      commit("setPopularIndustry", response.data.rows);
    },
    async callPopularAuthor({ commit }) {
      const response = await tagApi.PopularAuthor();
      commit("setPopularAuthor", response.data.rows);
    },
  },
};
