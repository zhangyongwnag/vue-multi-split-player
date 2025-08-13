import Vue from 'vue'
import App from './App.vue'
import "@/assets/css/tailwind.css"
import {Slider, Tooltip, Popover, Button} from "element-ui";
import "element-ui/lib/theme-chalk/index.css"
import * as VueMultiSplitPlayer from './vue-multi-split-player'

/******Test*****/
// import {VueMultiSplitPlayer as VideoPlayer} from './vue-multi-split-player'
// let Test = Vue.extend({
//     template: `
//       <VideoPlayer v-bind="$attrs" v-bind="$listeners">
//         <template v-for="(_, name) in $slots" #[name]="scopeData">
//           <slot :name="name" v-bind="scopeData"></slot>
//         </template>
//       </VideoPlayer>`,
//     provide() {
//         return {
//             pubsub: PubSub
//         }
//     },
//     mounted() {
//         // 透传ref属性，这里劫持下，不然会报错
//         let attributes = ['_register_emits', 'current', 'duration']
//
//         attributes.forEach(key => {
//             Object.defineProperty(this, key, {
//                 get() {
//                     return Reflect.get(this.$refs.videoPlayer, key)
//                 },
//                 set(v) {
//                     throw new Error('Not Allow fix！')
//                 }
//             })
//         })
//     },
//     components: {
//         VideoPlayer
//     }
// })
// Vue.use({
//     install(Vue) {
//         Vue.component('VueMultiSplitPlayer', Test)
//     }
// })
/******Test*****/

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
