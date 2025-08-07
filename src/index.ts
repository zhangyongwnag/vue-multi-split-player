import Vue from 'vue'
import App from './App.vue'
import '@/utils/flexible'
import VideoPlayer from "@/videoPlayer";
import '@/assets/css/tailwind.css'

Vue.use(VideoPlayer)

let root: HTMLDivElement = document.querySelector('#app')

new Vue({
    render: h => h(App),
    beforeCreate() {

    }
}).$mount(root)
