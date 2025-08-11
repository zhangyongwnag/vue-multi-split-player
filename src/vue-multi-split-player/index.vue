<template>
  <div class="video_player_pc _flex_center" id="video_player" :style="videoPlayerStyle">
    <div class="player_wrap"
         :class="{ 'player_wrap_pip': isPipMode && resource_list.length === 2 }"
         :id="`${waterMarkerId}`"
         :style="resource_list.length === 1 ? { width: 'auto', height: '100%' } : {}">
      <!--单屏-->
      <div v-if="resource_list.length === 1" :id="`${playId}`" class="player_list default_screen">
        <div :class="{ 'flip': flip }" class="player_item _flex_item_center" id="player_item_1">
        </div>
      </div>
      <!--二分屏-->
      <div v-if="resource_list.length === 2" :id="`${playId}`" class="player_list two_split_screen _flex_item_center">
        <div :class="{ 'flip': flip, 'pip_main': isPipMode }" class="player_item _flex_item_center" style="width: 50%;" id="player_item_1"></div>
        <div :class="{ 'flip': flip, 'pip_sub': isPipMode }" class="player_item _flex_item_center" style="width: 50%" id="player_item_2"></div>
      </div>
      <!--三分屏-->
      <div v-if="resource_list.length === 3" :id="`${playId}`" class="player_list _flex_item_center three_split_screen">
        <div style="width: 50%; height: 100%">
          <div :class="{ 'flip': flip }" class="player_item _flex_item_center" style="height: 50%;" id="player_item_1"></div>
          <div :class="{ 'flip': flip }" class="player_item _flex_item_center" style="height: 50%" id="player_item_2"></div>
        </div>
        <div :class="{ 'flip': flip }" class="player_item _flex_item_center" style="width: 100%;"
             id="player_item_3"></div>
      </div>
      <!--四分屏-->
      <div v-if="resource_list.length === 4" :id="`${playId}`" class="player_list _flex_item_center four_split_screen">
        <div style="width: 26.6%">
          <div :class="{ 'flip': flip }" class="player_item _flex_item_center" id="player_item_1"></div>
          <div :class="{ 'flip': flip }" class="player_item _flex_item_center" id="player_item_2"></div>
          <div :class="{ 'flip': flip }" class="player_item _flex_item_center" id="player_item_3"></div>
        </div>
        <div :class="{ 'flip': flip }" class="player_item _flex_item_center" id="player_item_4">
        </div>
      </div>
      <!--五分屏-->
      <div v-if="resource_list.length === 5" :id="`${playId}`" class="player_list _flex_item_center five_split_screen">
        <div style="width: 25%">
          <div :class="{ 'flip': flip }" class="player_item _flex_item_center" id="player_item_1"></div>
          <div :class="{ 'flip': flip }" class="player_item _flex_item_center" id="player_item_2"></div>
          <div :class="{ 'flip': flip }" class="player_item _flex_item_center" id="player_item_3"></div>
          <div :class="{ 'flip': flip }" class="player_item _flex_item_center" id="player_item_4"></div>
        </div>
        <div :class="{ 'flip': flip }" class="player_item _flex_item_center" style="width: 100%"
             id="player_item_5"></div>
      </div>
      <!--加载图-->
      <div v-if="!is_init" class="loading _flex_center">
        <img src="@/assets/img/shineon-load.gif" alt="">
      </div>
    </div>
    <!--自定义控件-->
    <footer v-if="isEnableToolbar" :style="is_loading ? { pointerEvents: 'none' } : {}">
      <Slide
          v-if="mode === 'vod'"
          ref="slide"
          v-model="current"
          :duration="+ duration"
          :mark="noteList"
          @update="value => _register_emits('current', value)"
      />
      <div class="toolbar _flex_item_center">
        <div class="playing _flex_center" @click="handle_click('play')">
          <!--<i :class=`iconfont'icon-24gf-pause2' : 'icon-24gf-play'} }`></i>-->
          <i :class="`iconfont ${!play ? 'icon-24gf-play' : 'icon-24gf-pause2'}`"></i>
        </div>
        <div class="time">
          {{ common.filterTime(current, 1) }}
          <span style="font-weight: bold" v-if="mode === 'vod'">
            &nbsp;/&nbsp;&nbsp;{{ common.filterTime(duration, 1) }}
          </span>
        </div>
        <el-popover
            style="margin-left: auto"
            placement="top"
            :append-to-body="false"
            :popper-options="{ boundariesElement: '.toolbar', removeOnDestroy: false }"
            width="50px"
            popper-class="popper_custom"
            trigger="hover">
          <div class="select_list mode_list">
            <div :disabled="!isExists(resource_list, 'PGM')" :class="{ 'active': isMovieMode }" class="item _flex_center" @click="handle_click('screening', 'movie')">
              <i class="iconfont icon--"></i>
              <span>电影模式</span>
            </div>
            <div :disabled="resource_list.length !== 2" :class="{ 'active': isPipMode }" class="item _flex_center" @click="handle_click('screening', 'pip')">
              <i class="iconfont icon-btn_trophy_defaultbeifen"></i>
              <span>画中画</span>
            </div>
            <div :class="{ 'active': !isMovieMode && !isPipMode}" class="item _flex_center" @click="handle_click('screening', 'multiSplitScreen')">
              <i class="iconfont icon-erjicaidan--duopingmu"></i>
              <span>多分屏</span>
            </div>
          </div>
          <div slot="reference" class="definition mode _flex_center" >
            <span>{{ isMovieMode ? '电影模式' : ( isPipMode ? '画中画' : '多分屏' ) }}</span>
          </div>
        </el-popover>
        <el-popover
            v-if="isEnableOcr"
            placement="top"
            width="50px"
            :append-to-body="false"
            :popper-options="{ boundariesElement: '.toolbar', removeOnDestroy: false }"
            popper-class="popper_custom"
            trigger="hover">
          <div class="select_list ocr_list">
            <div :disabled="muted" v-for="(item, index) in resource_list" :key="index"
                 class="item _flex_center" @click="handle_click('ocr', item)">
              <i class="iconfont icon-ocr"></i>
              <span>{{ item.sceneName }}</span>
            </div>
          </div>
          <div slot="reference" class="definition _flex_center" >
            <span>OCR</span>
          </div>
        </el-popover>
        <el-popover
            placement="top"
            width="50px"
            :append-to-body="false"
            :popper-options="{ boundariesElement: '.toolbar', removeOnDestroy: false }"
            popper-class="popper_custom"
            trigger="hover">
          <div class="select_list">
            <div v-for="item in definition_list" :class="{ 'active': definition === item }" class="item _flex_center"
                 @click="handle_click('definition', item)">
              <span>{{ item }}</span>
            </div>
          </div>
          <div slot="reference" class="definition _flex_center" >
            <span>{{ definition }}</span>
          </div>
        </el-popover>
        <el-popover
            v-if="mode === 'vod'"
            placement="top"
            width="50px"
            :append-to-body="false"
            :popper-options="{ boundariesElement: '.toolbar', removeOnDestroy: false }"
            popper-class="popper_custom popper_custom_rate"
            trigger="hover">
          <div class="select_list">
            <div v-for="(item, index) in rate_list" :key="index" :class="{ 'active': rate === item }"
                 class="item _flex_center" @click="_register_emits('rate', item)">
              <span>{{ item }}x</span>
            </div>
          </div>
          <div slot="reference" class="rate _flex_center" >
            <span>{{ rate }}x</span>
          </div>
        </el-popover>
        <!--<el-popover
            placement="top"
            width="50px"
            popper-class="popper_custom popper_custom_setting"
            trigger="hover">
          <div class="select_list">
            <div class="item setting_item _flex_between_center">
              <span>镜像画面：</span>
              <el-switch
                  style="display: block; margin-right: 10px; transform: scale(0.9)"
                  v-model="flip"
                  active-color="var(&#45;&#45;common-color)"
                  inactive-color="#999"
                  @change="handle_click('flip', flip)">
              </el-switch>
            </div>
            <div v-if="mode === 'vod'" class="item setting_item _flex_between_center">
              <span>循环播放：</span>
              <el-switch
                  style="display: block; margin-right: 10px; transform: scale(0.9)"
                  v-model="loop"
                  active-color="var(&#45;&#45;common-color)"
                  inactive-color="#999"
                  @change="handle_click('loop', loop)">
              </el-switch>
            </div>
          </div>
          <div slot="reference" class="setting _flex_center">
            <i class="iconfont icon-shezhi-shezhi-tianchong"></i>
          </div>
        </el-popover>-->
        <el-popover
            placement="top"
            width="50px"
            :append-to-body="false"
            :popper-options="{ boundariesElement: '.toolbar', removeOnDestroy: false }"
            popper-class="popper_custom popper_custom_voice"
            trigger="hover">
          <div class="select_list channel_list">
            <div v-for="(item, index) in fileListCustom" :key="index"
                 :class="{ 'active': channel_list.has(item.id) }"
                 class="item _flex_center" @click="handle_click('channel', item.id)">
              <i :class="`iconfont ${channel_list.has(item.id) ? 'icon-xianshikejian' : 'icon-yincangbukejian'}`"></i>
              <span>{{ item.sceneName }}</span>
            </div>
          </div>
          <div slot="reference" class="channel _flex_center">
            <!--<i class="iconfont icon-liebiaofenlei"></i>-->
            <i class="iconfont icon-tuwenliebiao"></i>
          </div>
        </el-popover>
        <el-popover
            placement="top"
            width="80px"
            :append-to-body="false"
            :popper-options="{ boundariesElement: '.toolbar', removeOnDestroy: false }"
            popper-class="popper_custom popper_custom_voice"
            trigger="hover">
          <div class="select_list voice_list">
            <div :disabled="muted" v-for="(item, index) in resource_list" :key="index"
                 :class="{ 'active': voice.has(item.sceneName) }"
                 class="item _flex_center" @click="handle_click('muted', item)">
              <img v-if="voice.has(item.sceneName)" src="@/assets/img/voice3.png" alt="">
              <img v-else src="@/assets/img/voice1.png" alt="">
              <span>{{ item.sceneName }}</span>
            </div>
          </div>
          <div slot="reference" class="channel _flex_center">
            <!--<i class="iconfont icon-liebiaofenlei"></i>-->
            <i class="iconfont icon-yinpinliebiao"></i>
          </div>
        </el-popover>
        <el-popover
            placement="top"
            width="160px"
            :append-to-body="false"
            :popper-options="{ boundariesElement: '.toolbar', removeOnDestroy: false }"
            trigger="manual"
            popper-class="popper_custom popper_custom_voice"
            v-model="isShowVolumeTip">
          <div style="padding: 0.03rem">
            <span style="color: white">检测到声音未开启！</span>
            <br>
            <el-button style="margin-top: 0.07rem" type="primary" size="mini" @click="handleOpenVoiceByClick">点击开启</el-button>
          </div>
          <div slot="reference" class="voice _flex_item_center">
            <div class="voice_btn _flex_center" @click="_register_emits('volume', volume ? 0 : 70)">
              <img v-if="volume === 0" src="@/assets/img/voice1.png" alt="">
              <img v-else-if="volume >= 50" src="@/assets/img/voice3.png" alt="">
              <img v-else-if="volume > 0" src="@/assets/img/voice2.png" alt="">
            </div>
            <div class="voice_slide">
              <el-slider
                  style="width: 100%"
                  v-model="volume"
                  :min="0"
                  :max="100"
                  @change="_register_emits('volume', volume)">
              </el-slider>
            </div>
          </div>
        </el-popover>
        <FullScreen v-model="fullscreen_status" ref="fullscreen" :type="1">
          <div class="full _flex_center" @click="handle_click('fullscreen')">
            <i v-if="!fullscreen_status" class="iconfont icon-quanping1"></i>
            <i v-else class="iconfont icon-quxiaoquanping"></i>
          </div>
        </FullScreen>
      </div>
    </footer>

    <!--OCR识别-->
    <!--<ocrResult-->
    <!--    v-model="show_ocr"-->
    <!--    :type="mode === 'vod' ? 2 : 1"-->
    <!--    :fullscreen="fullscreen_status"-->
    <!--    :origin="ocr_origin"-->
    <!--    :curPlayTime="current * 1000"-->
    <!--    @cancel="cancelOcrModel"/>-->

    <!--弹幕-->
    <!--<danmuku :mode="mode" :isEnableDanmu="isEnableDanmu"/>-->
  </div>
