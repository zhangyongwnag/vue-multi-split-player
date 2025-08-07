import Vue from 'vue'
import App from './App.vue'
import * as VideoPlayer from "../dist/video-player.es"

import '../dist/style.css'

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
