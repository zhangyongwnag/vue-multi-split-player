import Vue from 'vue'
import App from './App.vue'
// import * as VueMultiSplitPlayer from "../../dist/vue-multi-split-player.es"
// import '../../dist/style.css'
import * as VueMultiSplitPlayer from "vue-multi-split-player"
import 'vue-multi-split-player/style'

import { Slider, Popover, Button } from 'element-ui'

Vue.use(VueMultiSplitPlayer)
Vue.use(Slider)
Vue.use(Popover)
Vue.use(Button)

let root = document.querySelector('#app')

new Vue({
    render: h => h(App),
}).$mount(root)