</template>

<script setup>
import {ref, reactive, watch, computed, nextTick, onMounted, onBeforeUnmount, getCurrentInstance} from 'vue';
import Slide from '@/components/slide.vue';
import * as common from '@/utils/common';
import FullScreen from '@/components/fullscreen.vue';
import WaterMarker from './player/waterMarker';
// import ocrResult from '../../components/ocrResult';
// import danmuku from './danmuku';
import {dblclick, throttle, typeDetection} from "@/utils/common";
import VodPlayer from './player/vodPlayer';
import WsPlayer from './player/wsPlayer';
import WebrtcPlayer from './player/webrtcPlayer';
import LivePlayer from './player/livePlayer';
import useVoiceChannel from "./hook/useVoiceChannel";
import eventBus from "@/utils/eventBus";
import useChannelExists from './hook/useChannelExists'
import usePlayerEmit from './hook/usePlayerEmit'
import AudioResource from '@/assets/audio/voice.m4a'

// 修复后的代码
const instance = getCurrentInstance()
const _t = instance ? instance.proxy : null

let { isExists } = useChannelExists()

let use_player_emit = null

// 定义 props
const props = defineProps({
  // 模式 live vod websocket webrtc
  mode: {
    type: String,
    default: 'live',
    required: true
  },
  playStreams: {
    type: Object,
    default: () => {}
  },
  fileList: {
    type: Array,
    default: () => []
  },
  // mark点
  noteList: {
    type: Array,
    default: () => []
  },
  muted: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  // 当前点播/直播的教室类型
  classroomType: {
    type: Number | String,
    default: ''
  },
  // 是否开启弹幕
  isEnableDanmu: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  // 是启用遥控，仅在weboskcet下有效
  isEnableControl: {
    type: Boolean,
    default: false
  },
  // 是否启用OCR，默认启用
  isEnableOcr: {
    type: Boolean,
    default: false // 是否展示ocr图片转文字
  },
  // 是否启用菜单栏
  isEnableToolbar: {
    type: Boolean,
    default: true
  },
  // 是否启用水印
  isEnableWaterMarker: {
    type: Boolean,
    default: false
  }
})

