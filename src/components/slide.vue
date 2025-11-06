<template>
  <div class="slide"
       id="videoPlayer"
       @pointerdown.prevent="handleClick($event)"
       @mouseenter="handleMouseEnter"
       @pointermove="onDraggingThumbnail"
       @mouseleave="handleMouseLeave">
    <div
        class="custom_cursor"
        id="box"
        @pointerdown="onButtonDown"
        :style="slideStyle"
        tabindex="0"
      ></div>
    <div id="track_line" :style="lineStyle"></div>
    <div id="track"></div>
    <div v-if="show_block" id="indicator">
      <i class="el-icon-caret-bottom"></i>
      <i class="el-icon-caret-top"></i>
    </div>
    <div v-if="show_block" class="thumbnail" id="thumbnail">
      <div class="img_wrap">
        <img :src="thumbnail.url" alt="">
      </div>
      <div class="text">{{ note_item.content }}</div>
      <div class="time">{{ common.filterTime(+ thumbnail.time * 1000, 1) }}</div>
    </div>
    <!--知识点列表-->
    <div v-for="(item, index) in mark"
         :style="{ left: getNotePosition(item.startSecond) + 'px' }"
         @click="handle_click_note(item, index)"
         class="noteItem">
      <div class="note_detail">
        <div class="note_wrap">
          <div class="img_wrap">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="note_content">{{ item.content }}</div>
          <div class="icon _flex_center">
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
        <div class="note_time _flex_center">{{ common.filterTime(item.startSecond, 1) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as common from '@/utils/common'

/**
 * @description 自定义 slide
 */
export default {
  model: {
    prop: 'current',
    event: 'change'
  },
  props: {
    // 播放进度
    current: {
      type: Number,
      default: 0
    },
    // 播放时长
    duration: {
      type: Number,
      default: 0
    },
    // 当前的最后分屏路径URL
    httpPath: {
      type: String,
      default: ''
    },
    // mark点列表
    mark: {
      type: Array,
      default: _ => []
    }
  },
  data() {
    return {
      common,
      disabled: false,
      startX: 0,
      startPosition: 0,
      distance: 0, // 可滑行的距离
      is_show_pic: true, // 是否展示缩略图
      // 缩略图信息
      thumbnail: {
        url: '', // 图片地址
        time: '' // 时间
      },
      show_block: false, // 是否展示移动块
      loading: false,
      note_item: {}, // 当前查看的知识点
      is_draging: false, // 是否拖动过程中
    }
  },
  computed: {
    lineStyle() {
      if (this.distance && this.current && this.duration) {
        return {
          width: this.current * (this.distance / this.duration) + 'px'
        }
      }
    },
    slideStyle() {
      if (this.distance && this.current && this.duration) {
        return {
          left: this.current * (this.distance / this.duration) + 'px'
        }
      }
    }
  },
  mounted() {
    // 获取滑行区域距离
    this._getDistance()
  },
  methods: {
    /**
     * @description 点击line修改时间
     */
    handleClick(event) {
      if (this.is_draging) {
        return
      }
      if (!event.target.id) {
        return
      }
      let sliderOffsetLeft = event.target.getBoundingClientRect().left;
      let newPosition = (event.pageX - sliderOffsetLeft) * (this.duration / this.distance)

      this.updateCurrentTime(newPosition)

      // 延迟50毫秒执行，因为上面的updateCurrentTime方法防抖，防抖50毫秒
      setTimeout(_ => {
        this.onButtonDown(event)
      }, 50)
    },
    /**
     * @description 鼠标/触摸板开始
     */
    onButtonDown(event) {
      if (this.disabled) {
        return
      }
      event.preventDefault()
      // 拖拽开始
      this.onDragStart(event)
      window.addEventListener('pointermove', this.onDragging)
      window.addEventListener('pointerup', this.onDragEnd)
      window.addEventListener('contextmenu', this.onDragEnd)
    },
    /**
     * @description 拖拽开始
     */
    onDragStart(event) {
      this.is_draging = true
      if (event.type === 'touchstart') {
        event.pageY = event.touches[0].pageY;
        event.pageX = event.touches[0].pageX;
      }
      this.startPosition = parseFloat(this.current)
      this.startX = event.pageX
    },
    /**
     * @description 拖拽过程中
     */
    onDragging(event) {
      if (!this.is_draging) {
        return
      }
      if (event.type === 'touchmove') {
        event.pageY = event.touches[0].pageY;
        event.pageX = event.touches[0].pageX;
      }
      let diff = 0
      diff = (event.pageX - this.startX) * (this.duration / this.distance)
      let newPosition = this.startPosition + diff
      this.updateCurrentTime(newPosition)
    },
    /**
     * @description 拖拽结束
     */
    onDragEnd() {
      if (!this.is_draging) {
        return
      }
      window.removeEventListener('pointermove', this.onDragging)
      window.removeEventListener('pointerup', this.onDragEnd)
      window.removeEventListener('contextmenu', this.onDragEnd)
      setTimeout(_ => {
        this.is_draging = false
      }, 50)
    },
    updateCurrentTime(value) {
      if (value < 0) {
        value = 0
      }
      if (value >= this.duration) {
        value = this.duration
      }
      // 在浏览器空闲时，进行更新
      // if (window.requestIdleCallback) {
      //   window.requestIdleCallback(_ => this.$emit('update', value))
      // } else {
      //   common.debounce(_ => this.$emit('update', value), 0)
      // }
      this.$emit('update', value)
    },
    /**
     * @description 鼠标移入，显示移动块
     */
    handleMouseEnter(event) {
      return
      this.show_block = true
      event.preventDefault()
      this.$nextTick(_ => {
        // 拖拽开始
        this.onDraggingThumbnail(event)
      })
    },
    /**
     * @description 鼠标移动，修改移动块
     */
    onDraggingThumbnail(event) {
      if (!this.show_block) {
        return
      }
      // player wrap
      let videoPlayer = document.getElementById('videoPlayer')
      // 获取移动块
      let slide = document.getElementById('indicator')
      // 获取缩略图DOM
      let frame = document.getElementById('thumbnail')
      let offsetX = event.clientX - this._getLeft(videoPlayer)
      slide.style.transform = `translateX(${offsetX}px)`
      frame.style.transform = `translateX(${offsetX - (180 / 2) + 4}px)`
      // 计算时间
      let current = offsetX * (this.duration / this.distance)
      this.$set(this.thumbnail, 'time', current.toFixed(0))
      if (this.mark.length) {
        // 获取当前观看的知识点
        this._getNoteItem(current)
      }
      // 如果还没有加载完，就继续加载，反之不做处理
      if (this.loading) {
        return
      }
      this.loading = true
      // 获取缩略图
      // common.getVideoFrameImage(this.httpPath, current.toFixed(2), 180, 101.5)
      //   .then(res => {
      //     this.loading = false
      //     this.$set(this.thumbnail, 'url', res)
      //   })
    },
    /**
     * @description 鼠标移出，隐藏移动块
     */
    handleMouseLeave() {
      this.show_block = false
    },
    /**
     * @description 获取当前所在区域的知识点
     * @param {Number} time: 当前所在时间点
     */
    _getNoteItem(time) {
      let index_ = this.mark.findIndex(item => time < item.startSecond)
      this.mark[index_ - 1] ? this.note_item = this.mark[index_ - 1] : this.note_item = {}
    },
    /**
     * @description 点击知识点
     * @param {Object} item: 当前选中项
     * @param {Number} index: 选中项下标index
     */
    handle_click_note(item, index) {
      this.$emit('update', item.startSecond)
    },
    // 获取知识点的位置信息
    getNotePosition(time) {
      if (this.distance && this.duration) {
        return time * (this.distance / this.duration)
      }
    },
    /**
     * @description 获取元素距离页面左边的间距
     * @param {Object} el: 要获取的元素
     */
    _getLeft(el) {
      let offset = el.offsetLeft
      if (el.offsetParent !== null) {
        offset += this._getLeft(el.offsetParent)
      }
      return offset
    },
    /**
     * @description 获取滑行区域距离
     */
    _getDistance() {
      this.$nextTick(_ => {
        this.distance = document.getElementById('track').offsetWidth
      })
    }
  }
}
</script>

<style lang="less" scoped>
.slide {
  width: calc(100% - 15px);
  margin-left: 7.5px;
  height: 30px;
  position: relative;
  filter: brightness(1.17);
  user-select: none;
  margin-top: -13px;
  z-index: 6;
  cursor: pointer;
  margin-bottom: 6px;
  touch-action: none;
  #track {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 4.5px;
    background-color: #fff;
    transform: translateY(-50%);
    border-radius: 3px;
    z-index: 1;
  }
  #track_line {
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 4.5px;
    background-color: var(--common-color, #3a7afe);
    transform: translateY(-50%);
    border-radius: 3px 0 0 3px;
    z-index: 2;
    will-change: width;
  }
  #box {
    position: absolute;
    left: 0;
    top: 49%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: transparent;
    opacity: 1;
    transform: translate(-50%, -50%);
    z-index: 3;
    filter: brightness(1.05);
    will-change: left;
    touch-action: none;

    &:hover {
      cursor: grab;
    }

    &:active {
      cursor: grabbing;
    }

    &:before {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #fff;
      transition: all 0.3s;
      transform: translate(-50%, -50%);
      z-index: 2;
    }

    &:after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: var(--common-color, #3a7afe);
      opacity: 1;
      transition: all 0.3s;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    &:active,
    &:focus,
    &:hover {
      &:after {
        width: 22px;
        height: 22px;
        opacity: 0.5;
      }
    }
  }
  #area {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    cursor: pointer;
  }

  #area:hover + #box {
    &:before {
      width: 26px;
      height: 26px;
    }
  }

  #indicator {
    width: 10px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    i {
      font-size: 20px;
      color: #fff;
    }
    i:first-of-type {
      position: absolute;
      left: -5px;
      top: -5px;
    }
    i:last-of-type {
      position: absolute;
      left: -6px;
      bottom: -4px;
    }
  }
  .thumbnail {
    background-color: #333333;
    position: absolute;
    left: 0;
    bottom: 40px;
    display: block;
    z-index: 101;
    width: 180PX;
    box-shadow: 0 0 20px 1px #333;
    border-radius: 3px;
    .img_wrap {
      width: 100%;
      height: 101.5PX;
      filter: brightness(0.75);
      border-radius: 3px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      width: 100%;
      font-size: 12px;
      color: #fff;
      line-height: 20px;
      padding: 5px;
      margin-bottom: 15px;
    }
    .time {
      font-size: 13px;
      color: #fff;
      position: absolute;
      left: 50%;
      bottom: 0px;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.6);
      padding: 1px 3px;
      border-radius: 2px;
    }
  }
  .noteItem {
    width: 6px;
    height: 6px;
    position: absolute;
    cursor: pointer;
    filter: brightness(1.25);
    z-index: 2;
    margin-top: 5.5px;
    &:hover {
      .note_detail {
        display: block;
      }
    }
    &:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: indianred;
      box-shadow: 0 0 3px 1px #fff;
      cursor: inherit;
      border-radius: inherit;
    }
    .note_detail {
      display: none;
      width: 220px;
      position: absolute;
      bottom: 5px;
      z-index: 10;
      left: -105px;
      overflow: hidden;
      animation: fade-bottom .3s 0s forwards;

      .note_wrap {
        width: 100%;
        background-color: #4f5460;
        border-radius: 4px;
        padding: 15px;
        position: relative;

        .img_wrap {
          width: 100%;
          height: 110px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .note_content {
          width: 100%;
          font-size: 12px;
          color: #fff;
          margin-top: 10px;
          line-height: 20px;
        }

        .icon {
          width: 30px;
          position: absolute;
          left: 50%;
          bottom: -16px;
          transform: translateX(-50%);

          i {
            font-size: 30px;
            color: #4f5460;
          }
        }
      }

      .note_time {
        width: 100%;
        height: 40px;
        font-size: 12px;
        color: #fff;
        font-weight: bold;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
