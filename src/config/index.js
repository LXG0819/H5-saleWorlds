/**
 * Created by BIYY on 2017-10-12.
 */
import env from 'env'
let config = {}
config.userTest = {
  cn: '穆静',
  // 模拟获取的用户uid
  uid: "muj", // sjzyxl panwj wenyinghao chenzhchao  wangshengji wangjianping1 shuangshuang.zhang moyunlong wenyp chaxl jian.wei
  // 模拟token，在这里写入
  ssoToken: 'T3275747071050752',
}
config.requestType = {
  get: 'get',
  post: 'post',
  jsonp: 'jsonp'
}
config.statusBarColor = [197, 58, 58, 1] // 状态栏颜色
config.language = 'CN' // 状态栏颜色 'CN,EN'
config.apiMeta = { // 接口api配置
  base: {// 基础配置
    local: { // 本地调试
      successKey: 'flag', // 成功标识字段
      successValue: 1,  // 成功标识值
      errorKey: 'errMsg', // 错误提示信息字段
      intercept: true // 是否拦截错误信息
    },
    product: { // 打包环境
      successKey: 'flag', // 成功标识字段
      successValue: 1,  // 成功标识值
      errorKey: 'errMsg', // 错误提示信息字段
      intercept: true // 是否拦截错误信息
    }
  },
  post: {// post基础配置
    local: { // 本地调试
      successKey: 'code', // 成功标识字段
      successValue: 1,  // 成功标识值
      errorKey: 'msg', // 错误提示信息字段
      intercept: true // 是否拦截错误信息
    },
    product: { // 打包环境
      successKey: 'code', // 成功标识字段
      successValue: 1,  // 成功标识值
      errorKey: 'msg', // 错误提示信息字段
      intercept: true // 是否拦截错误信息
    }
  },
  custom: { // 自定义配置----其他特殊处理的可以类似新增
    local: { // 本地调试
      successKey: 'code', // 成功标识字段
      successValue: 1,  // 成功标识值
      errorKey: 'err',  // 错误提示信息字段
      intercept: true // 是否拦截错误信息
    },
    product: { // 打包环境
      successKey: 'code', // 成功标识字段
      successValue: 1,  // 成功标识值
      errorKey: 'err',  // 错误提示信息字段
      intercept: true // 是否拦截错误信息
    }
  }
}
config.env = env // product,local,test

config.baseUrl = {
  // 开发环境
  local: 'http://squantest.tcl.com.cn:81/tlink-train', // http://10.126.12.6:9090/tlink-train
  // local: 'http://192.168.1.108:9090',
  // 生产环境
  product: 'http://training.tcl.com.cn/tlink-train', //http://10.126.12.6/tlink-train/   http://10.1.33.50:8080
  // 测试环境
  test: 'http://squantest.tcl.com.cn:81/tlink-train'
}
config.masUrl = {
  // 开发环境
  local: 'http://10.1.33.59:8080/iCloud',
  // 生产环境
  product: 'https://dctest.mideadc.com/mas-api/restful/',
  // 测试环境
  test: 'https://dctest.mideadc.com/mas-api/restful/'
}

config.mucUrl = {
  // 开发环境
  local: 'http://10.1.33.66:8083',
  // 生产环境
  product: 'https://dctest.mideadc.com/mas-api/restful/muc/',
  // 测试环境
  test: 'https://dctest.mideadc.com/mas-api/restful/'
}

config.baseImgSrc = {
  // 开发环境
  local: 'https://tmtapptest.tcl.com:4433/muc-api/api/emp/getUserHeadPhoto?sourceId=e21c13e0-b57a-49f1-985b-01af30232ksr&uid=',
  // 生产环境
  product: 'https://tmtapp.tcl.com/muc-api/api/emp/getUserHeadPhoto?sourceId=e21c13e0-b57a-49f1-985b-01af30232ksr&uid=',
  // 测试环境
  test: 'https://tmtapptest.tcl.com:4433/muc-api/api/emp/getUserHeadPhoto?sourceId=e21c13e0-b57a-49f1-985b-01af30232ksr&uid='
}

