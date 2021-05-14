import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import page from "./modules/page";
import widgetSettings from "./modules/widgetSettings";
import themes from "./modules/themes";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: { page, widgetSettings, themes },
  plugins: [createPersistedState()],
});
