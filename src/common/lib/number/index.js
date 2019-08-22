/**
 * Created by BIYY on 2017-11-17.
 */
// import toast from '../toast'


let number = {}
/**
 * 数字千分位分开
 * @param num{number}
 * @returns {*}
 */
number.formatNum = (num) => {
  let str = num + ''
  let newStr = ''
  let count = 0

  if (str.indexOf('.') == -1) {
    for (let i = str.length - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + ',' + newStr
      } else {
        newStr = str.charAt(i) + newStr
      }
      count++
    }
    str = newStr + '.00' // 自动补小数点后两位
    return str
  } else {
    for (let i = str.indexOf('.') - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + ',' + newStr // 碰到3的倍数则加上“,”号
      } else {
        newStr = str.charAt(i) + newStr // 逐个字符相接起来
      }
      count++
    }
    str = newStr + (str + '00').substr((str + '00').indexOf('.'), 3)
    return str
  }
}

/**
 * 验证身份证
 * @param arr{Object}
 * @returns {*}
 */
number.IdentityCodeValid = (code) => {
  let alert_tip = '' // 用于提示
  let city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }
  let pass = true
  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    alert_tip = '身份证号格式错误'
    pass = false
  } else if (!city[code.substr(0, 2)]) {
    alert_tip = '地址编码错误'
    pass = false
  } else {
      // 18位身份证需要验证最后一位校验位
    if (code.length === 18) {
      code = code.split('')
          // ∑(ai×Wi)(mod 11)
          // 加权因子
      let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
          // 校验位
      let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
      let sum = 0
      let ai = 0
      let wi = 0
      for (let i = 0; i < 17; i++) {
        ai = code[i]
        wi = factor[i]
        sum += ai * wi
      }
      // let last = parity[sum % 11]
      if (parity[sum % 11] != code[17]) {
        alert_tip = '校验位错误(X需大写)'
        pass = false
      }
    }
  }
  if (!pass) {
    console.log(alert_tip)
  }
  return pass
}

/**
 * 将数字转换成对应的中文 将阿拉伯数字翻译成中文的大写数字
 *
 * @param {Object}
 *            num 比如:1对应一 11：十一 101:一百零一
 * @return {TypeName}
 */
number.numberToChinese = (num) => {
  let AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
  let BB = ['', '十', '百', '仟', '萬', '億', '点', '']
  let a = ('' + num).replace(/(^0*)/g, '').split('.')
  let k = 0
  let re = ''
  for (let i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp('0{4}//d{' + (a[0].length - i - 1) + '}$')
                .test(a[0])) { re = BB[4] + re }
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0){re = AA[0] + re}
    if (a[0].charAt(i) !== 0) {
      re = AA[a[0].charAt(i)] + BB[k % 4] + re
    }
    k++
  }

  if (a.length > 1){ // 加上小数部分(如果有小数部分)
    re += BB[6]
    for (let i = 0; i < a[1].length; i++){
      re += AA[a[1].charAt(i)]
    }
  }
  if (re === '一十') { re = '十' }
  if (re.match(/^一/) && re.length === 3){
    re = re.replace('一', '')
  }
  return re
}
/**
 * 将数字转换为大写金额
 * @param {Object} Num
 */