// 定义 emits
const emits = defineEmits(['ready', 'timeupdate', 'startControl', 'stopControl', 'updateChannel'])

let {voiceChannel} = useVoiceChannel(props.classroomType)

let is_loading = ref(true); // 是否准备中
let is_init = ref(false);// 是否初始化完成
let fileList = ref([]);// 资源列表
let fileListCustom = ref([]);// 要看的所有通道
let resource_list = ref([]);// 资源列表
let video_player = ref([]);// 当前的播放列表
let playId = ref('') // 当前播放器的全局唯一ID
let current = ref(0); // 当前的播放时间点
let duration = ref(0); //当前的播放器总时长
let play = ref(false); //当前的播放状态
let voice = ref(new Set([])); //当前播放声音的通道列表
let definition_list = ref(['高清', '标清']) // 清晰度列表
let definition = ref('高清'); //当前的清晰度
let rate_list = ref(['0.5', '1.0', '1.5', '2.0', '5.0']); //倍速列表
let channel_list = ref(new Set([])); //当前选择的通道
let rate = ref('1.0'); //当前的倍速
let volume = ref(0); //音量大小
let fullscreen_status = ref(false); //是否全屏
let loop = ref(localStorage.getItem('loop') === 'true'); // 是否循环播放
let flip = ref(false); //是否镜像视频
let waterMarker = ref(''); //水印
let waterMarkerId = ref(''); //水印ID
let show_ocr = ref(false); //ocr识别
let ocr_origin = ref({}); //ocr识别数据源
let fullscreen = ref(null) // 全屏组件
let slide = ref(null) // slide组件
let isMovieMode = ref(false) // 是否电影模式
let isPipMode = ref(false) // 是否画中画模式
let isShowVolumeTip = ref(false) // 是否显示自动播放声音弹窗
let isDisabledAutoplay = ref(false) // 是否禁用自动播放，强制播放，一般在首次加载完之后设置为true

// 播放器样式
let videoPlayerStyle = computed(() => {
  return props.width ? {
    width: `${props.width}px`,
    height: `${props.height}px`
  } : {};
})

onMounted(() => {
  window.addEventListener('resize', _listener_fullscreen_status)
})

