import poster from '@/assets/img/shineon-load.gif'
import {isM3u8} from "@/utils/common";
import vtt from '../sub.vtt'

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

export default class VodPlayer {
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

    let { value, done } = iterator.next()

    if (!done) {
      iterator.next()
      iterator.next()
    }
  }

  // 初始化
  @logMethod()
  async *_init() {
    let {id, type, url, index, count} = this.config
    if (!id) {
      throw new Error('Container id is required')
    }
    if (!url) {
      throw new Error('player url is required')
    }

    // 创建video
    yield await this.createVideo(id, url)

    if (!this.player) {
      return { value: undefined, done: true }
    }

    // 监听video一系列事件
    yield await this.initEvent(this.player)

    // 添加VTT字幕
    yield await this.addVttSubtitle(this.player, index, count)
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
      // 创建player
      let video = document.createElement('video')
      video.poster = poster
      video.controls = false
      video.autoplay = false
      video.muted = false
      video.preload = 'auto'
      video.volume = 0
      video.classList = ['video__']
      if (isM3u8(url)) {
        let hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      } else {
        video.src = url
      }
      el.appendChild(video)
      this.player = video
    } catch(err) {
      throw new Error('create video error' + err)
    }
  }

  // 添加VTT字幕
  @logMethod()
  addVttSubtitle(video, index, count) {
    if (window.subtitleUrl && index === count - 1) {
      // 添加字幕
      let track = document.createElement('track')
      // track.src = `${stream.url.replace(stream.name, 'PGM.vtt')}`
      track.src = window.subtitleUrl || ''
      // track.src = vtt
      track.label = 'Chinese'
      track.srclang = 'zh'
      track.kind = 'subtitles'
      track.default = ' '
      video.appendChild(track)
    }
  }

  // 监听video一系列事件
  @logMethod()
  async initEvent(video) {
    if (!video) {
      return
    }
    await new Promise(resolve => setTimeout(resolve, 10))
    let events = ['canplay', 'play', 'pause', 'seeked', 'timeupdate', 'volumechange', 'ended', 'error'];
    events.forEach(item => {
      let name = item
      let handlerName = `on${name.charAt(0).toUpperCase() + name.slice(1)}`
      video.addEventListener(item, this[handlerName].bind(this), { once: name === 'canplay' })
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

  onSeeked() {

  }

  onTimeupdate() {
    this.onPlayTime && this.onPlayTime(this.player.currentTime)
  }

  onVolumechange() {

  }

  onEnded() {
    this.onPlayFinish && this.onPlayFinish()
  }

  onError() {

  }

  do() {
    this.player.play()
    this.onPlayState && this.onPlayState(true)
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
    this.player.volume = volume
  }

  mediaInfo() {
    return {
      duration: this.player.duration * 1000
    }
  }

  release() {
    try {
      this.player.pause();
      this.player.src = '';
      this.player.load();
      this.player?.parentNode.removeChild(this.player);
    } catch {

    }
  }

  setPlaybackRate(rate) {
    this.player.playbackRate = rate
  }
}
