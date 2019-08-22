/**
 * 项目全局库管理
 */
import * as lib from '@/common/lib/index'
import native from '@/common/lib/native'
import config from '@/config/index'
import cubeModule from '@/../CubeModule.json'
import service from '@/service.js'
import Vue from 'vue'
import MintUI from 'mint-ui' // mint-ui
// import flexible from '@/common/lib/Flexible'
import FastClick from 'fastclick'
//import VueScroller from 'vue-scroller'
// import 'assets/css/index.less'
/**
 * 给vue添加prototype属性
 */
// Vue.prototype.$messageBox = MessageBox
Vue.prototype.$cubeModule = cubeModule
Vue.prototype.$nativeApi = native
Vue.prototype.$config = config
Vue.prototype.$service = service
Vue.prototype.$tools = {}
// 将lib的内容，合并在 $tools
Object.values(lib).forEach((fnObj) => {
  Object.assign(Vue.prototype.$tools, fnObj)
})
Vue.prototype.$request = Vue.prototype.$tools.request

/**
 * 引入VueScroller插件
 */
// Vue.use(VueScroller)
Vue.use(MintUI,{
  lazyload: {
    preLoad: 1.3,
    error: 'static/default-head-portrait.png',
    loading: 'static/default-head-portrait.png',
    attempt: 1
  }
})
// Vue.use(flexible)
//Vue.use(VueScroller)
FastClick.attach(document.body)
// if (navigator.userAgent.indexOf('OS 11_3') === -1) {
// 	let FastClick = require('fastclick')
// 	FastClick.attach(document.body)
// }
// 重写ios的fastclick focus事件，解决11.3的快速点击输入框不聚焦的问题
FastClick.prototype.focus = targetElement => {
  var length
  // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
  if (native.isIOS() && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}