onBeforeUnmount(() => {
  _reset()
  window.removeEventListener('resize', _listener_fullscreen_status)
})

/**
 * @description 初始化播放器
 */
let __init = async () => {
  is_loading.value = true
  // 判断当前清晰度有无资源列表，如果没有初始化完毕
  if (fileList.value.length) {
    let fileListC = JSON.parse(JSON.stringify(fileList.value))
    // 统一通道名称
    fileListC.map((item, index) => item.sceneName = _filterChannelName(item.name, index))
    // 保存全部通道，用来展示要看的通道
    fileListCustom.value = fileListC
    // 因为目前只支持五分屏，所以截取前五个视频资源
    let fileListSlice = [...fileListCustom.value].slice(0, 5)
    // 如果当前没有要看的通道，则添加所有通道
    !channel_list.value.size ? channel_list.value = new Set(fileListSlice.map(item => item.id)) : ''
    // 过滤出当前要看的通道
    resource_list.value = fileListSlice.filter(item => channel_list.value.has(item.id));
    // 更新播放器唯一ID，这样做的目的放在一个页面同时多次播放同一个资源
    await _setPlayId()
    await new Promise(resolve => setTimeout(resolve, 10))
    nextTick(async _ => {
      resource_list.value.map((item, index) => {
        let video = {}
        // 点播
        if (props.mode === 'vod') {
          video = new VodPlayer({
            url: item.url,
            id: `#${playId.value} #player_item_${index + 1}`,
            index,
            count: resource_list.value.length
          })
        } else if (props.mode === 'live') {
          // 直播 m3u8 flv
          video = new LivePlayer({
            url: item.url,
            id: `#${playId.value} #player_item_${index + 1}`,
            index,
            count: resource_list.value.length
          })
        } else if (props.mode === 'websocket') {
          // free.player.js websocket
          video = new WsPlayer({
            url: item.url,
            classroomId: item.id,
            name: item.sceneName,
            id: `#${playId.value} #player_item_${index + 1}`,
            index,
            count: resource_list.value.length,
            eventBus,
            isEnableControl: props.isEnableControl
          })
        } else if (props.mode === 'webrtc') {
          // webrtc zlplayer
          video = new WebrtcPlayer({
            url: item.url,
            name: item.sceneName,
            id: `#${playId.value} #player_item_${index + 1}`,
            index,
            count: resource_list.value.length,
          })
        }
        video.id = item.id
        video.sceneName = item.sceneName
        video_player.value.push(video)
      })
      video_player.value.map(item => {
        // 更新播放器样式
        _updateVideoStyle(item)
        // 监听加载完成，准备就绪
        item.onLoadFinish = () => {
          console.log('load finish')
          // 更新播放器样式
          _updateVideoStyle(item)
          if (!is_init.value) {
            // 初始化播放器
            initializePlayer(item)
            is_loading.value = false;
          }
          is_init.value = true;
        }
      })
      // 注册DOM事件
      await _registerDomEvent()
      await new Promise(resolve => setTimeout(resolve, 5000))
      // 如果播放器出问题，5秒后，强制关闭加载
      is_loading.value = false;
      // TODO 这里需加入重试次数，超过不执行了，浪费内存
      // 如果当前是点播，并且5秒后，还没有初始化完毕，则重新初始化
      if (props.mode === 'vod' && !is_init.value && video_player.value.length) {
        // 重新构建
        _replyRenderPlayer()
      }
    })
  } else {
    is_loading.value = false
  }
}

// 初始化播放器
let initializePlayer = async (item) => {
  // 开始监听事件
  await _listener_emit(item)
  // 注册静音事件
  await _register_emits('muted')
  // 点播判断是否需要跳转上次播放时间
  if (current.value && props.mode === 'vod') {
    await _register_emits('current', current.value);
  }
  // 注册播放事件
  if (props.autoplay || isDisabledAutoplay.value) {
    await _register_emits('play')
  } else {
    await _register_emits('pause')
  }
  // 点播获取视频播放总时长
  props.mode === 'vod' ? await _get_duration() : ''
  if (props.autoplay) {
    try {
      await _isAllowPlayByVoice();
      console.log('Allow play with voice');
    } catch (err) {
      console.log('Not allow play with voice');
      await _register_emits('volume', 0);
    }
  }
  // 统一处理声音通道配置
  !props.muted && await _handleDefaultVoice();
  // 配置水印
  props.isEnableToolbar && await _handleWaterMarker()
  // 禁用自动播放判断逻辑，强制播放
  isDisabledAutoplay.value = true
  // 准备就绪
  emits('ready')
}

/**
 * @description 注册DOM事件
 */
let _registerDomEvent = () => {
  let _m = video_player.value.length
  use_player_emit = usePlayerEmit({eventBus, video_player: video_player.value, playId: playId.value})
  // 初始化dom监听事件
  use_player_emit.init()
  eventBus.on('switch', event => {
    // 切换画面
    handle_click('switch', event)
  })
  eventBus.on('maximize', event => {
    // 全屏
    handle_click('maximize', event)
  })
  eventBus.on('dragend', event => {
    // 切换位置
    _handleSwitchVideo(event.target, event.source)
  })
}

/**
 * @description 注册emit
 * @param {String} type: 事件类型
 * @param {Number} value: 修改的值
 */
