import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import list from "./list";
import auth from "./auth";
import interest from "./interest";
import board from "./board";
import tag from "./tag";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    list,
    auth,
    interest,
    board,
    tag,
  },
  plugins: [
    createPersistedState({
      paths: ["tag"],
    }),
  ],
});
