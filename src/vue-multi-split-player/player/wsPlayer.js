import poster from '@/assets/img/shineon-load.gif'
import useControlListener from '../hook/useControlListener'

// 日志装饰器
let logMethod = () => {
  return function (target, name, descriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function (...args) {
      // console.log(`[${name}]`);
      // console.log(`[${name}]`, ...args);
      return originalMethod.apply(this, args);
    };
  }
}

export default class WsPlayer {
  constructor(config) {
    this.config = config
    this.disableControlList = ['PPT', 'PGM', '老师全景', '学生全景']
    this.player = {}
    this.onLoadFinish = null
    this.onPlayTime = null
    this.onPlayState = null
    this.onPlayFinish = null
    this.replyCount = 5
    // 初始化遥控hook
    this.use_control_listener = useControlListener(this.config.eventBus)
    // 启动初始化播放器
    this.run()
  }

  run() {
    let iterator = this._init()

    let { value, done } = iterator.next()

    if (!done) {
      iterator.next()
      iterator.next()
      iterator.next()
    }
  }

  // 初始化
  @logMethod()
  async *_init() {
    let {id, classroomId, type, url, index, count, name} = this.config
    if (!id) {
      throw new Error('Container id is required')
    }
    if (!url) {
      throw new Error('player url is required')
    }

    // 创建video
    yield await this.createVideo(id, url, name)

    // 创建遥控面板
    yield await this.createControlLayout(id, classroomId, name)

    if (!this.player) {
      return { value: undefined, done: true }
    }

    // yield new Promise(resolve => setTimeout(resolve, 500))

    // 监听video一系列事件
    yield await this.initEvent(this.player)
  }

  // 创建video
  @logMethod()
  async createVideo(id, url, name, retryCount = 0) {
    let args = Array.from(arguments);
    try {
      // 获取包裹器
      let el = document.querySelector(id)
      if (!el) {
        throw new Error('Player id is required')
      }
      el.innerHTML = ''
      let video = document.createElement('video')
      video.id = `video_${id}`
      video.classList = ['video__']
      video.controls = false
      // TODO 这里和播放器的初衷互斥了，没办法，free.player.js 监听不到加载完成事件，只能用这个了
      video.autoplay = true
      video.playsInline = true
      video.preload = 'auto'
      video.poster = poster
      video.volume = 0
      video.controls = false
      // video.style.background = `url(${name === 'PPT' ? pptBG : deviceBG}) no-repeat center center`
      el.appendChild(video)
      // 创建player
      this.player = await Streamedian.player(video.id, {
        socket: url,
        // redirectNativeMediaErrors: true,
        bufferDuration: 10,
        dataHandler: this._handleData,
        errorHandler: err => this._handlerError(err, ...args, retryCount)
      });
    } catch (err) {
      throw new Error(err)
    }
  }

  // 创建遥控面板
  @logMethod()
  async createControlLayout(id, classroomId, name) {
    if (!this.config.isEnableControl) {
      return
    }
    // 获取包裹器
    let wrap = document.getElementById(id)
    // 移除之前的遥控面板
    let _r = function () {
      let _c = wrap.querySelector('.remote_control')
      _c && _c.parentNode.removeChild(_c);
    }.apply()
    if (this.disableControlList.includes(name)) {
      return
    }
    // 创建遥控面板
    let _c = function () {
      let el = document.createElement('div')
      el.classList = ['remote_control']
      el.innerHTML = ' <div class="activeElement" data-type="3"><i class="iconfont icon-shangxiazuoyouTriangle12"></i></div>\n' +
        '              <div class="activeElement" data-type="2"><i class="iconfont icon-shangxiazuoyouTriangle12"></i></div>\n' +
        '              <div class="activeElement" data-type="4"><i class="iconfont icon-shangxiazuoyouTriangle12"></i></div>\n' +
        '              <div class="activeElement" data-type="1"><i class="iconfont icon-shangxiazuoyouTriangle12"></i></div>\n' +
        '              <div class="action activeElement" data-type="5"><i class="el-icon-plus"></i>放大</div>\n' +
        '              <div class="action activeElement" data-type="6"><i class="el-icon-minus"></i>缩小</div>\n' +
        '              <div class="action activeElement" data-type="10"><i class="el-icon-refresh-left"></i>还原</div>'
      wrap.appendChild(el)
      // 开启事件监听
      this.use_control_listener.startEventMonitoring(el, classroomId)
    }.apply(this)
  }

  // 监听video一系列事件
  @logMethod()
  initEvent(player) {
    let events = ['canplay', 'play', 'pause', 'seeked', 'loadedmetadata', 'timeupdate', 'volumechange', 'ended', 'error'];
    events.forEach(item => {
      let name = item
      let handlerName = `on${name.charAt(0).toUpperCase() + name.slice(1)}`
      player.player.addEventListener(item, this[handlerName].bind(this), { once: name === 'canplay' })
    })
  }

  onCanplay() {
    this.onLoadFinish && this.onLoadFinish()
  }

  onPlay() {
    this.onPlayState && this.onPlayState(true)
  }

  onPause() {
    this.onPlayState && this.onPlayState(false)
  }

  async onSeeked() {

  }

  async onLoadedmetadata() {

  }

  onTimeupdate() {
    this.onPlayTime && this.onPlayTime(this.player?.player.currentTime)
  }

  onVolumechange() {

  }

  onEnded() {
    this.onPlayFinish && this.onPlayFinish()
  }

  onError() {

  }

  play() {
    this.player.start()
    this.player.player?.play()
    this.onPlayState && this.onPlayState(true)
  }

  pause() {
    this.player.stop()
    this.player.player?.pause()
    this.onPlayState && this.onPlayState(false)
  }

  isPlaying() {
    return this.player.isPlaying()
  }

  setVoice(volume) {
    this.player.player.volume = volume
  }

  release() {
    try {
      this.player?.destroy();
      this.player.player?.parentNode.removeChild(this.player.player);
      // 停止监听
      this.use_control_listener.stopEventMonitoring()
    } catch {

    }
  }

  // 录屏时
  _handleData(data, prefix) {
    let oA = document.createElement('');
    // 处理录制
    // Create the Blob so we can download the video as a file
    let blob = new Blob([data], {type: "application/mp4"});
    // Create object link and set it to the HTML link element
    oA.href = window.URL.createObjectURL(blob);
    // Set file name
    oA.download = `${prefix}_${new Date()}.mp4`;
    // Call click method. Like a user clicked on a download link
    oA.click();
  }

  /**
   * @description: 错误处理
   * @param {Object} error
   * @param {Number} retryCount
   */
  async _handlerError(error, id, url, retryCount) {
    // 重试初始化
    if (retryCount < this.replyCount) {
      // 销毁
      await this.release()
      await new Promise(resolve => setTimeout(resolve, 1000))
      await this.createVideo(id, url, retryCount + 1)
    } else {
      throw new Error(`Max retry count (${this.replyCount}) reached`)
    }
  }
}
