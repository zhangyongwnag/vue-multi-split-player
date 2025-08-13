import {debounce} from "@/utils/common";
import { Notification } from "element-ui";

export default class WaterMarker {
  constructor(options) {
    this.playId = options.id; // 播放id
    this.content = (options.content || 'vue-multi-split-player').toString(); // 水印内容
    this.timer = null
    this.waterMarkerDom = null
    this.observer_c = null // 监听水印，防篡改
    this.observer_p = null // 监听水印，防删除
    this.create() // 初始化
  }

  async create() {
    this.getElement() ? this.getElement().remove() : ''
    await this.wait(500 + Math.random() * 200)
    let content = this.content
    let wrap = document.getElementById(this.playId)
    if (!wrap) {
      return
    }
    this.width = wrap.offsetWidth
    this.height = wrap.offsetHeight
    let el = document.createElement('div')
    el.style.display = 'inline-block'
    el.style.position = 'absolute'
    el.id = `water_marker_${this.playId}`
    el.style.top = '40px'
    el.style.left = '40px'
    el.style.lineHeight = '20px'
    el.style.color = '#fff'
    el.style.fontSize = '14px'
    el.style.textAlign = 'left'
    el.style.pointerEvents = 'none'
    el.style.filter = 'opacity(0.3)'
    el.style.textShadow = '1px 1px 0px rgba(0, 0, 0, 0.2),\n' +
      '      1px 2px 0px rgba(0, 0, 0, 0.2),\n' +
      '      1px 3px 0px rgba(0, 0, 0, 0.2)'
    el.style.mixBlendMode = 'lighten'
    el.style.zIndex = 99
    // el.style.transform = 'rotateZ(-45deg)'
    el.innerHTML = content
    this.waterMarkerDom = el
    wrap?.appendChild(el)
    // 开始动画
    this.create_animate1(el)
    await this.wait(1000)
    // 监听水印，防篡改
    this.observe_c(el)
    // 监听水印，防删除
    this.observe_p(wrap)
  }

  create_animate1(el) {
    let delay = 2 // 60秒变一次
    // let keyframes = [
    //   { transform: `translate(0 ,0)` }, // 起始位置
    //   { transform: `translate(calc(${this.width - 80}px - 100%), 0)`}, // 右侧
    //   { transform: `translate(calc(${this.width - 80}px - 100%), calc(${this.height - 140}px - 100%))` }, // 底部
    //   { transform: `translate(0, calc(${this.height - 140}px - 100%))` }, // 左侧
    // ]
    let max_width = this.width - el.offsetWidth - 40
    let max_height = this.height - el.offsetHeight - 40
    let x = (Math.random() * max_width).toFixed(0)
    let y = (Math.random() * max_height).toFixed(0)
    let transform = {
      transform: 'translate(' + `calc(${x}px)` + ',' +`calc(${y}px)` + ')'
    }

    // 执行动画
    el.animate(transform, {
      duration: 0,
      fill: 'forwards',
      easing: 'cubic-bezier(.31,.01,1,1.27)',
      delay: 0,
    })

    // 重复调用动画帧
    this.timer = setInterval(() => {
      delay --
      if (delay === 0) {
        delay = 3
        clearInterval(this.timer)
        this.create_animate1(el)
      }
    }, 1000)
  }

  create_animate(el) {
    let delay = 1000 * 6
    el.animate(
        [
          { transform: `translate(0 ,0) rotateZ(-45deg)` }, // 起始位置
          { transform: `translate(calc(${this.width - 40}px - 100%), 0) rotateZ(45deg)`}, // 右侧
          { transform: `translate(calc(${this.width - 40}px - 100%), calc(${this.height - 140}px - 100%)) rotateZ(45deg)` }, // 底部
          { transform: `translate(0, calc(${this.height - 140}px - 100%)) rotateZ(-45deg)` }, // 左侧
          { transform: `translate(0, 0) rotateZ(-45deg)`} // 返回起始位置
        ],
        {
          duration: delay,
          iterations: Infinity, // 无限循环
          easing: 'linear',
          delay: 0,
        }
    )
  }

  observe_c(el) {
    let config = { attributes: true, characterData: true, childList: true, subtree: true }
    this.observer_c = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        switch (mutation.type) {
          case 'attributes':
          case 'childList':
          case 'characterData':
            Notification({
              title:'提示',
              message:'请勿篡改水印哦，尊重版权！',
              type:'warning',
              showClose:true,
            })
            this.destroy(this.getElement())
            this.create()
            break;
          default:
            break;
        }
      }
    });
    this.observer_c.observe(el, config);
  }

  observe_p(wrap) {
    let config = { attributes: true, characterData: true, childList: true, subtree: true }
    this.observer_p = new MutationObserver((mutationsList, observer) => {
      for (let mutation of mutationsList) {
        switch (mutation.type) {
          case 'childList':
            let removedNodes = Array.from(mutation.removedNodes)
            // 这里要判断是否单独有水印，因为可能会有父元素也被删除
            if (removedNodes.length && removedNodes[0].id === `water_marker_${this.playId}`) {
              Notification({
                title:'提示',
                message:'请勿删除水印哦，尊重版权！',
                type:'warning',
                showClose:true,
              })
              this.destroy(this.getElement())
              this.create()
            }
            break;
          default:
            break;
        }
      }
    });
    this.observer_p.observe(wrap, config);
  }

  destroy(el = this.getElement()) {
    clearInterval(this.timer)
    this.observer_c?.disconnect()
    this.observer_p?.disconnect()
    el? el.remove() : ''
  }

  getElement() {
    return this.waterMarkerDom || document.getElementById(`water_marker_${this.playId}`)
  }

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