number.toChinese = (Num) => {
  // 判断如果传递进来的不是字符的话转换为字符
  if (typeof Num === 'number') {
    Num = Num.toString()
  }
  Num = Num.replace(/,/g, '') // 替换tomoney()中的“,”
  Num = Num.replace(/ /g, '') // 替换tomoney()中的空格
  Num = Num.replace(/￥/g, '') // 替换掉可能出现的￥字符
  if (isNaN(Num)) { // 验证输入的字符是否为数字
      // alert('请检查小写金额是否正确')
    return ''
  }
  // 字符处理完毕后开始转换，采用前后两部分分别转换
  let part = String(Num).split('.')
  let newchar = ''
  // 小数点前进行转化
  for (let i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) {
      return ''
          // 若数量超过拾亿单位，提示
    }
    let tmpnewchar = ''
    let perchar = part[0].charAt(i)
    switch (perchar) {
      case '0':
        tmpnewchar = '零' + tmpnewchar
        break
      case '1':
        tmpnewchar = '壹' + tmpnewchar
        break
      case '2':
        tmpnewchar = '贰' + tmpnewchar
        break
      case '3':
        tmpnewchar = '叁' + tmpnewchar
        break
      case '4':
        tmpnewchar = '肆' + tmpnewchar
        break
      case '5':
        tmpnewchar = '伍' + tmpnewchar
        break
      case '6':
        tmpnewchar = '陆' + tmpnewchar
        break
      case '7':
        tmpnewchar = '柒' + tmpnewchar
        break
      case '8':
        tmpnewchar = '捌' + tmpnewchar
        break
      case '9':
        tmpnewchar = '玖' + tmpnewchar
        break
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar = tmpnewchar + '元'
        break
      case 1:
        if (perchar != 0) tmpnewchar = tmpnewchar + '拾'
        break
      case 2:
        if (perchar != 0) tmpnewchar = tmpnewchar + '佰'
        break
      case 3:
        if (perchar != 0) tmpnewchar = tmpnewchar + '仟'
        break
      case 4:
        tmpnewchar = tmpnewchar + '万'
        break
      case 5:
        if (perchar != 0) tmpnewchar = tmpnewchar + '拾'
        break
      case 6:
        if (perchar != 0) tmpnewchar = tmpnewchar + '佰'
        break
      case 7:
        if (perchar != 0) tmpnewchar = tmpnewchar + '仟'
        break
      case 8:
        tmpnewchar = tmpnewchar + '亿'
        break
      case 9:
        tmpnewchar = tmpnewchar + '拾'
        break
    }
    newchar = tmpnewchar + newchar
  }
  // 小数点之后进行转化
  if (Num.indexOf('.') != -1) {
    if (part[1].length > 2) {
          // alert('小数点之后只能保留两位,系统将自动截断')
      part[1] = part[1].substr(0, 2)
    }
    for (let i = 0; i < part[1].length; i++) {
      let tmpnewchar = ''
      let perchar = part[1].charAt(i)
      switch (perchar) {
        case '0':
          tmpnewchar = '零' + tmpnewchar
          break
        case '1':
          tmpnewchar = '壹' + tmpnewchar
          break
        case '2':
          tmpnewchar = '贰' + tmpnewchar
          break
        case '3':
          tmpnewchar = '叁' + tmpnewchar
          break
        case '4':
          tmpnewchar = '肆' + tmpnewchar
          break
        case '5':
          tmpnewchar = '伍' + tmpnewchar
          break
        case '6':
          tmpnewchar = '陆' + tmpnewchar
          break
        case '7':
          tmpnewchar = '柒' + tmpnewchar
          break
        case '8':
          tmpnewchar = '捌' + tmpnewchar
          break
        case '9':
          tmpnewchar = '玖' + tmpnewchar
          break
      }
      if (i === 0) tmpnewchar = tmpnewchar + '角'
      if (i === 1) tmpnewchar = tmpnewchar + '分'
      newchar = newchar + tmpnewchar
    }
  }
  // 替换所有无用汉字
  while (newchar.search('零零') !== -1){
    newchar = newchar.replace('零零', '零')
  }
  newchar = newchar.replace('零亿', '亿')
  newchar = newchar.replace('亿万', '亿')
  newchar = newchar.replace('零万', '万')
  newchar = newchar.replace('零元', '元')
  newchar = newchar.replace('零角', '')
  newchar = newchar.replace('零分', '')
  if (newchar.charAt(newchar.length - 1) === '元') {
    newchar = newchar + '整'
  }
  return newchar
}

/**
 * 检验手机格式 是否正确
 *
 * @param {Object} Number String 
 *                 手机号码
 * @return {Boolean}
 */
number.isPoneAvailable = (pone) => {  
 var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (!myreg.test(pone)) {  
    return false
  } else {  
    return true
  }  
}

/**
 * 检验电话号码 是否正确
 *
 * @param {Object} String 
 *                 电话号码
 * @return {Boolean}
 */
number.isTelAvailable = (tel) => {  
  let myreg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
  if (!myreg.test(tel)) {  
    return false;  
  } else {  
    return true;  
  }  
}

/**
 * 检验 手机号码 或 电话号码 是否正确
 *
 * @param {Object} String 
 *                 电话与手机 号码
 * @return {Boolean}
 */

number.verificationTel = (tel) => {
   let mobile = /^\d{11}$/
   let phone = /^0\d{2,3}-?\d{7,8}$/
   return mobile.test(tel) || phone.test(tel)
}

export default number
