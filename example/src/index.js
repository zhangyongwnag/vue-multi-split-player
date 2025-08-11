import Vue from 'vue'
import App from './App.vue'
import * as VueMultiSplitPlayer from "vue-multi-split-player"
// import * as VueMultiSplitPlayer from "../../dist/vue-multi-split-player.es"
import 'vue-multi-split-player/dist/style.css'
// import '../../dist/style.css'
import { Slider, Popover, Button, Tooltip } from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

Vue.use(VueMultiSplitPlayer)
Vue.use(Slider)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Button)

let root = document.querySelector('#app')

new Vue({
    render: h => h(App),
}).$mount(root)
