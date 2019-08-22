import Vue from 'vue'
import Router from 'vue-router'
// import indexApp from '../views/index.vue'
// import detailApp from '../views/detail.vue'
// 路由懒加载，实为异步加载路由，避免单个app.js体积过大
//  require.ensure在需要的时候才下载依赖的模块，当参数指定的模块都下载下来了（下载下来的模块还没执行），
// 便执行参数指定的回调函数。require.ensure会创建一个chunk，且可以指定该chunk的名称，如果这个chunk名已经存在了，
// 则将本次依赖的模块合并到已经存在的chunk中，最后这个chunk在webpack构建的时候会单独生成一个文件
const saleListing = r => require.ensure([], () => r(require('@/views/index.vue')), 'saleListing') // 首页
const learningPlne = r => require.ensure([], () => r(require('@/views/learningPlne/index.vue')), 'learningPlne') // 学习
const exam = r => require.ensure([], () => r(require('@/views/exam/index.vue')), 'exam')  // 考试
// const mustCourse = r => require.ensure([], () => r(require('@/views/curriculum/mustCourse.vue')), 'mustCourse') // 必修课程
// const selectCourse = r => require.ensure([], () => r(require('@/views/curriculum/selectCourse.vue')), 'selectCourse')  // 选修课程
 const imageText = r => require.ensure([], () => r(require('@/views/HomePage/imageText.vue')), 'imageText') // 金点子-发布图文
// const releaseAudio = r => require.ensure([], () => r(require('@/views/dataContent/releaseAudio.vue')), 'releaseAudio')  // 金点子-发布录音
// const releaseVideo = r => require.ensure([], () => r(require('@/views/dataContent/releaseVideo.vue')), 'releaseVideo') // 金点子-发布视频
 const articleDatails = r => require.ensure([], () => r(require('@/views/HomePage/articleDatails.vue')), 'articleDatails') // 图文详情页
// const goldenIdeaArticle = r => require.ensure([], () => r(require('@/views/dataContent/goldenIdeaArticle.vue')), 'goldenIdeaArticle') // 金点子图文
 const labelEdit = r => require.ensure([], () => r(require('@/views/HomePage/labelEdit.vue')), 'labelEdit') // 标签编辑
 const Mine = r => require.ensure([], () => r(require('@/views/Mine/index.vue')), 'Mine') // 我的 

 const Mydata = r => require.ensure([], () => r(require('@/views/Mine/Mydata')), 'Mydata') // 我的学习数据
 const Mycomment = r => require.ensure([], () => r(require('@/views/Mine/Mycomment')), 'Mycomment')// 我的评论
 const Mycollect = r => require.ensure([], () => r(require('@/views/Mine/Mycollect')), 'Mycollect')// 我的收藏
 const Mybrowsing = r => require.ensure([], () => r(require('@/views/Mine/Mybrowsing')), 'Mybrowsing')// 浏览历史
 const Myexam = r => require.ensure([], () => r(require('@/views/Mine/Myexam')), 'Myexam')// 我到考试
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'saleListing',
      component: saleListing,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/imageText',
      name: 'imageText',
      component: imageText
    },
    {
      path: '/learningPlne',
      name: 'learningPlne',
      component: learningPlne
    },
    {
      path: '/articleDatails',
      name: 'article-details',
      component: articleDatails
    },
    {
      path: '/Mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/Home/labelEdit',
      name: 'label-edit',
      component: labelEdit
    },
    {
      path: '/exam',
      name: 'exam',
      component: exam,
      meta: {
        keepAlive: false,
      }
    },
    {
      path: '/Mydata',
      name: 'Mydata',
      component: Mydata,
      meta: {
        keepAlive: false,
      }
    },
    {
      path: '/Mycomment',
      name: 'Mycomment',
      component: Mycomment,
      meta: {
        keepAlive: false,
      }
    },
    {
      path: '/Mycollect',
      name: 'Mycollect',
      component: Mycollect,
      meta: {
        keepAlive: false,
      }
    },
    {
      path: '/Mybrowsing',
      name: 'Mybrowsing',
      component: Mybrowsing,
      meta: {
        keepAlive: false,
      }
    },
    {
      path: '/Myexam',
      name: 'Myexam',
      component: Myexam,
      meta: {
        keepAlive: false,
      } 
    },
    
   /* 
    {
      path: '/curriculum',
      name: 'curriculum',
      component: curriculum,
      redirect: '/curriculum/mustCourse',
      keepAlive: false,
      children: [{
        path: '/curriculum/mustCourse',
        name: 'mustCourse',
        component: mustCourse,
      },
      {
        path: '/curriculum/selectCourse',
        name: 'selectCourse',
        component: selectCourse,
      }
      ]
    },
    
    {
      path: '/releaseAudio',
      name: 'releaseAudio',
      component: releaseAudio
    },
    {
      path: '/releaseVideo',
      name: 'releaseVideo',
      component: releaseVideo
    },
    
    {
      path: '/goldenIdeaArticle',
      name: 'goldenIdeaArticle',
      component: goldenIdeaArticle
    },
    
    
    */
  ]
})
