const _state = {
  label: {
    tmId: 0,
    tmName: '',
    tagList: []
  }
}

const mutations = {
  updateLabel(state, label) {
    state.label = label
  }
}
const getters = {
  getLabel(state) {
    return state.label
  }
}
const actions = {
  changeLabel(context, label) {
    context.commit('updateLabel', label)
  }
}

export default {
  state: _state,
  getters,
  mutations,
  actions
}
