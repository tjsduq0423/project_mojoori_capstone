import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import list from "./list";
import auth from "./auth";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    list,
    auth,
  },
});
