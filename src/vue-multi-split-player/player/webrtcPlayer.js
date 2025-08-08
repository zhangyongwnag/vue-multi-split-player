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

export default class WebrtcPlayer {
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
  async* _init() {
    let {id, classroomId, type, url, index, count, name} = this.config
    if (!id) {
      throw new Error('Container id is required')
    }
    if (!url) {
      throw new Error('player url is required')
    }

    // 创建video
    yield await this.createVideo(id, url, name)

    if (!this.player) {
      return {value: undefined, done: true}
    }

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
      video.autoplay = false
      video.playsInline = true
      video.preload = 'auto'
      video.poster = poster
      video.volume = 0
      el.appendChild(video)
      // 创建player
      this.player = new ZLMRTCClient.Endpoint(
        {
          element: video,// video 标签
          debug: false,// 是否打印日志
          zlmsdpUrl: 'http://10.0.129.131:8080/index/api/webrtc?app=live&stream=100_0&type=play', //流地址
          simulcast: false,
          useCamera: true,
          audioEnable: true,
          videoEnable: true,
          recvOnly: true,
          resolution: {w: 1280, h: 720},
          usedatachannel: false,
          audioId: '',
          videoId: '',
          // videoId:vdevid, // 不填选择默认的
          // audioId:adevid, // 不填选择默认的
        }
      );
      this.player.video = video
    } catch (err) {
      throw new Error(err)
    }
  }

  // 监听video一系列事件
  @logMethod()
  initEvent(player) {
    // let events = ['canplay', 'play', 'pause', 'seeked', 'loadedmetadata', 'timeupdate', 'volumechange', 'ended', 'error'];
    let events = ['canplay', 'play', 'pause', 'seeked', 'loadedmetadata', 'timeupdate', 'volumechange', 'ended', 'error'];
    events.forEach(item => {
      let name = item
      let handlerName = `on${name.charAt(0).toUpperCase() + name.slice(1)}`
      player.video.addEventListener(item, this[handlerName].bind(this), { once: name === 'canplay' })
    })

    player.on(ZLMRTCClient.Events.WEBRTC_ICE_CANDIDATE_ERROR, function (e) {
      // ICE 协商出错
      console.log('ICE 协商出错');
    });

    player.on(ZLMRTCClient.Events.WEBRTC_ON_REMOTE_STREAMS, e => {
      //获取到了远端流，可以播放
      this.onCanplay()
      console.log('播放成功', e.streams);
    });

    player.on(ZLMRTCClient.Events.WEBRTC_OFFER_ANWSER_EXCHANGE_FAILED, function (e) {
      // offer anwser 交换失败
      console.log('offer anwser 交换失败', e);
      stop();
    });

    player.on(ZLMRTCClient.Events.WEBRTC_ON_LOCAL_STREAM, function (s) {
      // 获取到了本地流
      document.getElementById('selfVideo').srcObject = s;
      document.getElementById('selfVideo').muted = true;
      //console.log('offer anwser 交换失败',e)
    });

    player.on(ZLMRTCClient.Events.CAPTURE_STREAM_FAILED, function (s) {
      // 获取本地流失败
      console.log('获取本地流失败');
    });

    player.on(ZLMRTCClient.Events.WEBRTC_ON_CONNECTION_STATE_CHANGE, function (state) {
      // RTC 状态变化 ,详情参考 https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/connectionState
      console.log('当前状态==>', state);
    });

    player.on(ZLMRTCClient.Events.WEBRTC_ON_DATA_CHANNEL_OPEN, function (event) {
      console.log('rtc datachannel 打开 :', event);
    });

    player.on(ZLMRTCClient.Events.WEBRTC_ON_DATA_CHANNEL_MSG, function (event) {
      console.log('rtc datachannel 消息 :', event.data);
      document.getElementById('msgrecv').value = event.data;
    });
    player.on(ZLMRTCClient.Events.WEBRTC_ON_DATA_CHANNEL_ERR, function (event) {
      console.log('rtc datachannel 错误 :', event);
    });
    player.on(ZLMRTCClient.Events.WEBRTC_ON_DATA_CHANNEL_CLOSE, function (event) {
      console.log('rtc datachannel 关闭 :', event);
    });
  }

  onCanplay() {
    console.log('canplay')
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
    this.onPlayTime && this.onPlayTime(this.player?.video.currentTime)
  }

  onVolumechange() {

  }

  onEnded() {
    this.onPlayFinish && this.onPlayFinish()
  }

  onError() {
    // this.player.video.poster = pptBG
  }

  play() {
    this.player.start()
    this.player.video?.play()
    this.onPlayState && this.onPlayState(true)
  }

  pause() {
    this.player.video?.pause()
    this.onPlayState && this.onPlayState(false)
  }

  isPlaying() {
    return !this.player.video.paused
  }

  setVoice(volume) {
    this.player.video.volume = volume
  }

  release() {
    try {
      this.player.close()
      this.player.closeDataChannel()
      this.player.video.load()
      this.player.video?.parentNode.removeChild(this.player.video);
    } catch {

    }
  }
}
