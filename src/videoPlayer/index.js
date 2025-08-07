import VideoPlayer from './index.vue'
import '@/assets/css/tailwind.css'
import '@/assets/css/player.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/common.css'
import '@/assets/css/index.css'
import '@/assets/css/video-js.min.css'
import '@/utils/flexible'

const install = (Vue, options) => {
  if (options) {
    // let _v = Vue.extend(VideoPlayer)
    // let instance = new _v().$mount()
    // instance.$props = options
    //
    // setTimeout(() => {
    //   instance.$destroy()
    // }, 1000)
  }
  Vue.component('VideoPlayer', VideoPlayer)
}

export {
  VideoPlayer,
  install
}
