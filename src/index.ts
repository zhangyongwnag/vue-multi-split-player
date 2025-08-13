import Vue from 'vue'
import App from './App.vue'
import "@/assets/css/tailwind.css"
import { Slider, Tooltip, Popover, Button } from "element-ui";
import "element-ui/lib/theme-chalk/index.css"

import * as VueMultiSplitPlayer from './vue-multi-split-player/index'

Vue.use(VueMultiSplitPlayer)
Vue.use(Slider)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Button)

let root: HTMLDivElement = document.querySelector('#app')

new Vue({
    render: h => h(App),
    beforeCreate() {

    }
}).$mount(root)
