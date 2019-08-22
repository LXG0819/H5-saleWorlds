const _state = {
  user: null
}

const mutations = {
  updateUser (state, user) {
    state.user = user
  }
}
const getters = {
  getUser(state) {
    return state.user
  }
}
const actions = {
  changeUser(context, user) {
    context.commit('updateUser', user)
  }
}

export default {
  state: _state,
  getters,
  mutations,
  actions
}