let _register_emits = (type, value) => {
  video_player.value.map((item, index) => {
    // 如果没启动，优先启动播放器
    switch (type) {
      case 'play':
        !item.isPlaying() ? item.play() : ''
        break
      case 'pause':
        // 全部暂停播放
        item.pause()
        break
      case 'replay':
        item.seek(0)
        // 重新观看
        item.play()
        break
      case 'destroy':
        // 全部销毁
        item.release()
        // TODO 清空元素里面所有东西
        // TODO 这里涉及到一个页面有多个播放器播放同一个资源的问题，需要处理，ID一致
        // 手动删除video元素
        // let video = document.getElementById(`video_${item.id}`)
        // video && video.parentNode.removeChild(video)
        break
      case 'muted':
        // 将非静音的通道设置音量为内存中的音量值
        voice.value.has(item.sceneName) ? item.setVoice(+(volume.value / 100)) : item.setVoice(0)
        break
      case 'rate':
        // 设置倍速
        item.setPlaybackRate(+value)
        rate.value !== value ? rate.value = value : ''
        break
      case 'current':
        // 设置进度
        item.seek(value)
        // 立即更新
        current.value = value
        break
      case 'volume':
        // 将非静音的通道设置音量为音量值
        voice.value.has(item.sceneName) ? item.setVoice(+(value / 100)) : ''
        volume.value = +value
        break
      default:
        break
    }
  })
}

/**
 * @description 开始播放监听
 */
let _listener_emit = (player) => {
  // 监听播放时间
  player.onPlayTime = time => {
    time ? current.value = time : ''
    // PubSub.publish('currentPlayTime', current.value)
    if (props.mode === 'vod') {
      emits('timeupdate', time)
    }
  }
  // 播放
  player.onPlayState = state => {
    play.value = state
    // PubSub.publish('syncVideo', +play.value)
  }
  // 监听播放完成
  player.onPlayFinish = _ => {
    // 播放完毕
    play.value = false;
    // 如果开启循环播放
    if (loop.value) {
      _register_emits('replay');
    }
  }

  // 监听全局eventBug，目前只限于websocket模式，作用于遥控
  if (props.mode === 'websocket') {
    // 监听遥控
    eventBus.on('startControl', data => {
      emits('startControl', data)
    })
    eventBus.on('stopControl', data => {
      emits('stopControl', data)
    })
  }
}

/**
 * @description 全部功能集合
 * @param {String} type: 功能类型
 * @param {String} value: 要设置的值
 */
let handle_click = (type, value) => {
  let cb = (type, value) => {
    switch (type) {
      case 'play':
        // 播放/暂停播放器
        _play()
        break
      case 'definition':
        // 切换清晰度
        _handleChangeDefinition(value)
        break
      case 'muted':
        // 静音
        _handleChangeMutedChannel(value)
        break
      case 'loop':
      case 'debounce':
      case 'optimization':
        localStorage.setItem(type, value)
        break
      case 'fullscreen':
        // 全屏
        _handleRequestFullscreen()
        break
      case 'flip':
        // console.log(this.flip)
        break
        // 勾选通道
      case 'channel':
        // 改变选择的通道
        _handleChangeChoiceChannel(value)
        break
        // ocr 识别
      case 'ocr':
        // 触发ocr弹窗
        _handleShowOcrModel(value)
        // 获取当前ocr窗口ID
        break
        // 窗口最大化
      case 'maximize':
        // 取消掉其他的视频的全屏
        _handleCancelAllMaximization(value)
        // 判断是否画中画模式，画中画模式下，不支持最大化
        if (isPipMode.value && resource_list.value.length === 2) {
          _handleClickPip(value)
        } else {
          // 最大化
          _handlerMaximization(value)
        }
        break
        // 放映模式，目前支持电影模式和画中画模式
      case 'screening':
        if (value === 'movie') {
          // 切换为电影模式
          _handleChangeScreeningToMovie()
        } else if (value === 'pip') {
          // 切换为画中画模式
          _handleChangeScreeningToPip()
        } else if (value === 'multiSplitScreen') {
          // 切换为多分屏模式
          _handleChangeScreeningToMultiSplit()
        }
        break
        // 位置变化
      case 'switch':
        let _m = resource_list.value.length
        // 判断是否全屏了，如果全屏不处理
        if (value.target.classList.contains('maximize')) {
          return
        }
        // 处理画中画
        let source = document.querySelector(`#${playId.value} #player_item_${_m}`)
        _m === 2 && value.target.id === 'player_item_2' && (source = document.querySelector(`#${playId.value} #player_item_1`))
        // 切换位置
        _handleSwitchVideo(value.target, source)
        break
      default:
        throw new Error('Can not find！')
    }
  }
  common.throttle(cb, 10, type, value)
}

// 重新渲染播放器
let _replyRenderPlayer = async (delay = 0) => {
  // 销毁
  await _dispose()
  await new Promise(resolve => setTimeout(resolve, delay))
  // 重新初始化
  await __init()
}

// 设置播放器全局唯一ID
let _setPlayId = _ => {
  playId.value = `player_list_${Date.now()}-${Math.random().toString(36).substring(2)}`
}

// 设置默认声音
let _handleDefaultVoice = _ => {
  if (video_player.value.length) {
    // 寻找默认播放的通道配置，找不到就去找老师，老师找不到则找第一路
    let channel_ = []
    channel_ = video_player.value.filter(item => voiceChannel.value.has(item.sceneName))
    // channel_ ||= [video_player.value[video_player.value.length - 1]]
    !channel_.length && (channel_ = [video_player.value.find(item => item.sceneName === '老师') || video_player.value.find(item => item.sceneName === '老师全景') || video_player.value[video_player.value.length - 1]])
    // 如果通道存在，开启通道声音
    channel_.map(c => handle_click('muted', c))
  }
}

