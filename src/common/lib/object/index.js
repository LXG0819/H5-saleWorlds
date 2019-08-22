/**
 * Created by BIYY on 2017-11-17.
 */
let obj = {}
/**
 * 对象合并
 * @param des
 * @param src
 * @param override
 * @returns {*}
 */
obj.extend = (des, src, override) => {
  if (src instanceof Array) {
    for (let i = 0, len = src.length; i < len; i++) {
      obj.extend(des, src[i], override)
    }
  }
  for (let i in src) {
    if (override || !(i in des)) {
      des[i] = src[i]
    }
  }
  return des
}
/**
 * 判断字符串是否为json格式
 * @param str
 * @returns {boolean}
 */
obj.isJSON = (str) => {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      if (str.indexOf('{') > -1) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else {
    str = JSON.stringify(str)
    obj.isJSON(str)
  }
  return false
}

/**
 * 判断非空,
 * @param val
 * @returns {Boolean}
 */
obj.isEmpty = (val) => {
  if (val == null){
    return true
  }
  if (val == undefined || val == 'undefined'){
    return true
  }
  if (val === ''){
    return true
  }
  if (val.length === 0){
    return true
  }
  if (typeof (val) == 'object' && JSON.stringify(val) == '{}'){
    return true
  }
  if (!/[^(^\s*)|(\s*$)]/.test(val)){
    return true
  }
  return false
}

export default obj
