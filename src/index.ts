import Vue from 'vue'
import App from './App.vue'
import '@/utils/flexible'
import * as VideoPlayer from "./videoPlayer/index.js";
import '@/assets/css/tailwind.css'
import '@/assets/css/player.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/common.css'
import '@/assets/css/index.css'
import { Slider, Popover, Button } from 'element-ui'

Vue.use(VideoPlayer)
Vue.use(Slider)
Vue.use(Popover)
Vue.use(Button)

let root: HTMLDivElement = document.querySelector('#app')

new Vue({
    render: h => h(App),
    beforeCreate() {

    }
}).$mount(root)
