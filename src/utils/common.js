/**
 * @description 判断是否手机号属实
 */
export function isPhone(value) {
  var partten = /^1[3,5,8,2,4,6,7,9]\d{9}$/
  var fl = false
  if (partten.test(value)) {
    return true
  } else {
    return false
  }
}

/**
 * @description 判断当前的设备是是手机还是电脑
 */
export function isMobile() {
  let userAgentInfo = navigator.userAgent
  let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod', 'Mobile']
  return Agents.filter(item => userAgentInfo.indexOf(item) !== -1).length
}

/**
 * @description 判断当前的设备是谷歌浏览器
 */
export function isChrome() {
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

/**
 * @description 获取地址栏参数
 * @param {String} key: 参数名
 */
export function getParam(key) {
  /* eslint-disable */
  let results = new RegExp('[\?&]' + key + '=([^&#]*)').exec(window.location.href)
  /* eslint-disable */
  if (results) {
    return results[1]
  }
  return ''
}

/**
 * @description 判断邮箱属实
 */
export function isEmail(str) {
  var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return reg.test(str)
}

/**
 * @description 判断IP属实
 */
export function isValidIP(ip) {
  var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip);
}

// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
// (new Date()).Format("yyyy-MM-dd")      ==> 2006-07-02
// (new Date()).Format("yyyy年MM月dd日 上午hh:mm")      ==> 2006年07月-02日 上午08:09
// (new Date()).Format("yyyyMMdd")      ==> 20060702
// (new Date()).Format("yyyyMMddhhmmss")      ==> 20060702080904
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,                 //月份
    'd+': this.getDate(),                    //日
    'h+': this.getHours(),                   //小时
    'm+': this.getMinutes(),                 //分
    's+': this.getSeconds(),                 //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds()             //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  return fmt
}

// 日期格式转换
export function dateResult(result, fmt) {
  return new Date(result).format(fmt)
}

/**
 * @description 倒计时
 * @param {Number} timestamp: 时间戳(秒，毫秒自己兼容)
 * @param {Boolean} include_day: 0 自动 1 不包含 2 包含
 */
export function filterTime(timestamp = 0, include_day = 0) {
  let day = 60 * 60 * 24
  let hour = 60 * 60
  let minute = 60
  let second = 0

  day = parseInt(timestamp / day) // 计算天数
  hour = parseInt(timestamp / hour % 24) // 计算小时数
  minute = parseInt(timestamp / minute % 60) // 计算分钟数
  second = parseInt(timestamp % 60) // 计算秒数

  hour < 10 ? hour = '0' + hour : hour
  minute < 10 ? minute = '0' + minute : minute
  second < 10 ? second = '0' + second : second

  if (include_day === 0) {
    day === 0 ? day = '' : day = `${day}-`
    hour === '00' ? hour = '' : hour = `${hour}:`

    return `${day}${hour}${minute || '00'}:${second || '00'}`
  } else if (include_day === 1) {
    return `${hour || '00'}:${minute || '00'}:${second || '00'}`
  } else if (include_day === 2) {
    return `${day || '00'}-${hour || '00'}:${minute || '00'}`
  }
}

/**
 * @description 函数防抖
 * @param {Function} fun: 要优化的函数
 * @param {Number} delay: 函数间断执行时间
 */
export function debounce(fun, delay = 500) {
  let args = Array.prototype.slice.call(arguments, 2)
  if (fun.timer) {
    return
  }
  fun.timer = setTimeout(() => {
    fun.apply(this, args)
    fun.timer = ''
  }, delay)
}

/**
 * @description 函数防抖非立即执行
 * @param {Function} fun: 要优化的函数
 * @param {Number} delay: 函数间断执行时间
 */
export function debounceBind(fun, delay = 500) {
  return (...args) => {
    clearTimeout(fun.timer)
    fun.timer = setTimeout(() => {
      fun.apply(this, args)
    }, delay)

  }
}

/**
 * @description 立即执行函数节流
 * @param {Function} fun: 要优化的函数
 * * @param {Number} delay: 函数间断执行时间
 */
export function debounceExecute(fun, delay = 1000) {
  let args = Array.prototype.slice.call(arguments, 2)
  if (!fun.looked) {
    fun.apply(this, args)
    fun.looked = true
  }
  if (fun.timer) {
    return
  }
  fun.timer = setTimeout(() => {
    fun.looked = false
    fun.timer = ''
  }, delay)
}

/**
 * @description 函數节流
 * @param {Function} fun: 要优化的函数
 * * @param {Number} delay: 函数间断执行时间
 */
export function throttle(fun, delay = 500) {
  let args = Array.prototype.slice.call(arguments, 2)
  clearTimeout(fun.timer)
  fun.timer = setTimeout(() => {
    fun.apply(this, args)
  }, delay)
}

/**
 * @description 立即执行函数节流
 * @param {Function} fun: 要优化的函数
 * * @param {Number} delay: 函数间断执行时间
 */
export function luck(fun, delay = 1000) {
  let args = Array.prototype.slice.call(arguments, 2)
  if (!fun.looked) {
    fun.apply(this, args)
    fun.looked = true
  }
  clearTimeout(fun.timer)
  fun.timer = setTimeout(() => {
    fun.looked = false
  }, delay)
}

/**
 * @description 判断是否m3u8
 */
export function isM3u8(url) {
  return url.endsWith('.m3u8')
}

/**
 * @description 类型检测
 * @param {String | Object | Array | Number | Boolean | Symbol} value: 要检测的值
 */
export function typeDetection(value) {
  let type_ = Object.prototype.toString.call(value)
  switch (type_) {
    case '[object Object]':
      return 'object'
    case '[object Array]':
      return 'array'
    case '[object String]':
      return 'string'
    case '[object Number]':
      return 'number'
    case '[object Boolean]':
      return 'boolean'
    case '[object Symbol]':
      return 'symbol'
    default:
      return typeof value
  }
}

/**
 * @description 因为自带的dblclick兼容性很差，所以自定义模拟双击事件
 * @param {Function} fun: 要执行的方法
 */
export function dblclick(fun) {
  let args = Array.prototype.slice.call(arguments, 1)
  if (fun.clicked) {
    fun.call(this, ...args)
    fun.clicked = false
    return
  }
  fun.clicked = true
  setTimeout(() => {
    fun.clicked = false
    // fun.call(this, ...args)
  }, 500)
}

/**
 * @description 过滤声音通道配置id
 * @param {Number} id: 声音通道配置id
 */
export function filterVoiceConfigId(id) {
  let channelList = Object.freeze({
    '-1': '老师',
    '0': '老师',
    '1': '老师全景',
    '2': '学生',
    '3': '学生全景',
    '4': '板书',
    '5': '双视图',
    '6': '跟踪',
    '7': '老师左辅助',
    '8': '老师右辅助',
    '50': '板书辅助'
  })
  let ids = id.split(',')
  return new Set(ids.map(item => channelList[item]))
}
