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
