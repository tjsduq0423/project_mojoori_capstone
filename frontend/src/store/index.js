import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import list from "./list";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    list,
  },
});
