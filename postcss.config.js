module.exports = {
  "plugins": {
    "tailwindcss": {},
    "autoprefixer": {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        'last 2 versions', // 所有主流浏览器最近2个版本
      ]
    },
    "postcss-pxtorem": {
      rootValue(data) {
        // return data.file.indexOf('Mobile') !== -1 ? 37.5 : 80
        return 192
        // return data.file.indexOf('Mobile') !== -1 ? 37.5 : 240
      },
      propList: ["*"], //是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
      unitPrecision: 5, //保留rem小数点多少位
      //selectorBlackList: ['.radius'],  //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
      replace: true, //这个真不知到干嘛用的。有知道的告诉我一下
      mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
      minPixelValue: 1 //px小于6的不会被转换
    }
  }
}