// 设置水印
let _handleWaterMarker = _ => {
  // 判断水印开关是否开启，添加水印
  if (props.isEnableWaterMarker) {
    // 生成水印ID
    waterMarkerId.value = `player_wrap_${new Date().getTime()}`
    // 水印ID，这里要唯一，可能一个页面俩个播放器，所以这里要判断处理
    waterMarker.value = new WaterMarker(waterMarkerId.value)
  }
}

/**
 * @description 播放/暂定
 */
let _play = () => {
  play.value = !play.value
  // 播放
  _register_emits(play.value ? 'play' : 'pause')
}

/**
 * @description 获取播放进度
 */
let _get_duration = async () => {
  video_player.value.map(item => {
    let duration_ = item.mediaInfo()?.duration / 1000;
    if (!duration.value || Number(duration_) > duration.value) {
      duration.value = duration_;
    }
  });
  if (!duration.value) {
    await new Promise(resolve => setTimeout(resolve, 500))
    _get_duration()
  }
}

// 切换清晰度
let _handleChangeDefinition = value => {
  definition.value = value
  fileList.value = props.playStreams[definition.value].source || []
  // channel_list.value = new Set([])
  // 重新构建
  _replyRenderPlayer(20)
}

// 切换静音通道
let _handleChangeMutedChannel = value => {
  voice.value.has(value.sceneName) ? voice.value.delete(value.sceneName) : voice.value.add(value.sceneName)
  voice.value = new Set(voice.value)
  // 处理静音
  _register_emits('muted')
}

// 全屏
let _handleRequestFullscreen = () => {
  fullscreen.value.handleChange(document.getElementById('video_player'));
  setTimeout(_ => {
    // 重新计算距离
    props.mode === 'vod' && slide.value._getDistance()
  }, 40)
}

// 切换预览的通道
let _handleChangeChoiceChannel = value => {
  channel_list.value.has(value) ? channel_list.value.delete(value) : channel_list.value.add(value)
  channel_list.value = new Set(channel_list.value)
  // 退出电影模式
  _handleCancelMovieMode()
  // 重新构建
  _replyRenderPlayer(20)
}

// 退出电影模式
let _handleCancelMovieMode = _ => {
  channel_list.value.size > 1 && isMovieMode.value && (isMovieMode.value = false)
}

// ocr识别
let _handleShowOcrModel = value => {
  let player = video_player.value.find(key => key.id === value.id)
  if (props.mode !== 'vod') {
    // 取消掉其他的视频的全屏
    _handleCancelAllMaximization({ target: '' })
    // 获取点击的包裹器
    let playerItem = _getPlayerItemWrap(value.id)
    if (playerItem && !playerItem.classList.contains('maximize')) {
      // 全屏
      handle_click('maximize', { target: playerItem })
    }
  }
  // 全屏
  // handle_click('maximize', player)
  if ('startViewTransition' in document) {
    let transition = document.startViewTransition(() => {
      show_ocr.value = true
    })
    transition.ready.then(() => {
      let dialog = document.querySelector('#ocrDialog')
      // dialog.style.animation = 'fadeBottomFixed 0.2s 0s forwards linear'
      dialog.animate(
          [
            {
              top: '60%',
              opacity: 0.5
            },
            {
              top: '50%',
              opacity: 1
            }
          ],
          {
            duration: 200,
            easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
            fill: 'forwards' // 动画结束后保持最后一帧状态
          }
      )
    })
  } else {
    // 不支持 startViewTransition 的浏览器的备用方案
    show_ocr.value = true
  }
  // transition.ready.then(() => {
  // })
  setTimeout(_ => {
    ocr_origin.value = {
      item: _getVideoDom(player),
      id: _getVideoDom(player)?.id
    }
  }, 100)
}

// 隐藏OCR识别窗口
let cancelOcrModel = _ => {
  show_ocr.value = false
  // 取消掉其他的视频的全屏
  // _handleCancelAllMaximization({ target: '' })
}

/**
 * @description 更新播放器样式
 * @param {Object} player: 播放器对象
 */
let _updateVideoStyle = player => {
  if (!player.player) {
    return
  }
  try {
    if (props.mode === 'live') {
      player.player.children_[0].id = `video_${player.id}`
      player.player.children_[0].classList = ['video__']
    } else if (props.mode === 'vod') {
      player.player.id = `video_${player.id}`
      player.player.classList = ['video__']
    } else if (props.mode === 'websocket') {
      player.player.player.id = `video_${player.id}`
      player.player.player.classList = ['video__']
    } else if (props.mode === 'webrtc') {

    }
  } catch (err) {

  }
}

/**
 * @description 点击画中画画面
 */
let _handleClickPip = value => {
  let two_split_screen = document.querySelector('.two_split_screen')
  let [mainItem, subItem] = two_split_screen.children;
  let { target } = value;

  if ([mainItem, subItem].includes(target)) {
    let otherChild = target === mainItem ? subItem : mainItem;
    let isSub = target.classList.contains('pip_sub');

    target.classList.toggle('pip_sub', !isSub);
    target.classList.toggle('pip_main', isSub);
    otherChild.classList.toggle('pip_sub', isSub);
    otherChild.classList.toggle('pip_main', !isSub);
  }
}

// 窗口最大化
let _handlerMaximization = value => {
  let isFull = value.target.classList.contains('maximize')
  if (isFull) {
    // 取消全屏
    value.target.classList.remove('maximize')
    value.target.setAttribute('draggable', true)
  } else {
    // 全屏
    value.target.classList.add('maximize')
    value.target.removeAttribute('draggable')
  }
  // 如果没有全屏，强制全屏
  // if (!isFull && !fullscreen_status.value) {
  //   handle_click('fullscreen')
  // }
}

// 取消所有的全屏样式
let _handleCancelAllMaximization = value => {
  document.querySelectorAll('.maximize').forEach(item => item !== value.target ? item.classList.remove('maximize') : '')
}

