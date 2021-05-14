const state = {
  themeName: "",
};
const getters = {
  getThemeName: (state) => state.themeName,
};

const actions = {
  setThemeNameAction({ commit }, payload) {
    commit("setThemeNameMutation", payload);
  },
};

const mutations = {
  setThemeNameMutation(state, payload) {
    state.themeName = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
