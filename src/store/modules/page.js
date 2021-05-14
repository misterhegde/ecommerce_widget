const state = {
  page: 1,
  url: "",
};
const getters = {
  getPage: (state) => state.page,
  getUrl: (state) => state.url,
};

const actions = {
  setPageAction({ commit }, payload) {
    commit("setPageMutation", payload);
  },
  setUrlAction({ commit }, payload) {
    commit("setUrlMutation", payload);
  },
};

const mutations = {
  setPageMutation(state, payload) {
    if (payload === "forw") state.page++;

    if (payload === "prev" && state.page !== 1) state.page--;
  },
  setUrlMutation(state, payload) {
    state.url = payload;
    console.log("vuex", state.url);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
