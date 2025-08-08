import VueMultiSplitPlayer from './index.vue'
import '@/assets/css/tailwind.css'
import '@/assets/css/player.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/common.css'
import '@/assets/css/index.css'
import '@/assets/css/video-js.min.css'

const install = (Vue, options) => {
  if (options) {
    // let _v = Vue.extend(VueMultiSplitPlayer)
    // let instance = new _v().$mount()
    // instance.$props = options
    //
    // setTimeout(() => {
    //   instance.$destroy()
    // }, 1000)
  }
  Vue.component('VueMultiSplitPlayer', VueMultiSplitPlayer)
}

export {
  VueMultiSplitPlayer,
  install
}
