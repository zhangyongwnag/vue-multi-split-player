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
        :height="450"
        :isEnableWaterMarker="true"
        :waterMarkerContent="waterMarkerContent"
    />
  </div>
</template>


<script setup>
import {ref, reactive} from "vue";

let waterMarkerContent = ref(`<span style="font-size: 16px;">提示信息</span> <br> 版权归vue-multi-split-player所有`)
let playStreams = {
  '高清': {
    source: [
      {
        url: 'http://vjs.zencdn.net/v/oceans.mp4',
        name: '海洋',
        id: 1
      },
      {
        url: 'https://www.w3schools.com/html/movie.mp4',
        name: '大灰熊',
        id: 2
      },
      {
        url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
        name: '新闻1',
        id: 3
      },
      {
        url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4',
        name: '新闻2',
        id: 4
      },
    ]
  },
  '标清': {
    source: [
      {
        url: 'https://www.w3schools.com/html/movie.mp4',
        name: '大灰熊',
        id: 1
      },
      {
        url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4',
        name: '新闻2',
        id: 2
      },
      {
        url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
        name: '新闻1',
        id: 3
      },
      {
        url: 'http://vjs.zencdn.net/v/oceans.mp4',
        name: '海洋',
        id: 4
      },
    ]
  },
  '超清': {
    source: [
      {
        url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209104902N3v5Vpxuvb.mp4',
        name: '新闻2',
        id: 1
      },
      {
        url: 'http://vjs.zencdn.net/v/oceans.mp4',
        name: '海洋',
        id: 2
      },
      {
        url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/09/20200209105011F0zPoYzHry.mp4',
        name: '新闻1',
        id: 3
      },
      {
        url: 'https://www.w3schools.com/html/movie.mp4',
        name: '大灰熊',
        id: 4
      },
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
