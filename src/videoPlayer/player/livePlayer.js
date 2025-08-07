import poster from '@/assets/img/shineon-load.gif'
import {isM3u8, isChrome} from "@/utils/common";

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

export default class livePlayer {
  constructor(config) {
    this.config = config
    this.player = {}
    this.onLoadFinish = null
    this.onPlayTime = null
    this.onPlayState = null
    this.onPlayFinish = null

    // 启动初始化播放器
    this.run()
  }

  run() {
    let iterator = this._init()

    let {value, done} = iterator.next()

    if (!done) {
      iterator.next()
      iterator.next()
    }
  }

  // 初始化
  @logMethod()
  * _init() {
    let {id, type, url, index, count} = this.config
    if (!id) {
      throw new Error('Container id is required')
    }
    if (!url) {
      throw new Error('player url is required')
    }

    // 创建video
    yield this.createVideo(id, url)

    if (!this.player) {
      return {value: undefined, done: true}
    }

    // 监听video一系列事件
    yield this.initEvent(this.player)
  }

  // 创建video
  @logMethod()
  createVideo(id, url) {
    try {
      // 获取包裹器
      let el = document.querySelector(id)
      if (!el) {
        throw new Error('Player id is required')
      }
      el.innerHTML = ''
      let video = document.createElement('video')
      el.appendChild(video)
      this.player = videojs(video, {
          liveui: true,
          autoplay: isChrome() ? 'muted' : true,
          controls: false,
          volume: 0,
          sources: [{
            src: url,
            type: 'application/x-mpegURL'
          }],
          userActions: {
            click: false, // 用户单机行为
            doubleClick: false, // 用户双击行为
            hotkeys: false, // 热键行为
          }
        }
      )
    } catch (err) {
      throw new Error('create video error' + err)
    }
  }

  // 监听video一系列事件
  @logMethod()
  async initEvent(player) {
    if (!player) {
      return
    }
    let events = ['canplay', 'play', 'pause', 'timeupdate', 'volumechange', 'ended', 'error'];
    events.forEach(item => {
      let name = item
      let handlerName = `on${name.charAt(0).toUpperCase() + name.slice(1)}`
      player.on(item, this[handlerName].bind(this))
    })
  }

  onCanplay() {
    this.onLoadFinish && this.onLoadFinish()
  }

  onPlay() {
    console.log('play')
    this.onPlayState && this.onPlayState(true)
  }

  onPause() {
    this.onPlayState && this.onPlayState(false)
  }

  onTimeupdate() {
    this.onPlayTime && this.onPlayTime(this.player.currentTime())
  }

  onVolumechange() {

  }

  onEnded() {
    this.onPlayFinish && this.onPlayFinish()
  }

  onError(err) {
    console.log(err)
  }

  play() {
    this.player.play()
    this.onPlayState && this.onPlayState(true)
  }

  pause() {
    this.player.pause()
    this.onPlayState && this.onPlayState(false)
  }

  isPlaying() {
    return !this.player.paused
  }

  seek(pts) {
    requestAnimationFrame(() => {
      this.player.currentTime = pts
    })
  }

  setVoice(volume) {
    this.player.volume(volume)
  }

  mediaInfo() {
    return {
      duration: this.player.duration * 1000
    }
  }

  release() {
    try {
      this.player.dispose();
    } catch {

    }
  }

  setPlaybackRate(rate) {
    this.player.playbackRate = rate
  }
}
