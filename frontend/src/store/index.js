import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import list from "./list";
import auth from "./auth";
import interest from "./interest";
import board from "./board";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    list,
    auth,
    interest,
    board,
  },
});
