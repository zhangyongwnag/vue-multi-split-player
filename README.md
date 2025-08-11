# vue-multi-split-player

[![npm version](https://img.shields.io/npm/v/vue-multi-split-player.svg)](https://www.npmjs.com/package/vue-multi-split-player)
[![vue version](https://img.shields.io/badge/vue-2.7.16-green.svg)](https://vuejs.org/)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/zhangyongwnag/vue-multi-split-player)
![npm download](https://img.shields.io/npm/dm/vue-multi-split-player)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/zhangyongwnag/vue-multi-split-player)

[![NPM](https://nodei.co/npm/vue-multi-split-player.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-multi-split-player/)
[![NPM](https://nodei.co/npm-dl/vue-multi-split-player.png?months=100&height=10)](https://nodei.co/npm/vue-multi-split-player/)


#### 一款垃圾自适应多分屏播放器，支持主流直播、点播。
> [https://zhangyongwnag.github.io/vue-multi-split-player/example/dist/index.html](https://zhangyongwnag.github.io/vue-multi-split-player/example/dist/index.html)


## Features
- - [x] 基础多分屏播放，最高5分屏
- - [x] 支持直播websocket、webrtc、m3u8、flv，点播m3u8、mp4
- - [ ] 支持自定义弹幕
- - [x] 支持OCR
- - [x] 单机局部放大，双击全屏
- - [x] 支持添加自定义水印，并且防篡改
- - [x] 提供多分屏、画中画和电影模式。
- - [x] 支持多清晰度切换
- - [x] 支持自定义通道选择，自定义声音
- - [x] 兼容浏览器播放声音策略(媒体参与度)
- - [x] 支持mark点

## Installation

```bash
# Using pnpm
pnpm install vue-multi-split-player -S

# Using yarn
yarn add vue-multi-split-player

# Using npm
npm install vue-multi-split-player --save
```

## Usage

### Global Registration

```javascript
// main.js
import Vue from 'vue';
import * as VueMultiSplitPlayer from "vue-multi-split-player";
import 'vue-multi-split-player/dist/style.css'; // Import styles

Vue.use(VueMultiSplitPlayer);
```

### Local Registration for Vue2.7

```javascript
// In your component
import { VueMultiSplitPlayer } from 'vue-multi-split-player';
import 'vue-multi-split-player/dist/style.css'; // Import styles

// for vue2.6-
export default {
  components: {
    VueMultiSplitPlayer
  }
  // ...
}
```

### Component Usage

```vue
<template>
  <div class="container">
    <VueMultiSplitPlayer
      mode="vod"
      :playStreams="playStreams"
      :noteList="[]"
      :muted="false"
      :autoplay="true"
      :classroomType="" 
      :isEnableDanmu="false"
      :isEnableControl="false"
      :isEnableOcr="false"
      :isEnableToolbar="true"
      :isEnableWaterMarker="false"
      :width="1920"
      :height="1080"
    />
  </div>
</template>

<script setup>
import { reactive } from "vue"

let playStreams = reactive({
  '高清': {
    source: [
      {
        url: 'http://example.com/path/to/high-quality.mp4',
        name: '高清版本'
      }
    ]
  },
  '标清': {
    source: [
      {
        url: 'http://example.com/path/to/standard-quality.mp4',
        name: '标清版本'
      }
    ]
  },
})
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| mode | String | 'live' | 播放类型: live：直播，vod：点播，websocket or webrtc |
| playStreams | Object | {} | 要播放的资源，例如：{ '高清': { source: { [ name: '', url: '', id: '' ] } } } |
| noteList | Array | [] | mark点，例如：[{ startSecond: 0, imgUrl: '', content: '' }] |
| muted | Boolean | false | 是否静音播放，如果静音播放，浏览器播放策略不会生效(媒体参与度) |
| autoplay | Boolean | true | 是否自动播放 |
| classroomType | Number\|String | '' | 教室类型 |
| isEnableDanmu | Boolean | false | 是否启用弹幕 |
| width | Number | 0 | 播放器宽度，如果不填，则默认取宽度100% |
| height | Number | 0 | 播放器高度，如果不填，则根据宽度16/9 (aspect-ratio: 16 / 9) |
| isEnableControl | Boolean | false | 是否启用遥控，只在mode为websocket时生效 |
| isEnableOcr | Boolean | false | 是否启用OCR |
| isEnableToolbar | Boolean | true | 是否启用底部菜单栏 |
| isEnableWaterMarker | Boolean | false | 是否启用水印 |

## Methods

您可以使用 `ref` 访问播放器实例并调用以下方法：

- `current()`: 获取当前播放时间（秒）
- `duration()`: 获取视频总时长（秒）
- `_register_emits(emit, value)`: 注册播放器事件回调
  - **参数**: `emit` - 包含事件类型和回调函数的对象
  - **参数**: `value` - 要设置的值
  - **支持的事件类型**:
    - `play`: 播放视频
    - `pause`: 暂停视频
    - `replay`: 重新播放视频（从开始位置）
    - `destroy`: 销毁播放器实例
    - `muted`: 设置静音状态
    - `rate`: 设置播放速度
    - `current`: 设置播放进度
    - `volume`: 设置音量0-100

## Events

- `ready`: 播放器准备就绪
- `timeupdate`: 当前播放时间更新
- `startControl`: 开始远程控制
- `stopControl`: 停止远程控制
- `updateChannel`: 通道更新

## License

MIT © 2025 yw.z