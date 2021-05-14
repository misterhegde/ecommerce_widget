const state = {
  title: "true",
  image: "true",
  description: "true",
};

const mutations = {
  toggleTitle(state, title) {
    state.title = title.toString();
  },
  toggleImage(state, image) {
    state.image = image.toString();
  },
  toggleDescription(state, description) {
    state.description = description.toString();
  },
};

export default {
  state,
  mutations,
};
