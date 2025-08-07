<template>
  <div>
    <slot v-if="type">点击全屏</slot>
    <div class="logo _flex_center" v-else>
      <!--<img class="icon_ _common_shadow" @click="handleChange(null)" src="../../assets/img/logo.png" alt="" :title="value ? il8n.cancelFullscreen : il8n.requestFullscreen">-->
    </div>
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      // 全屏状态
      value: {
        type: Boolean,
        default: false
      },
      // 全屏的类型 0 logo全屏 1 自定义slot全屏
      type: {
        type: Number,
        default: 0
      }
    },
    date() {
      return {
        tip: '', // 提示信息
      }
    },
    methods: {
      // 全屏
      handleFullscreen(el) {
        let main = el || document.body
        if (this.value) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          if (main.requestFullscreen) {
            main.requestFullscreen()
          } else if (main.mozRequestFullScreen) {
            main.mozRequestFullScreen()
          } else if (main.webkitRequestFullScreen) {
            main.webkitRequestFullScreen()
          } else if (main.msRequestFullscreen) {
            main.msRequestFullscreen()
          }
        }
      },
      // change
      handleChange(el) {
        this.handleFullscreen(el)
      }
    },
    mounted() {
      // 监听全屏
      let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
      isFullscreen = !!isFullscreen
      document.addEventListener('fullscreenchange', () => {
        this.$emit('input', !this.value)
        this.$emit('on-change', !this.value)
      })
      document.addEventListener('mozfullscreenchange', () => {
        this.$emit('input', !this.value)
        this.$emit('on-change', !this.value)
      })
      document.addEventListener('webkitfullscreenchange', () => {
        this.$emit('input', !this.value)
        this.$emit('on-change', !this.value)
      })
      document.addEventListener('msfullscreenchange', () => {
        this.$emit('input', !this.value)
        this.$emit('on-change', !this.value)
      })
      this.$emit('input', isFullscreen)
    }
  }
</script>

<style lang="less" scoped>
  .icon_ {
    width: 28px;
    margin-top: 8px;
    cursor: pointer;
  }
</style>
