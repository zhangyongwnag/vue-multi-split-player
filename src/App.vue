<template>
  <div class="container w-[100vw] h-[100vh] _flex_center">
    <VueMultiSplitPlayer
        mode="vod"
        :playStreams="playStreams"
        :noteList="[]"
        :muted="false"
        :autoplay="true"
        :isEnableDanmu="false"
        :isEnableControl="false"
        :isEnableOcr="true"
        :isEnableToolbar="true"
        :width="800"
        :height="450"
        :isEnableWaterMarker="true"
        :waterMarkerContent="waterMarkerContent"
    >
    </VueMultiSplitPlayer>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      waterMarkerContent: `<span style="font-size: 16px">提示信息</span> <br> 版权归vue-multi-split-player所有`,
      playStreams: {
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
      },
    }
  },
  components: {
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
}
</style>
