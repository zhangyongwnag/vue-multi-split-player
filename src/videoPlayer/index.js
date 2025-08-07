import VideoPlayer from './index.vue'

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
