/**
 * Created by BIYY on 2017-11-17.
 */
// import toast from '../toast'
//import Toast from '@/components/toast/index.js'
import {Indicator,MessageBox} from 'mint-ui'
import reqwest from 'reqwest'
import config from '@/config'
import native from '@/common/lib/native'

let request = {}
/**
 * 公共ajax请求service
 * @param opt{Object}
 * {
       *   api:'请求配置信息',
       *   data: 'post请求参数',
       *   headers: '请求头'
       *
       * }
 * @returns {Promise}
 */
request.request = (opt) => {
  let opts = opt || {}
  // 获取用户接口
  const api = opt.api || {}
  // 请求类型
  const requestType = config.requestType
  let setTime = {}
  let time = new Date() * 1
  delete opts.api
  // 赋值url
  opts.url = api.url || opts.url
  // 初始化请求类型

  if (requestType.jsonp === api.type || opts.type) {
    opts.type = requestType.jsonp
    opts.jsonpCallback = api.jsonpCallback || 'jsonpcallback'
  } else {
    opts.method = api.type || opts.type || requestType.get // 请求类型
  }
  setTime[time] = setTimeout(() => { // 超过一秒后出现加载条
    Indicator.open({
      text: 'loading'
    })
  }, 500)
  if (!opts.url) {
    request.ajaxError('请填写接口地址', setTime[time])
    return false
  }
  return new Promise((resolve, reject) => {
    // console.log('api', api)
    // console.log('opts', opts)
    opts.complete = (XMLHttpRequest, status) => { // ajax结束处理
      if (status === 'timeout') { // 超时,status还有success,error等值的情况
        // console.log('timeout')
        request.ajaxError('请求超时', setTime[time])
      }
    }

    opts.success = (res) => { // ajax成功处理
      if (typeof res === 'string') {
        res = JSON.parse(res)
      }
      if (res.msg) {
        if (res.code == 40670 || res.msg.indexOf('MAS调用HTTP POST失败') != -1 || res.msg.indexOf('MAS调用HTTP GET失败') != -1) {
          MessageBox.alert(
            "请求连接失败"
            ).then(action => {
              native.goBack();
              Indicator.close()
          });
          return false
        }
      }
      if (api.meta && api.meta.intercept) { // 拦截错误信息
        if (res[api.meta.successKey] === api.meta.successValue) {
          Indicator.close()
          clearTimeout(setTime[time])
          resolve(res)
        } else {
          request.ajaxError(res[api.meta.errorKey], setTime[time])
        }
      } else { // 不拦截错误信息
        Indicator.close()
        clearTimeout(setTime[time])
        resolve(res)
      }
    }
    opts.error = (res) => { // ajax错误处理
      if (reject) {
        reject(res.status)
      }
      if (res.status === 404) {
        request.ajaxError('请求连接有误', setTime[time])
      } else if (res.status === 500) {
        request.ajaxError('服务器出错', setTime[time])
      } else {
        let msg = '请求跨域'
        if (new Date() - time >= (opts.time || 5000)) {
          msg = '请求超时'
        }
        request.ajaxError(msg, setTime[time])
      }
    }
    reqwest(opts)
  })
}
/**
 * ajax请求失败
 * @param msg
 */
request.ajaxError = (msg, timeOut) => {
  Toast({
    message: msg,
    type: 'warning'
  })
  Indicator.close()
  clearTimeout(timeOut)
}

export default request
