<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :exclude="exclude">
        <router-view class="router-view">
          <tabber ></tabber>
        </router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import config from '@/config/index'

  export default {
    data () {
      return {
        exclude: '',
        transitionName: 'pop-' + (this.direction === 'reverse' ? 'out' : 'in')
      }
    },
    watch: {
      direction(val){
        if (val === 'forward') {
          this.transitionName = 'pop-in'
        } else {
          this.transitionName = 'pop-out'
        }
      }
    },
    computed: {
      ...mapGetters({
        loading: 'getLoading',
        direction: 'getDirection'
      })
    },
    async mounted () {
      // 全局后退方法
      this.$root.goBack = this.goBack
      // 初始化路由
      this.initRouter()
      // 解决safari、微信浏览器下拉回弹效果
      // this.fixAppScoll()
      // 初始化应用
      this.initApp()
    },
    methods: {
      initRouter(){
        // 路由初始化
        let routes = this.$router.options.routes
        let arr = []
        for (let i = 0; i < routes.length; i++) {
          if (!routes[i].hasOwnProperty('meta') || !routes[i].meta.hasOwnProperty('keepAlive') || !routes[i].meta.keepAlive) {
            arr.push(routes[i].name)
          }
        }
        if (arr.length > 0) {
          this.exclude = arr.join(',')
        }
       
        console.log(this.exclude)
      },
      /**
       * 后退方法
       * isMessage { Boolean } 为true时 直接返回
       */
      goBack(isMessage){
        // console.log('list', this.$store.state.page.list)
        const pageList = this.$store.state.page.list
        const actionsheet = document.querySelectorAll('.mint-actionsheet')
        const path = this.$route.path
        const messagebox = document.querySelector('.mint-msgbox-wrapper .mint-msgbox')
        this.transitionName = 'pop-out'
        const extra = this.$store.state.extra.extra ? this.$store.state.extra.extra : {}
        let cancel = null
        let el = null
        if (actionsheet && actionsheet.length > 0) {
          el = actionsheet[actionsheet.length - 1]
        }
        // console.log('el', el)
        if (el && el.style.display !== 'none') { // 关闭actionsheet
          cancel = el.querySelector('.mint-actionsheet-button')
          // console.log('cancel', cancel)
          cancel.click()
          cancel.click()
        } else if (!isMessage && messagebox && messagebox.style.display !== 'none') { // 如果有弹窗，不允许返回
          // console.log('messagebox', messagebox)
          this.$messagebox.close()
          return false
        }
        // 暂时性注释掉 在调用了TakePhoto 组件时 会进入这里 而不会直接后退  影响后台事件
        //  else if (pageList.length > 0) { // 关闭弹出页面
          // const page = pageList[pageList.length - 1].$children[0]
          // page.$parent.$parent.close()
          // this.$store.commit('deletePage', page)
          // return false
        // } 
        else {
          if (path === '/' || extra.action === this.$route.name) {
            if (this.$config.env !== 'local') {
              this.$nativeApi.goBack()
            }
          } else {
            this.$router.back()
          }
        }
      },
      /**
       * 解决safari、微信浏览器下拉回弹效果
       */
      fixAppScoll() {
        let overscroll = function (el) {
          el.addEventListener('touchstart', function () {
            let top = el.scrollTop
            let totalScroll = el.scrollHeight
            let currentScroll = top + el.offsetHeight
            if (top === 0) {
              el.scrollTop = 1
            } else if (currentScroll === totalScroll) {
              el.scrollTop = top - 1
            }
          })

          el.addEventListener('touchmove', function (evt) {
            if (el.offsetHeight < el.scrollHeight) {
              evt._isScroller = true
            }
          })
        }

        overscroll(document.querySelector('#app'))
        document.body.addEventListener('touchmove', function (evt) {
          if (!evt._isScroller) {
            evt.preventDefault()
          }
        })
      },
      async initApp(){
        /**
         * 获取用户信息
         */
        const user = await this.$nativeApi.getUser()
        this.$store.commit('updateUser', user)
        /**
         * 获取语言信息
         */
        this.AppLanguage(await this.$nativeApi.language())

        if (config.env !== 'local') { // 底座环境下
          /**
           * 隐藏悬浮
           */
          this.$nativeApi.hideFloat()
          /**
           * 隐藏导航
           */
          this.$nativeApi.hideNav()
          /**
           * 状态栏变色
           */
          this.$nativeApi.changeColor(config.statusBarColor)
          /**
           * 禁用webview橡皮筋效果
           */
          this.$nativeApi.setBounces('0')
          /**
           * 监听返回键
           */
          document.addEventListener('backbutton', () => {
            this.goBack()
          }, false)
        }
      }
    }
  }
</script>

<style lang="less">
  @import 'assets/css/index.less';
</style>