config.api = {
  /**
   * 向首页提供接口
   */
  // 增加用户和标签的关系
  addUserTag: {
    name: '增加用户和标签的关系',
    url: `${config.baseUrl[config.env]}/home/addUserTag`,
    type: config.requestType.post,
  },
  // 删除用户和标签的关系
  deleteUserTag: {
    name: '删除用户和标签的关系',
    url: `${config.baseUrl[config.env]}/home/deleteUserTag`,
    type: config.requestType.post,
  },
  // 查询系统所有的模块标签
  querySysLevelTagList: {
    name: '查询系统所有的模块标签',
    url: `${config.baseUrl[config.env]}/home/querySysLevelTagList`,
    type: config.requestType.get,
    meta: config.apiMeta.base 
  },
  // 查询模块标签下的文章列表
  queryTagArticleList: {
    name: '查询系统所有的模块标签',
    url: `${config.baseUrl[config.env]}/home/queryTagArticleList`,
    type: config.requestType.get,
  },
  // 查询用户的模块标签集合
  queryUserTagList: {
    name: '查询用户的模块标签集合',
    url: `${config.baseUrl[config.env]}/home/queryUserTagList`,
    type: config.requestType.get,
  },

  /**
   * 向页面提供文章的相关接口
   */
  // 查询文章的详情
  queryArticleDetail: {
    name: '查询文章的详情',
    url: `${config.baseUrl[config.env]}/article/queryArticleDetail`,
    type: config.requestType.get,
  },
  // 添加用户对文章点赞
  addArticleAppre: {
    name: '添加用户对文章点赞',
    url: `${config.baseUrl[config.env]}/article/addArticleAppre`,
    type: config.requestType.post,
  },
  // 添加用户对文章的评论
  addArticleComment: {
    name: '添加用户对文章的评论',
    url: `${config.baseUrl[config.env]}/article/addArticleComment`,
    type: config.requestType.post,
  },
  // 添加评论的点赞
  addArticleDiscAppre: {
    name: '添加评论的点赞',
    url: `${config.baseUrl[config.env]}/article/addArticleDiscAppre`,
    type: config.requestType.post,
  },
  // 添加用户对文章的评分
  addArticleGrade: {
    name: '添加用户对文章的评分',
    url: `${config.baseUrl[config.env]}/article/addArticleGrade`,
    type: config.requestType.post,
  },
  // 查询文章的评论列表
  queryArticleDiscList: {
    name: '查询文章的评论列表',
    url: `${config.baseUrl[config.env]}/article/queryArticleDiscList`,
    type: config.requestType.get,
  },
  // 将文章添加到我的收藏
  addArticleCollo: {
    name: '将文章添加到我的收藏',
    url: `${config.baseUrl[config.env]}/article/addArticleCollo`,
    type: config.requestType.post,
  },
  // 查询评论的点赞列表
  queryArticleDiscAppreList: {
    name: '查询评论的点赞列表',
    url: `${config.baseUrl[config.env]}/article/queryArticleDiscAppreList`,
    type: config.requestType.get,
  },
  // 查询文章的点赞列表
  queryArticleAppreList: {
    name: '查询文章的点赞列表',
    url: `${config.baseUrl[config.env]}/article/queryArticleAppreList`,
    type: config.requestType.get,
  },
  // 查询评论的回复列表
  queryArticleDiscReplayList: {
    name: '查询评论的回复列表',
    url: `${config.baseUrl[config.env]}/article/queryArticleDiscReplayList`,
    type: config.requestType.get,
  },
  /**
   * 考试页面的相关接口
   */
  getExamTopic: {
    name: '获取考试题目', 
    url: `${config.baseUrl[config.env]}/exam/getExamTopic`,
    type: config.requestType.get,
  },
  queryUserExamCount: {
    name: '获取用户是否可以考试', 
    url: `${config.baseUrl[config.env]}/exam/queryUserExamCount`,
    type: config.requestType.get,
  },
  saveUserExamResult: {
    name: '保存用户考试', 
    url: `${config.baseUrl[config.env]}/exam/saveUserExamResult`,
    type: config.requestType.post,
  },
  queryUserExamDetail: {
    name: '查询用户考试详情', 
    url: `${config.baseUrl[config.env]}/exam/queryUserExamDetail`,
    type: config.requestType.get,
  },
  /**
   * 学习计划的相关接口
   */
  queryUserCourseList: {
    name: '获取学习计划列表',
    url: `${config.baseUrl[config.env]}/exam/queryUserCourseList`,
    type: config.requestType.get,
  },
  updateTrainComp: {
    name: '更新学习进度',
    url: `${config.baseUrl[config.env]}/exam/updateTrainComp`,
    type: config.requestType.get,
  },
  addVideo: {
    name: '上传视频',
    url: `${config.baseUrl[config.env]}/goldIdea/uploadGoldIdeaSmallVideo`
  },
  getGoldIdeaType: {
    name: '金点子文字类别',
    url: `${config.baseUrl[config.env]}/goldIdea/goldIdeaType`,
    type: config.requestType.get,
    meta: config.apiMeta.base 
  },
  saveGoldIdeaSmallVideo: {
    name: '金点子保存视频',
    url: `${config.baseUrl[config.env]}/goldIdea/saveGoldIdeaSmallVideo`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  saveGoldIdeaImageText: {
    name: '金点子保存图文',
    url: `${config.baseUrl[config.env]}/goldIdea/goldIdeaImageText`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  getGoldIdeaList: {
    name: '金点子文章列表',
    url: `${config.baseUrl[config.env]}/goldIdea/goldIdeaList`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  getGoldIdeaDetails: {
    name: '金点子文章详情',
    url: `${config.baseUrl[config.env]}/goldIdea/goldIdeaDetails`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  saveGoldIdeaComment: {
    name: '保存金点子文章评论',
    url: `${config.baseUrl[config.env]}/goldIdea/goldIdeaComment`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  goldIdeaApprove: {
    name: '保存金点子文章点赞',
    url: `${config.baseUrl[config.env]}/goldIdea/goldIdeaApprove`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  queryGoldIdeaComment: {
    name: '查询金点子文章评论列表',
    url: `${config.baseUrl[config.env]}/goldIdea/queryGoldIdeaComment`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  goldIdeaCommentApprove: {
    name: '查询金点子文章评论点赞',
    url: `${config.baseUrl[config.env]}/goldIdea/goldIdeaCommentApprove`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  queryGoldIdeaCommentApprove: {
    name: '查询金点子文章评论点赞列表',
    url: `${config.baseUrl[config.env]}/goldIdea/queryGoldIdeaCommentApprove`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  saveGoldIdeaCollection: {
    name: '金点子文章收藏',
    url: `${config.baseUrl[config.env]}/goldIdea/saveGoldIdeaCollection`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  queryGoldIdeaCommentReply: {
    name: '查询评论回复列表',
    url: `${config.baseUrl[config.env]}/goldIdea/queryGoldIdeaCommentReply`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  saveGoldIdeaCommentReply: {
    name: '保存评论回复',
    url: `${config.baseUrl[config.env]}/goldIdea/goldIdeaCommentReply`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  queryGoldIdeaCommentDetails: {
    name: '查询金点子文章评论详情',
    url: `${config.baseUrl[config.env]}/goldIdea/queryGoldIdeaCommentDetails`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  queryGoldIdeaApprove: {
    name: '查询金点子文章点赞列表',
    url: `${config.baseUrl[config.env]}/goldIdea/queryGoldIdeaApprove`,
    type: config.requestType.post,
    meta: config.apiMeta.post
  },
  myHomepage: {
    name: '我的',
    url: `${config.baseUrl[config.env]}/my/myHomepage`,
    type: config.requestType.get,
    meta: config.apiMeta.base 
  },
  browseHistory: {
    name: '浏览历史',
    url: `${config.baseUrl[config.env]}/my/browsingHistory`,
    type: config.requestType.get,
    meta: config.apiMeta.base 
  },
  myComments: {
    name: '我的评论',
    url: `${config.baseUrl[config.env]}/my/comments`,
    type: config.requestType.get,
    meta: config.apiMeta.base 
  },
  myCollection: {
    name: '我的收藏',
    url: `${config.baseUrl[config.env]}/my/collection`,
    type: config.requestType.get,
    meta: config.apiMeta.base 
  },
  learningData: {
    name: '我的学习数据',
    url: `${config.baseUrl[config.env]}/my/learningData`,
    type: config.requestType.get,
    meta: config.apiMeta.base 
  },
  waitExamination: {
    name: '待考列表',
    url: `${config.baseUrl[config.env]}/my/waitExamination`,
    type: config.requestType.get,
    meta: config.apiMeta.base 
  },
  alreadyExamination: {
    name: '已考列表',
    url: `${config.baseUrl[config.env]}/my/alreadyExamination`,
    type: config.requestType.get,
    meta: config.apiMeta.base 
  },
  examinationCompletionRate: {
    name: '考试完成率',
    url: `${config.baseUrl[config.env]}/my/examinationCompletionRate`,
    type: config.requestType.get,
    meta: config.apiMeta.base 
  },
  learningTime: {
    name: '我的学习时长保存',
    url: `${config.baseUrl[config.env]}/my/learningTime`,
    type: config.requestType.post,
    meta: config.apiMeta.base 
  },
  upLearningTime: {
    name: '我的学习时长更新',
    url: `${config.baseUrl[config.env]}/my/upLearningTime`,
    type: config.requestType.post,
    meta: config.apiMeta.base 
  }
}

export default config