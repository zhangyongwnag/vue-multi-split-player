<template>
  <div class="danmuku" v-if="isEnableDanmu">
    <vue-danmaku
        v-model="danmus"
        style="position: absolute;left:0; top: 10px; width: 100%; height: 100%; z-index: 2; pointer-events: none"
        ref="danmaku"
        :channels="Math.floor(barrageSetting.area / 100 * barrageSetting.maxChaanel)"
        :speeds="barrageSetting.speed + 20 / 100 * 200"
        isSuspend
        use-slot
        :debounce="20"
        randomChannel
    >
      <template slot="dm" slot-scope="{ index, item }">
              <span class="barrage_text"
                    :style="{ opacity: (100 - danmus[index].opacity) / 100, fontSize: `${danmus[index].size / 50 * 18}px`, color: danmus[index].color }" v-html="danmus[index].content"></span>
      </template>
    </vue-danmaku>
    <div class="barrage _flex_item_center">
      <el-tooltip effect="dark" :content="barrageSwitch ? '关闭弹幕' : '开启弹幕'" placement="top">
        <div class="item common_button_wrap _flex_center" @click="handle_change_barrage_status">
          <i :class="`iconfont icon-${!barrageSwitch ? 'danmuguan' : 'danmukai'}`"></i>
        </div>
      </el-tooltip>
      <el-popover
          placement="top"
          width="300"
          trigger="hover"
          popper-class="barrage_wrap"
      >
        <div class="barrage_item _flex_item_center">
          <span class="title">弹幕区域：</span>
          <el-slider
              style="width: 200px"
              v-model="barrageSetting.area"
              :step="20"
              :min="20"
              :max="100"
              :show-tooltip="false"
              :marks="{20: '1/5', 40: '2/5', 60: '半屏', 80: '4/5', 100: '全屏'}"
              show-stops>
          </el-slider>
        </div>
        <div class="barrage_item _flex_item_center">
          <span class="title">不透明度：</span>
          <el-slider
              style="width: 200px"
              v-model="barrageSetting.opacity"
              :step="1"
              :min="0"
              :max="100"
              :show-tooltip="false"
              :marks="{0: '正常', 25: '25%' , 50: '50%', 75: '75%', 100: '100%'}"
              show-stops>
          </el-slider>
        </div>
        <div class="barrage_item _flex_item_center">
          <span class="title">弹幕大小：</span>
          <el-slider
              style="width: 200px"
              v-model="barrageSetting.size"
              :step="1"
              :min="1"
              :max="100"
              :show-tooltip="false"
              :marks="{1: '较小', 25: '小' , 50: '正常', 75: '大', 100: '较大'}"
              @change="handle_change_size"
              show-stops>
          </el-slider>
        </div>
        <div class="barrage_item _flex_item_center">
          <span class="title">弹幕速度：</span>
          <el-slider
              style="width: 200px"
              v-model="barrageSetting.speed"
              :step="20"
              :min="20"
              :max="100"
              :show-tooltip="false"
              :marks="{20: '极慢', 40: '较慢', 60: '慢', 80: '正常', 100: '快'}"
              show-stops>
          </el-slider>
        </div>
        <div class="item common_button_wrap _flex_center" slot="reference">
          <i class="iconfont icon-danmushezhi"></i>
        </div>
      </el-popover>
      <div class="input _flex_item_center">
        <el-popover
            placement="top"
            width="200"
            trigger="hover"
            popper-class="barrage_wrap"
        >
          <div class="barrage_color">
            <span class="title">弹幕颜色</span> <br>
            <div class="barrage_color_setting _flex_between_center">
              <input type="text" v-model="barrageSetting.color">
              <el-color-picker v-model="barrageSetting.color" size="mini"></el-color-picker>
            </div>
            <div class="barrage_color_list">
              <div v-for="(item, index) in barrageSetting.colorList"
                   :class="{ 'active': item.toUpperCase() === barrageSetting.color.toUpperCase() }" :key="index"
                   class="item" :style="{ backgroundColor: item }"
                   @click="handle_change_barrage_color(item, index)"></div>
            </div>
          </div>
          <div class="item common_button_wrap _flex_center" slot="reference">
            <i class="iconfont icon-yanseshezhi"></i>
          </div>
        </el-popover>
        <input @keyup.13="handle_send_barrage(barrageSetting.value)" v-model="barrageSetting.value"
               type="text" :placeholder="!isEnableDanmu ? '管理员已将弹幕禁用' : '发个友善的弹幕见证当下'">
        <el-button type="primary" @click="handle_send_barrage(barrageSetting.value)">发送</el-button>
        <!--<input :disabled="!barrageSwitch || !isUseDanmu" @keyup.13="handle_send_barrage(barrageSetting.value)" v-model="barrageSetting.value"-->
        <!--       type="text" :placeholder="!isUseDanmu ? '管理员已将弹幕禁用' : '发个友善的弹幕见证当下'">-->
        <!--<el-button :disabled="!barrageSwitch || !isUseDanmu" type="primary" @click="handle_send_barrage(barrageSetting.value)">发送</el-button>-->
      </div>
    </div>
  </div>
</template>

<script>
import vueDanmaku from 'vue-danmaku'