// 切换画面为电影模式
let _handleChangeScreeningToMovie = () => {
  isMovieMode.value = !isMovieMode.value
  if (isMovieMode.value) {
    // 抽取PGM通道
    let channel = isExists(resource_list.value, 'PGM')
    channel_list.value = new Set([channel.id])
  } else {
    channel_list.value = new Set([])
  }
  // 重新构建
  _replyRenderPlayer(20)
}

// 切换画面为画中画模式
let _handleChangeScreeningToPip = () => {
  // 增加画中画样式
  isPipMode.value = !isPipMode.value
}

// 切换为多分屏莫斯
let _handleChangeScreeningToMultiSplit = () => {
  if (isPipMode.value) {
    isPipMode.value = false
    if (resource_list.value.length === 2) {
      return
    }
  }
  if (isMovieMode.value) {
    isMovieMode.value = false
  }
  channel_list.value = new Set([])
  // 重新构建
  _replyRenderPlayer(20)
}

// 变化位置
let _handleSwitchVideo = (target, source) => {
  if (target === source) {
    return
  }
  source.insertBefore(target.firstChild, source.firstChild);
  target.appendChild(source.childNodes[1]);
  let targetTitle = target.getAttribute('title');
  let sourceTitle = source.getAttribute('title');
  target.setAttribute('title', sourceTitle);
  source.setAttribute('title', targetTitle);
}

/**
 * @description 获取视频元素包裹器
 * @param {Number}: video id
 */
let _getPlayerItemWrap = (id) => {
  if (props.mode === 'live') {
    return document.getElementById(`video_${id}`)?.parentElement.parentElement
  }
  return document.getElementById(`video_${id}`)?.parentElement
}

/**
 * @description 获取视频dom
 * @param {Object} player: 播放器对象
 */
let _getVideoDom = player => {
  switch (props.mode) {
    case 'vod':
      return player.player
    case 'live':
      return player.player.children_[0]
    case 'websocket':
      return player.player.player
    case 'webrtc':
      return player.player
  }
}

/**
 * @description 重新初始化
 */
let _dispose = () => {
  // 销毁dom监听的事件
  use_player_emit?.destroy()
  // 销毁观察模式里所有的事件
  eventBus.destroy()
  // 销毁播放器
  _register_emits('destroy')
  // 销毁水印
  if (waterMarkerId.value) {
    waterMarker.value.destroy();
    waterMarkerId.value = '';
  }
  is_init.value = false;
  video_player.value = [];
  voice.value = new Set([]);
}

// 重新初始化
let _reset = () => {
  _dispose();
  resource_list.value = [];
  channel_list.value = new Set([]);
  flip.value = false;
  rate.value = '1.0';
  current.value = 0;
  duration.value = 0;
  volume.value = 70;
  play.value = false;
  // if (props.mode === 'websocket') {
  //   // 监听遥控
  //   eventBus.off('startControl')
  //   eventBus.off('stopControl')
  // }
}

/**
 * @description 监听键盘事件
 * @param {Object} event: event事件
 */
let _listen_keyup_emits = (event) => {
  if (event.key === 'Escape' || event.key === 'F11') {
    setTimeout(_ => {
      // 重新计算距离
      props.mode === 'vod' && slide.value._getDistance()
    }, 40)
  }
}

/**
 * @description 监听全屏状态
 */
let _listener_fullscreen_status = () => {
  common.throttle(_ => {
    let fullScreen = parent.document.webkitIsFullScreen || parent.document.fullscreen || parent.document.mozFullScreen || parent.document.msFullscreenElement;
    // 重新计算距离
    props.mode === 'vod' && slide.value._getDistance()
    // 重新生成水印
    if (waterMarkerId.value) {
      waterMarker.value.destroy()
      // 生成水印ID
      waterMarkerId.value = `player_wrap_${new Date().getTime()}`
      // 水印ID，这里要唯一，可能一个页面俩个播放器，所以这里要判断处理
      waterMarker.value = new WaterMarker(waterMarkerId.value)
    }
  }, 200)
}

/**
 * @description 统一通道名称
 * @param {String} name: 通道名称
 * @param {Number} index: 索引
 */
let _filterChannelName = (name, index) => {
  !name ? name = `通道${index + 1}` : ''
  return name.replace('教师', '老师').toUpperCase()
}

// 判断是否允许自动播放声音
let _isAllowPlayByVoice = async _ => {
  return new Promise((resolve, reject) => {
    let audio = new Audio();
    audio.src = AudioResource;
    audio.volume = 0.01
    audio.play()
        .then(() => {
          resolve()
          isShowVolumeTip.value = false
        })
        .catch(() => {
          reject()
          isShowVolumeTip.value = true
        });
  })
}

// 手动开启声音
let handleOpenVoiceByClick = async _ => {
  isShowVolumeTip.value = false
  // 开启声音
  _register_emits('volume', 70)
}

// 监听 fileList 变化
watch(() => props.playStreams, (value) => {
  if (typeDetection(value === 'object') && Object.keys(value).length) {
    _reset();
    // 注册清晰度
    definition_list.value = Object.keys(value)
    // 默认选择第一个有资源列表的清晰度
    for (let key of definition_list.value) {
      let source = value[key].source
      if (source && source.length) {
        // 选择清晰度
        handle_click('definition', key)
        break
      }
    }
  }
}, {
  deep: true,
  immediate: true
})

// 监听channel_size变化
watch(() => channel_list.value, (value) => {
  emits('updateChannel', value.size)
})

