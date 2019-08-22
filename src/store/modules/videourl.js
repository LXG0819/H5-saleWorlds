const _state = {
  video: null
}

const mutations = {
  updateVideo (state, video) {
    state.video = video
  }
}
const getters = {
  getVideo(state) {
    return state.video
  }
}
const actions = {
  changeVideo(context, video) {
    context.commit('updateUser', video)
  }
}

export default {
  state: _state,
  getters,
  mutations,
  actions
}