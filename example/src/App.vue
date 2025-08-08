<template>
  <div class="container">
    <VueMultiSplitPlayer
        mode="vod"
        :playStreams="playStreams"
        :noteList="[]"
        :muted="false"
        :autoplay="true"
        :isEnableDanmu="false"
        :isEnableControl="false"
        :isEnableOcr="false"
        :isEnableToolbar="true"
        :width="800"
        :height="600"
    />
  </div>
</template>

<script setup>
import {reactive} from "vue";

let playStreams = {
  '高清': {
    source: [
      {
        url: 'http://10.0.129.5:81/vod/NAS1//upload/resource/2025/03/17/653e0db2246b459d8c10bb85792d7058/AI赋能督导-本机.mp4',
        name: '老师.mp4'
      }
    ]
  },
  '标清': {
    source: [
      {
        url: 'http://10.0.129.5:81/vod/NAS1//upload/resource/2025/03/17/653e0db2246b459d8c10bb85792d7058/AI赋能督导-本机.mp4',
        name: '老师.mp4'
      }
    ]
  },
  '超清': {
    source: [
      {
        url: 'http://10.0.129.5:81/vod/NAS1//upload/resource/2025/03/17/653e0db2246b459d8c10bb85792d7058/AI赋能督导-本机.mp4',
        name: '老师.mp4'
      }
    ]
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