// 监听音量变化
watch(() => volume.value, (value) => {
  (value && isShowVolumeTip.value) && (isShowVolumeTip.value = false)
})

defineExpose({
  _register_emits,
  current,
  duration
})
</script>
<style lang="less" scoped>
.video_player_pc {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000;
  position: relative;
  overflow: hidden;

  .player_wrap {
    width: 100%;
    height: auto;
    //aspect-ratio: 16/9;

    .loading {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;

      img {
        width: 100%;
        aspect-ratio: 16 / 9;
      }
    }

    .player_list {
      width: 100%;
      height: 100%;

      .player_item {
        width: 100%;
        height: 100%;
        position: relative;
        aspect-ratio: 16 / 9 !important;
        background-image: url('@/assets/img/shineon-load.gif');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        //cursor: grab;
        cursor: zoom-in;

        &:before {
          content: '';
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          box-shadow: 0 0 0px 0.5px rgba(0, 0, 0, 1) inset;
        }

        #video_item_2 {
          width: 100px;
          height: 50px;
        }
      }

      .flip {
        transform: rotateY(180deg);
      }
    }
  }

  footer {
    width: 100%;
    height: 58px;
    position: absolute;
    left: 0;
    bottom: -0.5px;
    background-color: rgba(0, 0, 0, 0.7);
    //z-index: 10;
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px 0;

    .toolbar {
      width: 100%;
      height: 30px;
      margin-top: -2px;

      .switch_active {
        background-color: #04a1c7;
      }

      .playing {
        cursor: pointer;
        width: 30px;
        height: 100%;
        margin-left: 5px;

        i {
          font-size: 20px;
          color: #fff;
          font-weight: bold;
          transition: all .1s;
        }
      }

      .time {
        font-size: 15px;
        color: #eee;
        margin-left: 5px;
        font-weight: bold;
      }

      .rate,
      .definition {
        width: 57px;
        height: 27px;
        margin: 0 3px;
        cursor: pointer;
        border-radius: 3px;
        background-color: #232323;
        box-shadow: 0 5px 10px 0 #000;
        margin-right: 10px;
        position: relative;

        span {
          font-size: 12px;
          color: #fff;
          letter-spacing: 4px;
          -webkit-text-stroke: 0px 0px #eee;
          padding-left: 4px;
          filter: brightness(1.25);
        }
      }

      .rate {
        position: relative;

        span {
          letter-spacing: 2px;
          font-weight: bold;
        }
      }


      .definition.mode {
        width: 85px;
      }

      .setting {
        width: 30px;
        height: 30px;
        margin: 0 4px;
        cursor: pointer;

        i {
          font-size: 21px;
          color: #fff;
          font-weight: bold;
        }
      }

      .voice {
        width: 150px;
        height: 100%;
        cursor: pointer;

        .voice_btn {
          width: 30px;
          height: 100%;
          margin-right: 10px;

          img {
            width: 22px;
          }
        }

        .voice_slide {
          width: 100px;
        }
      }

      .channel {
        width: 30px;
        height: 30px;
        margin: 0 5px;
        margin-right: 6px;
        cursor: pointer;

        i {
          font-size: 21px;
          color: #fff;
          font-weight: bold;
        }

        .icon-liebiaofenlei {

        }

        .icon-tuwenliebiao {

        }

        .icon-yinpinliebiao {
          font-size: 20px;
          margin-top: 2px;
          margin-left: -2px;
        }
      }

      .full {
        width: 30px;
        height: 30px;
        margin: 0 5px;
        margin-right: 10px;
        cursor: pointer;

        i {
          font-size: 22px;
          color: #fff;
          font-weight: bold;
        }

        .icon-quanping1 {
          font-size: 26px;
        }

        .icon-quxiaoquanping {

        }
      }
    }
  }
}

.select_list {
  .item {
    width: 100%;
    height: 30px;
    background-color: #333;
    position: relative;
    cursor: pointer;
    user-select: none;
    margin-bottom: 6px;

    span {
      font-size: 12px;
      color: #cccccc;
      padding-left: 18px;
      padding-right: 10px;
      letter-spacing: 1px;
      margin-left: 8px;
    }

    &:before {
      content: '';
      position: absolute;
      left: 10px;
      top: 50%;
      width: 6px;
      height: 6px;
      transform: translateY(-50%);
      border-radius: 50%;
      background-color: #fff;
    }

    &[disabled] {
      pointer-events: none;
      opacity: 0.7;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .active {
    background-color: var(--common-color);
    box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.4);

    span {
      color: #fff;
      filter: brightness(1.25);
    }

    &:before {
      background-color: greenyellow;
      filter: brightness(1.25);
    }
  }

  .setting_item {
    span {
      color: #fff !important;
      filter: brightness(1.25);
      padding: 0 10px !important;
    }

    &:before {
      display: none;
    }
  }
}


.voice_list {
  width: 120px;
  .item {
    img {
      position: absolute;
      left: 10px;
      z-index: 2;
      width: 18px;
    }
    span {
      padding-left: 24px;
    }
  }
}

.ocr_list,
.channel_list,
.mode_list {
  width: 120px;
  .item {
    i {
      position: absolute;
      left: 10px;
      z-index: 2;
      font-size: 17px;
      color: #eee;
    }
    .icon-xianshikejian,
    .icon-yincangbukejian,
    .icon-- {
      font-size: 20px;
    }
    .icon-btn_trophy_defaultbeifen {
      font-size: 16.5px;
      margin-left: 2px;
    }
    .icon-erjicaidan--duopingmu {
      font-size: 17.5px;
      margin-left: 2px;
    }

    &:before {
      display: none;
    }
    span {
      padding-left: 24px;
    }
  }
}
</style>
