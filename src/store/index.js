import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import extra from './modules/extra'
import direction from './modules/direction'
import loading from './modules/loading'
import page from './modules/pages'
import video from './modules/videourl'
import label from './modules/label'
import position from './modules/position'

Vue.use(Vuex)

// 使用频率高，赋给全局变量
for (let item of ['mapState', 'mapGetters', 'mapMutations', 'mapActions']) {
  window[item] = Vuex[item]
}

// 注册到 vm，可以通过 this.$vuex 调用
// Vue.prototype.$vuex = Vuex

export default new Vuex.Store({
  modules: {
    user,
    extra,
    direction,
    loading,
    page,
    video,
    label,
    position
  }
})