export default {
  props: {
    // 当前的播放模式
    mode: {
      type: String,
      default: 'live'
    },
    // 是否启用弹幕
    isEnableDanmu: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      barrageSwitch: false, // 是否关闭弹幕
      barrageSetting: {
        area: 60, // 最大全屏
        opacity: 0, //不透明度
        size: 50, // 弹幕大小
        speed: 80, // 弹幕速度
        color: '#FFFFFF', // 颜色，默认白色
        colorList: ['#FE0302', '#FF7204', '#FFAA02', '#FFD302', '#FFFF00', '#A0EE00', '#00CD00', '#019899', '#4266BE', '#89D5FF', '#CC0273', '#222222', '#9B9B9B', '#FFFFFF'], // 弹幕提供的颜色列表
        value: '',
        maxChaanel: 21
      },
      danmus: ['太好了', '太好了1', '太好了1', '太好了1', '太好了1', '太好了1', '太好了1', '太好了1', '太好了1'],
    }
  },
  methods: {
    // 改变弹幕播放状态
    handle_change_barrage_status() {
      this.barrageSwitch = !this.barrageSwitch
      this.$nextTick(_ => {
        this.barrageSwitch ? this.$refs.danmaku.show() : this.$refs.danmaku.hide()
      })
    },
    // 切换弹幕颜色
    handle_change_barrage_color(item, index) {
      this.barrageSetting.color = item
    },
    // 插入弹幕
    insertDanmu(list) {
      if (list.length) {
        list.map(item => {
          let obj = {
            color: item.c.split('|||')[0],
            size: + item.c.split('|||')[1],
            opacity: + item.c.split('|||')[2],
            content: this.filterText(item.c.split('|||')[3])
          }
          this.danmus.push(obj)
          // let index = this.$refs.danmaku.add(obj)
          // document.getElementsByClassName('barrage_text')[index].styule = ''
        })
      }
    },
    // 发送弹幕
    handle_send_barrage(text) {
      let {value, color, size, opacity} = this.barrageSetting
      if (!text) {
        return
      }
      this.danmus.push({
        color,
        size,
        opacity,
        content: '123'
      })
      // // 判断禁言列表是否包含
      // if (this.silenceIds.includes(this.loginAccount.id)) {
      //   this.$notify({
      //     title:'提示',
      //     message:'您已被禁言!',
      //     type:'warning',
      //     showClose:true,
      //   })
      //   return;
      // }
      // 计算当前直播多久了，然后截取时间
      // let time = new Date().getTime() - new Date(this.liveDetail.startTime).getTime()
      // // this.ws.send(`${color}|||${size}|||${opacity}|||${text}|||${time}`)
      // this.$nextTick(_ => {
      //   this.barrageSetting.value = ''
      // })
    },
  },
  components: {
    vueDanmaku
  }
}
</script>

<style>
.barrage_wrap {
  background-color: rgba(0, 0, 0, 0.7) !important;
  border-color: rgba(0, 0, 0, 0.7) !important;
}

.barrage_wrap .popper__arrow::after {
  border-top-color: rgba(0, 0, 0, 1) !important;
}

.barrage_item {
  margin-bottom: 10px;
  margin-right: 10px;
}

.barrage_item .title {
  font-size: 14px;
  color: #fff;
  margin-right: 10px;
  white-space: nowrap;
}

.barrage_color {
  padding: 5px;
}

.barrage_color .title {
  font-size: 14px;
  color: #fff;
  margin-right: 10px;
  white-space: nowrap;
}

.barrage_color .barrage_color_setting {
  margin-top: 5px;
}

.barrage_color .barrage_color_setting input {
  width: 125px;
  height: 22px;
  outline: none;
  border-radius: 2px;
  padding: 5px;
  margin-right: 10px;
}

.barrage_color .barrage_color_list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 170px
}

.barrage_color .barrage_color_list .item {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  cursor: pointer;
  margin-top: 7px;
  margin-right: 6px;
}

.barrage_color .barrage_color_list .active {
  box-shadow: 0 0 1px 2px #cccccc;
}

.setting_item {
  width: 100%;
  margin-top: 10px;
}

.setting_item label {
  font-size: 14px;
  color: #333;
}

.setting_item label i {
  font-size: 14px;
  color: #333;
  margin-right: 5px;
  margin-top: 3px;
}
</style>

<style lang="stylus" scoped>
.danmuku {
  width 100%
  height 100%
  position absolute
  left 0
  top 0
  z-index 2
  .barrage {
    margin-left auto
    height 100%

    .item {
      padding 0 6px
      height var(--hover-height)
      border-radius 3px
      cursor pointer
      background-color: rgba(46, 51, 56, .01);
      margin-right 5px

      i {
        font-size 27px
        color #666
      }

      .icon-yanseshezhi {
        font-size 18px
      }
    }

    .input {
      width 400px;
      height 38px
      background-color #F1F2F3
      border-radius 3px
      box-shadow 0 0 6px 0px rgba(0, 0, 0, 0.05)
      border 1px #eee solid

      input {
        width 280px
        height 32px
        border 0px
        outline none
        background-color transparent
        caret-color #666
        color #333
        font-size 13px
        margin-right auto
        margin-top -4px
      }

      .item {
        padding 0 10px
      }

      button {
        border-radius 0 3px 3px 0
        padding 10px 15px
      }
    }
  }
}
</style>
