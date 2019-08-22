const _state = {
  positionTop: null
}

const mutations = {
  updatePositionTop (state, positionTop) {
    state.positionTop = positionTop
  }
}
const getters = {
  getPositionTop(state) {
    return state.positionTop
  }
}
const actions = {
  changePositionTop(context, positionTop) {
    context.commit('updatePositionTop', positionTop)
  }
}

export default {
  state: _state,
  getters,
  mutations,
  actions
}