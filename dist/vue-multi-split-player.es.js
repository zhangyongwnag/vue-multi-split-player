var vt = (a, e) => (e = Symbol[a]) ? e : Symbol.for("Symbol." + a);
var f = (a, e, i) => new Promise((t, l) => {
  var n = (d) => {
    try {
      u(i.next(d));
    } catch (o) {
      l(o);
    }
  }, c = (d) => {
    try {
      u(i.throw(d));
    } catch (o) {
      l(o);
    }
  }, u = (d) => d.done ? t(d.value) : Promise.resolve(d.value).then(n, c);
  u((i = i.apply(a, e)).next());
}), L = function(a, e) {
  this[0] = a, this[1] = e;
}, _ = (a, e, i) => {
  var t = (c, u, d, o) => {
    try {
      var p = i[c](u), v = (u = p.value) instanceof L, B = p.done;
      Promise.resolve(v ? u[0] : u).then((E) => v ? t(c === "return" ? c : "next", u[1] ? { done: E.done, value: E.value } : E, d, o) : d({ value: E, done: B })).catch((E) => t("throw", E, d, o));
    } catch (E) {
      o(E);
    }
  }, l = (c) => n[c] = (u) => new Promise((d, o) => t(c, u, d, o)), n = {};
  return i = i.apply(a, e), n[vt("asyncIterator")] = () => n, l("next"), l("throw"), l("return"), n;
};
import { ref as g, getCurrentInstance as It, computed as wt, onMounted as Bt, onBeforeUnmount as Qt, watch as he, nextTick as Dt } from "vue";
import { Notification as Ve } from "element-ui";
function Mt(a) {
  var e = /^1[3,5,8,2,4,6,7,9]\d{9}$/;
  return !!e.test(a);
}
function kt() {
  let a = navigator.userAgent;
  return ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "Mobile"].filter((i) => a.indexOf(i) !== -1).length;
}
function ut() {
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}
function bt(a) {
  let e = new RegExp("[?&]" + a + "=([^&#]*)").exec(window.location.href);
  return e ? e[1] : "";
}
function Rt(a) {
  var e = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  return e.test(a);
}
function St(a) {
  var e = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return e.test(a);
}
Date.prototype.format = function(a) {
  var e = {
    "M+": this.getMonth() + 1,
    //月份
    "d+": this.getDate(),
    //日
    "h+": this.getHours(),
    //小时
    "m+": this.getMinutes(),
    //分
    "s+": this.getSeconds(),
    //秒
    "q+": Math.floor((this.getMonth() + 3) / 3),
    //季度
    S: this.getMilliseconds()
    //毫秒
  };
  /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
  for (var i in e) new RegExp("(" + i + ")").test(a) && (a = a.replace(RegExp.$1, RegExp.$1.length == 1 ? e[i] : ("00" + e[i]).substr(("" + e[i]).length)));
  return a;
};
function xt(a, e) {
  return new Date(a).format(e);
}
function Ot(a = 0, e = 0) {
  let i = 86400, t = 60 * 60, l = 60, n = 0;
  if (i = parseInt(a / i), t = parseInt(a / t % 24), l = parseInt(a / l % 60), n = parseInt(a % 60), t < 10 && (t = "0" + t), l < 10 && (l = "0" + l), n < 10 && (n = "0" + n), e === 0)
    return i === 0 ? i = "" : i = `${i}-`, t === "00" ? t = "" : t = `${t}:`, `${i}${t}${l || "00"}:${n || "00"}`;
  if (e === 1)
    return `${t || "00"}:${l || "00"}:${n || "00"}`;
  if (e === 2)
    return `${i || "00"}-${t || "00"}:${l || "00"}`;
}
function dt(a, e = 500) {
  let i = Array.prototype.slice.call(arguments, 2);
  a.timer || (a.timer = setTimeout(() => {
    a.apply(this, i), a.timer = "";
  }, e));
}
function V(a, e = 500) {
  return (...i) => {
    clearTimeout(a.timer), a.timer = setTimeout(() => {
      a.apply(this, i);
    }, e);
  };
}
function Lt(a, e = 1e3) {
  let i = Array.prototype.slice.call(arguments, 2);
  a.looked || (a.apply(this, i), a.looked = !0), !a.timer && (a.timer = setTimeout(() => {
    a.looked = !1, a.timer = "";
  }, e));
}
function Ee(a, e = 500) {
  let i = Array.prototype.slice.call(arguments, 2);
  clearTimeout(a.timer), a.timer = setTimeout(() => {
    a.apply(this, i);
  }, e);
}
function Gt(a, e = 1e3) {
  let i = Array.prototype.slice.call(arguments, 2);
  a.looked || (a.apply(this, i), a.looked = !0), clearTimeout(a.timer), a.timer = setTimeout(() => {
    a.looked = !1;
  }, e);
}
function ht(a) {
  return a.endsWith(".m3u8");
}
function Ce(a) {
  switch (Object.prototype.toString.call(a)) {
    case "[object Object]":
      return "object";
    case "[object Array]":
      return "array";
    case "[object String]":
      return "string";
    case "[object Number]":
      return "number";
    case "[object Boolean]":
      return "boolean";
    case "[object Symbol]":
      return "symbol";
    default:
      return typeof a;
  }
}
function zt(a) {
  let e = Array.prototype.slice.call(arguments, 1);
  if (a.clicked) {
    a.call(this, ...e), a.clicked = !1;
    return;
  }
  a.clicked = !0, setTimeout(() => {
    a.clicked = !1;
  }, 500);
}
function pt(a) {
  let e = Object.freeze({
    "-1": "老师",
    0: "老师",
    1: "老师全景",
    2: "学生",
    3: "学生全景",
    4: "板书",
    5: "双视图",
    6: "跟踪",
    7: "老师左辅助",
    8: "老师右辅助",
    50: "板书辅助"
  }), i = a.split(",");
  return new Set(i.map((t) => e[t]));
}
const gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dateResult: xt,
  dblclick: zt,
  debounce: dt,
  debounceBind: V,
  debounceExecute: Lt,
  filterTime: Ot,
  filterVoiceConfigId: pt,
  getParam: bt,
  isChrome: ut,
  isEmail: Rt,
  isM3u8: ht,
  isMobile: kt,
  isPhone: Mt,
  isValidIP: St,
  luck: Gt,
  throttle: Ee,
  typeDetection: Ce
}, Symbol.toStringTag, { value: "Module" }));
function fe(a, e, i, t, l, n, c, u) {
  var d = typeof a == "function" ? a.options : a;
  return e && (d.render = e, d.staticRenderFns = i, d._compiled = !0), n && (d._scopeId = "data-v-" + n), {
    exports: a,
    options: d
  };
}
const Kt = {
  model: {
    prop: "current",
    event: "change"
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
      default: ""
    },
    // mark点列表
    mark: {
      type: Array,
      default: (a) => []
    }
  },
  data() {
    return {
      common: gt,
      disabled: !1,
      startX: 0,
      startPosition: 0,
      distance: 0,
      // 可滑行的距离
      is_show_pic: !0,
      // 是否展示缩略图
      // 缩略图信息
      thumbnail: {
        url: "",
        // 图片地址
        time: ""
        // 时间
      },
      show_block: !1,
      // 是否展示移动块
      loading: !1,
      note_item: {},
      // 当前查看的知识点
      is_draging: !1
      // 是否拖动过程中
    };
  },
  computed: {
    lineStyle() {
      if (this.distance && this.current && this.duration)
        return {
          width: this.current * (this.distance / this.duration) + "px"
        };
    },
    slideStyle() {
      if (this.distance && this.current && this.duration)
        return {
          left: this.current * (this.distance / this.duration) + "px"
        };
    }
  },
  mounted() {
    this._getDistance();
  },
  methods: {
    /**
     * @description 点击line修改时间
     */
    handleClick(a) {
      if (this.is_draging || !a.target.id)
        return;
      let e = a.target.getBoundingClientRect().left, i = (a.pageX - e) * (this.duration / this.distance);
      this.updateCurrentTime(i);
    },
    /**
     * @description 鼠标/触摸板开始
     */
    onButtonDown(a) {
      this.disabled || (a.preventDefault(), this.onDragStart(a), window.addEventListener("mousemove", this.onDragging), window.addEventListener("touchmove", this.onDragging), window.addEventListener("mouseup", this.onDragEnd), window.addEventListener("touchend", this.onDragEnd), window.addEventListener("contextmenu", this.onDragEnd));
    },
    /**
     * @description 拖拽开始
     */
    onDragStart(a) {
      this.is_draging = !0, a.type === "touchstart" && (a.pageY = a.touches[0].pageY, a.pageX = a.touches[0].pageX), this.startPosition = parseFloat(this.current), this.startX = a.pageX;
    },
    /**
     * @description 拖拽过程中
     */
    onDragging(a) {
      if (!this.is_draging)
        return;
      a.type === "touchmove" && (a.pageY = a.touches[0].pageY, a.pageX = a.touches[0].pageX);
      let e = 0;
      e = (a.pageX - this.startX) * (this.duration / this.distance);
      let i = this.startPosition + e;
      this.updateCurrentTime(i);
    },
    /**
     * @description 拖拽结束
     */
    onDragEnd() {
      this.is_draging && (window.removeEventListener("mousemove", this.onDragging), window.removeEventListener("touchmove", this.onDragging), window.removeEventListener("mouseup", this.onDragEnd), window.removeEventListener("touchend", this.onDragEnd), window.removeEventListener("contextmenu", this.onDragEnd), setTimeout((a) => {
        this.is_draging = !1;
      }, 50));
    },
    updateCurrentTime(a) {
      a < 0 && (a = 0), a >= this.duration && (a = this.duration), window.requestIdleCallback ? window.requestIdleCallback((e) => this.$emit("update", a)) : dt((e) => this.$emit("update", a), 100);
    },
    /**
     * @description 鼠标移入，显示移动块
     */
    handleMouseEnter(a) {
    },
    /**
     * @description 鼠标移动，修改移动块
     */
    onDraggingThumbnail(a) {
      if (!this.show_block)
        return;
      let e = document.getElementById("videoPlayer"), i = document.getElementById("indicator"), t = document.getElementById("thumbnail"), l = a.clientX - this._getLeft(e);
      i.style.transform = `translateX(${l}px)`, t.style.transform = `translateX(${l - 180 / 2 + 4}px)`;
      let n = l * (this.duration / this.distance);
      this.$set(this.thumbnail, "time", n.toFixed(0)), this.mark.length && this._getNoteItem(n), !this.loading && (this.loading = !0);
    },
    /**
     * @description 鼠标移出，隐藏移动块
     */
    handleMouseLeave() {
      this.show_block = !1;
    },
    /**
     * @description 获取当前所在区域的知识点
     * @param {Number} time: 当前所在时间点
     */
    _getNoteItem(a) {
      let e = this.mark.findIndex((i) => a < i.startSecond);
      this.mark[e - 1] ? this.note_item = this.mark[e - 1] : this.note_item = {};
    },
    /**
     * @description 点击知识点
     * @param {Object} item: 当前选中项
     * @param {Number} index: 选中项下标index
     */
    handle_click_note(a, e) {
      this.$emit("update", a.startSecond);
    },
    // 获取知识点的位置信息
    getNotePosition(a) {
      if (this.distance && this.duration)
        return a * (this.distance / this.duration);
    },
    /**
     * @description 获取元素距离页面左边的间距
     * @param {Object} el: 要获取的元素
     */
    _getLeft(a) {
      let e = a.offsetLeft;
      return a.offsetParent !== null && (e += this._getLeft(a.offsetParent)), e;
    },
    /**
     * @description 获取滑行区域距离
     */
    _getDistance() {
      this.$nextTick((a) => {
        this.distance = document.getElementById("track").offsetWidth;
      });
    }
  }
};
var Ht = function() {
  var e = this, i = e._self._c;
  return i("div", { staticClass: "slide", attrs: { id: "videoPlayer" }, on: { mousedown: function(t) {
    return t.preventDefault(), e.handleClick(t);
  }, touchstart: function(t) {
    return t.preventDefault(), e.handleClick(t);
  }, mouseenter: e.handleMouseEnter, mousemove: e.onDraggingThumbnail, mouseleave: e.handleMouseLeave } }, [i("div", { staticClass: "custom_cursor", style: e.slideStyle, attrs: { id: "box", tabindex: "0" }, on: { mousedown: e.onButtonDown, touchstart: e.onButtonDown } }), i("div", { style: e.lineStyle, attrs: { id: "track_line" } }), i("div", { attrs: { id: "track" } }), e.show_block ? i("div", { attrs: { id: "indicator" } }, [i("i", { staticClass: "el-icon-caret-bottom" }), i("i", { staticClass: "el-icon-caret-top" })]) : e._e(), e.show_block ? i("div", { staticClass: "thumbnail", attrs: { id: "thumbnail" } }, [i("div", { staticClass: "img_wrap" }, [i("img", { attrs: { src: e.thumbnail.url, alt: "" } })]), i("div", { staticClass: "text" }, [e._v(e._s(e.note_item.content))]), i("div", { staticClass: "time" }, [e._v(e._s(e.common.filterTime(+e.thumbnail.time * 1e3, 1)))])]) : e._e(), e._l(e.mark, function(t, l) {
    return i("div", { staticClass: "noteItem", style: { left: e.getNotePosition(t.startSecond) + "px" }, on: { click: function(n) {
      return e.handle_click_note(t, l);
    } } }, [i("div", { staticClass: "note_detail" }, [i("div", { staticClass: "note_wrap" }, [i("div", { staticClass: "img_wrap" }, [i("img", { attrs: { src: t.imgUrl, alt: "" } })]), i("div", { staticClass: "note_content" }, [e._v(e._s(t.content))]), e._m(0, !0)]), i("div", { staticClass: "note_time _flex_center" }, [e._v(e._s(e.common.filterTime(t.startSecond, 1)))])])]);
  })], 2);
}, qt = [function() {
  var a = this, e = a._self._c;
  return e("div", { staticClass: "icon _flex_center" }, [e("i", { staticClass: "el-icon-caret-bottom" })]);
}], Pt = /* @__PURE__ */ fe(
  Kt,
  Ht,
  qt,
  !1,
  null,
  "7df9647d"
);
const Ft = Pt.exports, Tt = {
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    // 全屏状态
    value: {
      type: Boolean,
      default: !1
    },
    // 全屏的类型 0 logo全屏 1 自定义slot全屏
    type: {
      type: Number,
      default: 0
    }
  },
  date() {
    return {
      tip: ""
      // 提示信息
    };
  },
  methods: {
    // 全屏
    handleFullscreen(a) {
      let e = a || document.body;
      this.value ? document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen() : e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullScreen ? e.webkitRequestFullScreen() : e.msRequestFullscreen && e.msRequestFullscreen();
    },
    // change
    handleChange(a) {
      this.handleFullscreen(a);
    }
  },
  mounted() {
    let a = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    a = !!a, document.addEventListener("fullscreenchange", () => {
      this.$emit("input", !this.value), this.$emit("on-change", !this.value);
    }), document.addEventListener("mozfullscreenchange", () => {
      this.$emit("input", !this.value), this.$emit("on-change", !this.value);
    }), document.addEventListener("webkitfullscreenchange", () => {
      this.$emit("input", !this.value), this.$emit("on-change", !this.value);
    }), document.addEventListener("msfullscreenchange", () => {
      this.$emit("input", !this.value), this.$emit("on-change", !this.value);
    }), this.$emit("input", a);
  }
};
var Nt = function() {
  var e = this, i = e._self._c;
  return i("div", [e.type ? e._t("default", function() {
    return [e._v("点击全屏")];
  }) : i("div", { staticClass: "logo _flex_center" })], 2);
}, jt = [], Jt = /* @__PURE__ */ fe(
  Tt,
  Nt,
  jt,
  !1,
  null,
  "0a15f553"
);
const Yt = Jt.exports;
class Ze {
  constructor(e) {
    this.playId = e, this.timer = null, this.waterMarkerDom = null, this.observer_c = null, this.observer_p = null, this.create();
  }
  create() {
    return f(this, null, function* () {
      this.getElement() && this.getElement().remove(), yield this.wait(500 + Math.random() * 200);
      let e = '<span style="font-size: 16px">游客</span> <br> 版权归我他妈所有', i = document.getElementById(this.playId);
      if (!i)
        return;
      this.width = i.offsetWidth, this.height = i.offsetHeight;
      let t = document.createElement("div");
      t.style.display = "inline-block", t.style.position = "absolute", t.id = `water_marker_${this.playId}`, t.style.top = "40px", t.style.left = "40px", t.style.lineHeight = "20px", t.style.color = "#fff", t.style.fontSize = "14px", t.style.textAlign = "left", t.style.pointerEvents = "none", t.style.filter = "opacity(0.3)", t.style.textShadow = `1px 1px 0px rgba(0, 0, 0, 0.2),
      1px 2px 0px rgba(0, 0, 0, 0.2),
      1px 3px 0px rgba(0, 0, 0, 0.2)`, t.style.mixBlendMode = "lighten", t.style.zIndex = 99, t.innerHTML = e, this.waterMarkerDom = t, i == null || i.appendChild(t), this.create_animate1(t), yield this.wait(1e3), this.observe_c(t), this.observe_p(i);
    });
  }
  create_animate1(e) {
    let i = 2, t = this.width - e.offsetWidth - 40, l = this.height - e.offsetHeight - 40, n = (Math.random() * t).toFixed(0), c = (Math.random() * l).toFixed(0), u = {
      transform: `translate(calc(${n}px),calc(${c}px))`
    };
    e.animate(u, {
      duration: 0,
      fill: "forwards",
      easing: "cubic-bezier(.31,.01,1,1.27)",
      delay: 0
    }), this.timer = setInterval(() => {
      i--, i === 0 && (i = 3, clearInterval(this.timer), this.create_animate1(e));
    }, 1e3);
  }
  create_animate(e) {
    e.animate([
      {
        transform: "translate(0 ,0) rotateZ(-45deg)"
      },
      // 起始位置
      {
        transform: `translate(calc(${this.width - 40}px - 100%), 0) rotateZ(45deg)`
      },
      // 右侧
      {
        transform: `translate(calc(${this.width - 40}px - 100%), calc(${this.height - 140}px - 100%)) rotateZ(45deg)`
      },
      // 底部
      {
        transform: `translate(0, calc(${this.height - 140}px - 100%)) rotateZ(-45deg)`
      },
      // 左侧
      {
        transform: "translate(0, 0) rotateZ(-45deg)"
      }
      // 返回起始位置
    ], {
      duration: 6e3,
      iterations: 1 / 0,
      // 无限循环
      easing: "linear",
      delay: 0
    });
  }
  observe_c(e) {
    let i = {
      attributes: !0,
      characterData: !0,
      childList: !0,
      subtree: !0
    };
    this.observer_c = new MutationObserver((t, l) => {
      for (let n of t)
        switch (n.type) {
          case "attributes":
          case "childList":
          case "characterData":
            Ve({
              title: "提示",
              message: "请勿篡改水印哦，尊重版权！",
              type: "warning",
              showClose: !0
            }), this.destroy(this.getElement()), this.create();
            break;
        }
    }), this.observer_c.observe(e, i);
  }
  observe_p(e) {
    let i = {
      attributes: !0,
      characterData: !0,
      childList: !0,
      subtree: !0
    };
    this.observer_p = new MutationObserver((t, l) => {
      for (let n of t)
        switch (n.type) {
          case "childList":
            let c = Array.from(n.removedNodes);
            c.length && c[0].id === `water_marker_${this.playId}` && (Ve({
              title: "提示",
              message: "请勿删除水印哦，尊重版权！",
              type: "warning",
              showClose: !0
            }), this.destroy(this.getElement()), this.create());
            break;
        }
    }), this.observer_p.observe(e, i);
  }
  destroy(e = this.getElement()) {
    var i, t;
    clearInterval(this.timer), (i = this.observer_c) == null || i.disconnect(), (t = this.observer_p) == null || t.disconnect(), e && e.remove();
  }
  getElement() {
    return this.waterMarkerDom || document.getElementById(`water_marker_${this.playId}`);
  }
  wait(e) {
    return f(this, null, function* () {
      return new Promise((i) => setTimeout(i, e));
    });
  }
}
const ae = "data:image/gif;base64,R0lGODlhgAc4BPf/AARvuOxqAD05OSaZ1yMjIzUxMWsbhqOjowBrM223LqpFGmdnZ/DIX+lEDHQYhfi3Mluw1wODODg0NBaFxlasM4QShJofG/i+R4u7KNVYFGxKlBhHZx0dHf///08pTFVUVAYFBYeHh5aWlqmTT6TFSPWjAHh4eOPj4xMTEygoKMjIyKlHld3c3NTU1Jsqi/OXACeXOUtISPGJAOpXCEpHR0dEREI+PjogSy0tLdSpFJPM6EVCQvX19YhUmKTFIkNAQDw9PCyh3IF/fkA8POrq6qI4jzAPCc0WHEI/P3qlPbCwsEcsZDyt4yeGuU1KSooQgxKQQExKSry8vJYdh0pIR3IqEW4ccFUeawdWKy9YKs1WMywVNw16wMVBE1skEFBNTUhGRdprJSlkjgYqFbxpBy4hEIMldkeKqCoqKveyHwomN09MTH01cBJjnTAwMDg3N0UbVhyMzEVsLQscJ3BUE2Achi5HVqyEGUoVDoBwUg9Sex9pO0KCMzchPdEsIHU6H0JAQPr6+lM9T0RCQZ2bm74aIUxJST8/P0CgN6upqT5SNk1KSV4xXuRACWuNPXcUGBsIBe57ACYmJmBdXSqTyQgSGS0qKuO5KIdDeStJIBoVBwMXDD46One93/etA0lGRhorFRIKFyl7p25razAiNI8Pg0hFRVFAFk5LS01KTEY3GEdEQ142JVRRUEZDQyoiLSI8Hzw4OCsoJxM2S0RAQQwMDBYWFkVziPz8/ERBQcySCmk9YI6LiyVbgEE9Pd6yFj+dy0IpRTo2Nqimpo4+HR8QJll4Q0AwKUE+PhoaGiAgIMLBwd55Nj0rGc7NzdjX1y9CMTtcbykpKra0tCQ+Uq+trU4uIXJvbw0WHY9tGX0UhFo/fhgXFyspKT88PCcnJykqKkA8O9/f36KhoSGS0X+41MPUUuODQEVBQSkmJj87O2FyLgVBIaCfn+7t7c+qVfj3+Ofn5yc1QSMuJX++Pv39/SQpIzdfR9rZ2fv7+5SSkrq4uHZzcvLx8QAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkY2YyNzcxNS03ZTllLTQ4Y2YtOTgxNC03YTMyZDgwMTBhMmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mzk3MkU3OERDMDExMTFFOTk2RUZCOUNCREE3RTI5RDkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mzk3MkU3OENDMDExMTFFOTk2RUZCOUNCREE3RTI5RDkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyZjc4ZGRhZC0wYWYxLTRiZDYtYWIyMy0wNDY4ODEyZjA3ODgiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyNDg0ZDVmOC1lNTcyLTNiNGEtYjk0ZS1lNGJkYjJkMzg1MGIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFCgD/ACwAAAAAgAc4BAAI/wD9CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169iza9/Ovbv37+DDi/8fT768+fPo06tfz769+/fw48ufT7++/fv48+vfz7+///8ABijggAQWaOCBCCao4IIMNujggxBGKOGEFFZo4YUYZqjhhhx26OGHIIYo4ogklmjiiSimqOKKLLbo4oswxijjjDTWaOONOOao44489ujjj0AGKeSQRBZp5JFIJqnkkkw26eSTUEYp5ZRUVmnllVhmqeWWXHbp5ZdghinmmGSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWaumlmGaq6aacdurpp6CGKuqopJZq6qmopqrqqqy26uqrsMb/KuustNZq66245qrrrrz26uuvwAYr7LDEFmvsscgmq+yyzDbr7LPQRivttNRWa+212Gar7bbcduvtt+CGK+645JZr7rnopqvuuuy26+678MYr77z01mvvvfjmq+++/Pbr778AByzwwAQXbPDBCCes8MIMN+zwwxBHLPHEFFds8cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLLfs8sswxyzzzDTXbPPNOOes88489+zzz0AHLfTQRBdt9NFIJ6300kw37fTTUEct9dRUV2311VhnrfXWXHft9ddghy322GSXbfbZaKet9tpst+3223DHLffcdNdt991456333nz3/+3334AHLvjghBdu+OGIJ6744ow37vjjkEcu+eSUV2755ZhnrvnmnHfu+eeghy766KSXbvrpqKeu+uqst+7667DHLvvstNdu++2456777rz37vvvwAcv/PDEF2/88cgnr/zyzDfv/PPQRy/99NRXb/312Gev/fbcd+/99+CHL/745Jdv/vnop6/++uy37/778Mcv//z012///fjnr//+/Pfv//8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygBCdIwQpa8IIYzKAGN8jBDnrwgyAMoQhHSMISmvCEKEyhClfIwha68IUwjKEMZ0jDGtrwhjjMoQ53yMMe+vCHQAyiEP+HSMQiGvGISEyiEpfIxCY68YlQjKIUp0jFKlrxiljMoha3yMUuevGLYAyjGMdIxjKa8YxoTKMa18jGNrrxjXCMoxznSMc62vGOeMyjHvfIxz768Y+ADKQgB0nIQhrykIhMpCIXychGOvKRkIykJCdJyUpa8pKYzKQmN8nJTnryk6AMpShHScpSmvKUqEylKlfJyla68pWwjKUsZ0nLWtrylrjMpS53ycte+vKXwAymMIdJzGIa85jITKYyl8nMZjrzmdCMpjSnSc1qWvOa2MymNrfJzW5685vgDKc4x0nOcprznOhMpzrXyc52uvOd8IynPOdJz3ra8574zKc+98n/z376858ADahAB0rQghr0oAhNqEIXytCGOvShEI2oRCdK0Ypa9KIYzahGN8rRjnr0oyANqUhHStKSmvSkKE2pSlfK0pa69KUwjalMZ0rTmtr0pjjNqU53ytOe+vSnQA2qUIdK1KIa9ahITapSl8rUpjr1qVCNqlSnStWqWvWqWM2qVrfK1a569atgDatYx0rWspr1rGhNq1rXyta2uvWtcI2rXOdK17ra9a54zate98rXvvr1r4ANrGAHS9jCGvawiE2sYhfL2MY6tjY/MMUbCkBZZSTjsigAgWZB8FjxxcIJTkAFaEcrWlOY4hO5oKwE3HDZy3K2s9dzg2hRIdrR/4K2trbNrSVgez0OGCK3wA3uaDnBW+uhIAbCTe5oF+GK13IEBZbgQDI4YItabLa4rAPBJ5SbXENEwQko8MhxQbsIJ9DgvDWIhQQkUAACSJcDmdUsdj8HgiEo97eG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";
var Ue, We, Xe, _e, Q;
function $(a, e, i, t, l) {
  var n = {};
  return Object.keys(t).forEach(function(c) {
    n[c] = t[c];
  }), n.enumerable = !!n.enumerable, n.configurable = !!n.configurable, ("value" in n || n.initializer) && (n.writable = !0), n = i.slice().reverse().reduce(function(c, u) {
    return u(a, e, c) || c;
  }, n), l && n.initializer !== void 0 && (n.value = n.initializer ? n.initializer.call(l) : void 0, n.initializer = void 0), n.initializer === void 0 ? (Object.defineProperty(a, e, n), null) : n;
}
let ee = () => function(a, e, i) {
  let t = i.value;
  i.value = function(...l) {
    return t.apply(this, l);
  };
}, Vt = (Ue = ee(), We = ee(), Xe = ee(), _e = ee(), Q = class {
  constructor(e) {
    this.config = e, this.player = {}, this.onLoadFinish = null, this.onPlayTime = null, this.onPlayState = null, this.onPlayFinish = null, this.run();
  }
  run() {
    let e = this._init(), {
      value: i,
      done: t
    } = e.next();
    t || (e.next(), e.next());
  }
  // 初始化
  _init() {
    return _(this, null, function* () {
      let {
        id: e,
        type: i,
        url: t,
        index: l,
        count: n
      } = this.config;
      if (!e)
        throw new Error("Container id is required");
      if (!t)
        throw new Error("player url is required");
      if (yield yield new L(this.createVideo(e, t)), !this.player)
        return {
          value: void 0,
          done: !0
        };
      yield yield new L(this.initEvent(this.player)), yield yield new L(this.addVttSubtitle(this.player, l, n));
    });
  }
  // 创建video
  createVideo(e, i) {
    try {
      let t = document.querySelector(e);
      if (!t)
        throw new Error("Player id is required");
      t.innerHTML = "";
      let l = document.createElement("video");
      if (l.poster = ae, l.controls = !1, l.autoplay = !1, l.muted = !1, l.preload = "auto", l.volume = 0, l.classList = ["video__"], ht(i)) {
        let n = new Hls();
        n.loadSource(i), n.attachMedia(l);
      } else
        l.src = i;
      t.appendChild(l), this.player = l;
    } catch (t) {
      throw new Error("create video error" + t);
    }
  }
  // 添加VTT字幕
  addVttSubtitle(e, i, t) {
    if (window.subtitleUrl && i === t - 1) {
      let l = document.createElement("track");
      l.src = window.subtitleUrl || "", l.label = "Chinese", l.srclang = "zh", l.kind = "subtitles", l.default = " ", e.appendChild(l);
    }
  }
  // 监听video一系列事件
  initEvent(e) {
    return f(this, null, function* () {
      if (!e)
        return;
      yield new Promise((t) => setTimeout(t, 10)), ["canplay", "play", "pause", "seeked", "timeupdate", "volumechange", "ended", "error"].forEach((t) => {
        let l = t, n = `on${l.charAt(0).toUpperCase() + l.slice(1)}`;
        e.addEventListener(t, this[n].bind(this), {
          once: l === "canplay"
        });
      });
    });
  }
  onCanplay() {
    this.onLoadFinish && this.onLoadFinish();
  }
  onPlay() {
    this.onPlayState && this.onPlayState(!0);
  }
  onPause() {
    this.onPlayState && this.onPlayState(!1);
  }
  onSeeked() {
  }
  onTimeupdate() {
    this.onPlayTime && this.onPlayTime(this.player.currentTime);
  }
  onVolumechange() {
  }
  onEnded() {
    this.onPlayFinish && this.onPlayFinish();
  }
  onError() {
  }
  do() {
    this.player.play(), this.onPlayState && this.onPlayState(!0);
  }
  play() {
    this.player.play(), this.onPlayState && this.onPlayState(!0);
  }
  pause() {
    this.player.pause(), this.onPlayState && this.onPlayState(!1);
  }
  isPlaying() {
    return !this.player.paused;
  }
  seek(e) {
    requestAnimationFrame(() => {
      this.player.currentTime = e;
    });
  }
  setVoice(e) {
    this.player.volume = e;
  }
  mediaInfo() {
    return {
      duration: this.player.duration * 1e3
    };
  }
  release() {
    var e;
    try {
      this.player.pause(), this.player.src = "", this.player.load(), (e = this.player) == null || e.parentNode.removeChild(this.player);
    } catch (i) {
    }
  }
  setPlaybackRate(e) {
    this.player.playbackRate = e;
  }
}, $(Q.prototype, "_init", [Ue], Object.getOwnPropertyDescriptor(Q.prototype, "_init"), Q.prototype), $(Q.prototype, "createVideo", [We], Object.getOwnPropertyDescriptor(Q.prototype, "createVideo"), Q.prototype), $(Q.prototype, "addVttSubtitle", [Xe], Object.getOwnPropertyDescriptor(Q.prototype, "addVttSubtitle"), Q.prototype), $(Q.prototype, "initEvent", [_e], Object.getOwnPropertyDescriptor(Q.prototype, "initEvent"), Q.prototype), Q);
function Zt(a) {
  let e = g(null), i = g(null), t = 0.2, l = (o, p) => {
    var v, B, E, C;
    o.value = o, i.value = p, o.value && ((v = o.value) == null || v.addEventListener("click", n), (B = o.value) == null || B.addEventListener("dblclick", n), (E = o.value) == null || E.addEventListener("mousedown", V(u, t * 1e3)), (C = o.value) == null || C.addEventListener("mouseup", V(d, t * 1e3)));
  }, n = (o) => {
    o.stopPropagation();
  }, c = () => {
    var o, p, v, B;
    (o = e.value) == null || o.removeEventListener("click", n), (p = e.value) == null || p.removeEventListener("dblclick", n), (v = e.value) == null || v.removeEventListener("mousedown", V(u, t * 1e3)), (B = e.value) == null || B.removeEventListener("mouseup", V(d, t * 1e3));
  }, u = (o) => {
    o.stopPropagation();
    let p = o.target;
    p.getAttribute("data-type") && a.emit("startControl", {
      id: i.value,
      type: p.getAttribute("data-type")
    });
  }, d = (o) => {
    o.stopPropagation();
    let p = o.target;
    p.getAttribute("data-type") && a.emit("stopControl", {
      id: i.value,
      type: p.getAttribute("data-type")
    });
  };
  return {
    startEventMonitoring: l,
    stopEventMonitoring: c
  };
}
var $e, et, tt, it, D;
function te(a, e, i, t, l) {
  var n = {};
  return Object.keys(t).forEach(function(c) {
    n[c] = t[c];
  }), n.enumerable = !!n.enumerable, n.configurable = !!n.configurable, ("value" in n || n.initializer) && (n.writable = !0), n = i.slice().reverse().reduce(function(c, u) {
    return u(a, e, c) || c;
  }, n), l && n.initializer !== void 0 && (n.value = n.initializer ? n.initializer.call(l) : void 0, n.initializer = void 0), n.initializer === void 0 ? (Object.defineProperty(a, e, n), null) : n;
}
let ie = () => function(a, e, i) {
  let t = i.value;
  i.value = function(...l) {
    return t.apply(this, l);
  };
}, Ut = ($e = ie(), et = ie(), tt = ie(), it = ie(), D = class {
  constructor(e) {
    this.config = e, this.disableControlList = ["PPT", "PGM", "老师全景", "学生全景"], this.player = {}, this.onLoadFinish = null, this.onPlayTime = null, this.onPlayState = null, this.onPlayFinish = null, this.replyCount = 5, this.use_control_listener = Zt(this.config.eventBus), this.run();
  }
  run() {
    let e = this._init(), {
      value: i,
      done: t
    } = e.next();
    t || (e.next(), e.next(), e.next());
  }
  // 初始化
  _init() {
    return _(this, null, function* () {
      let {
        id: e,
        classroomId: i,
        type: t,
        url: l,
        index: n,
        count: c,
        name: u
      } = this.config;
      if (!e)
        throw new Error("Container id is required");
      if (!l)
        throw new Error("player url is required");
      if (yield yield new L(this.createVideo(e, l, u)), yield yield new L(this.createControlLayout(e, i, u)), !this.player)
        return {
          value: void 0,
          done: !0
        };
      yield yield new L(this.initEvent(this.player));
    });
  }
  // 创建video
  createVideo(n, c, u) {
    return f(this, arguments, function* (e, i, t, l = 0) {
      let d = Array.from(arguments);
      try {
        let o = document.querySelector(e);
        if (!o)
          throw new Error("Player id is required");
        o.innerHTML = "";
        let p = document.createElement("video");
        p.id = `video_${e}`, p.classList = ["video__"], p.controls = !1, p.autoplay = !0, p.playsInline = !0, p.preload = "auto", p.poster = ae, p.volume = 0, p.controls = !1, o.appendChild(p), this.player = yield Streamedian.player(p.id, {
          socket: i,
          // redirectNativeMediaErrors: true,
          bufferDuration: 10,
          dataHandler: this._handleData,
          errorHandler: (v) => this._handlerError(v, ...d, l)
        });
      } catch (o) {
        throw new Error(o);
      }
    });
  }
  // 创建遥控面板
  createControlLayout(e, i, t) {
    return f(this, null, function* () {
      if (!this.config.isEnableControl)
        return;
      let l = document.getElementById(e);
      (function() {
        let n = l.querySelector(".remote_control");
        n && n.parentNode.removeChild(n);
      }).apply(), !this.disableControlList.includes(t) && function() {
        let n = document.createElement("div");
        n.classList = ["remote_control"], n.innerHTML = ` <div class="activeElement" data-type="3"><i class="iconfont icon-shangxiazuoyouTriangle12"></i></div>
              <div class="activeElement" data-type="2"><i class="iconfont icon-shangxiazuoyouTriangle12"></i></div>
              <div class="activeElement" data-type="4"><i class="iconfont icon-shangxiazuoyouTriangle12"></i></div>
              <div class="activeElement" data-type="1"><i class="iconfont icon-shangxiazuoyouTriangle12"></i></div>
              <div class="action activeElement" data-type="5"><i class="el-icon-plus"></i>放大</div>
              <div class="action activeElement" data-type="6"><i class="el-icon-minus"></i>缩小</div>
              <div class="action activeElement" data-type="10"><i class="el-icon-refresh-left"></i>还原</div>`, l.appendChild(n), this.use_control_listener.startEventMonitoring(n, i);
      }.apply(this);
    });
  }
  // 监听video一系列事件
  initEvent(e) {
    ["canplay", "play", "pause", "seeked", "loadedmetadata", "timeupdate", "volumechange", "ended", "error"].forEach((t) => {
      let l = t, n = `on${l.charAt(0).toUpperCase() + l.slice(1)}`;
      e.player.addEventListener(t, this[n].bind(this), {
        once: l === "canplay"
      });
    });
  }
  onCanplay() {
    this.onLoadFinish && this.onLoadFinish();
  }
  onPlay() {
    this.onPlayState && this.onPlayState(!0);
  }
  onPause() {
    this.onPlayState && this.onPlayState(!1);
  }
  onSeeked() {
    return f(this, null, function* () {
    });
  }
  onLoadedmetadata() {
    return f(this, null, function* () {
    });
  }
  onTimeupdate() {
    var e;
    this.onPlayTime && this.onPlayTime((e = this.player) == null ? void 0 : e.player.currentTime);
  }
  onVolumechange() {
  }
  onEnded() {
    this.onPlayFinish && this.onPlayFinish();
  }
  onError() {
  }
  play() {
    var e;
    this.player.start(), (e = this.player.player) == null || e.play(), this.onPlayState && this.onPlayState(!0);
  }
  pause() {
    var e;
    this.player.stop(), (e = this.player.player) == null || e.pause(), this.onPlayState && this.onPlayState(!1);
  }
  isPlaying() {
    return this.player.isPlaying();
  }
  setVoice(e) {
    this.player.player.volume = e;
  }
  release() {
    var e, i;
    try {
      (e = this.player) == null || e.destroy(), (i = this.player.player) == null || i.parentNode.removeChild(this.player.player), this.use_control_listener.stopEventMonitoring();
    } catch (t) {
    }
  }
  // 录屏时
  _handleData(e, i) {
    let t = document.createElement(""), l = new Blob([e], {
      type: "application/mp4"
    });
    t.href = window.URL.createObjectURL(l), t.download = `${i}_${/* @__PURE__ */ new Date()}.mp4`, t.click();
  }
  /**
   * @description: 错误处理
   * @param {Object} error
   * @param {Number} retryCount
   */
  _handlerError(e, i, t, l) {
    return f(this, null, function* () {
      if (l < this.replyCount)
        yield this.release(), yield new Promise((n) => setTimeout(n, 1e3)), yield this.createVideo(i, t, l + 1);
      else
        throw new Error(`Max retry count (${this.replyCount}) reached`);
    });
  }
}, te(D.prototype, "_init", [$e], Object.getOwnPropertyDescriptor(D.prototype, "_init"), D.prototype), te(D.prototype, "createVideo", [et], Object.getOwnPropertyDescriptor(D.prototype, "createVideo"), D.prototype), te(D.prototype, "createControlLayout", [tt], Object.getOwnPropertyDescriptor(D.prototype, "createControlLayout"), D.prototype), te(D.prototype, "initEvent", [it], Object.getOwnPropertyDescriptor(D.prototype, "initEvent"), D.prototype), D);
var at, nt, lt, R;
function pe(a, e, i, t, l) {
  var n = {};
  return Object.keys(t).forEach(function(c) {
    n[c] = t[c];
  }), n.enumerable = !!n.enumerable, n.configurable = !!n.configurable, ("value" in n || n.initializer) && (n.writable = !0), n = i.slice().reverse().reduce(function(c, u) {
    return u(a, e, c) || c;
  }, n), l && n.initializer !== void 0 && (n.value = n.initializer ? n.initializer.call(l) : void 0, n.initializer = void 0), n.initializer === void 0 ? (Object.defineProperty(a, e, n), null) : n;
}
let ge = () => function(a, e, i) {
  let t = i.value;
  i.value = function(...l) {
    return t.apply(this, l);
  };
}, Wt = (at = ge(), nt = ge(), lt = ge(), R = class {
  constructor(e) {
    this.config = e, this.player = {}, this.onLoadFinish = null, this.onPlayTime = null, this.onPlayState = null, this.onPlayFinish = null, this.run();
  }
  run() {
    let e = this._init(), {
      value: i,
      done: t
    } = e.next();
    t || (e.next(), e.next());
  }
  // 初始化
  _init() {
    return _(this, null, function* () {
      let {
        id: e,
        classroomId: i,
        type: t,
        url: l,
        index: n,
        count: c,
        name: u
      } = this.config;
      if (!e)
        throw new Error("Container id is required");
      if (!l)
        throw new Error("player url is required");
      if (yield yield new L(this.createVideo(e, l, u)), !this.player)
        return {
          value: void 0,
          done: !0
        };
      yield yield new L(this.initEvent(this.player));
    });
  }
  // 创建video
  createVideo(n, c, u) {
    return f(this, arguments, function* (e, i, t, l = 0) {
      Array.from(arguments);
      try {
        let d = document.querySelector(e);
        if (!d)
          throw new Error("Player id is required");
        d.innerHTML = "";
        let o = document.createElement("video");
        o.id = `video_${e}`, o.classList = ["video__"], o.controls = !1, o.autoplay = !1, o.playsInline = !0, o.preload = "auto", o.poster = ae, o.volume = 0, d.appendChild(o), this.player = new ZLMRTCClient.Endpoint({
          element: o,
          // video 标签
          debug: !1,
          // 是否打印日志
          zlmsdpUrl: "http://10.0.129.131:8080/index/api/webrtc?app=live&stream=100_0&type=play",
          //流地址
          simulcast: !1,
          useCamera: !0,
          audioEnable: !0,
          videoEnable: !0,
          recvOnly: !0,
          resolution: {
            w: 1280,
            h: 720
          },
          usedatachannel: !1,
          audioId: "",
          videoId: ""
          // videoId:vdevid, // 不填选择默认的
          // audioId:adevid, // 不填选择默认的
        }), this.player.video = o;
      } catch (d) {
        throw new Error(d);
      }
    });
  }
  // 监听video一系列事件
  initEvent(e) {
    ["canplay", "play", "pause", "seeked", "loadedmetadata", "timeupdate", "volumechange", "ended", "error"].forEach((t) => {
      let l = t, n = `on${l.charAt(0).toUpperCase() + l.slice(1)}`;
      e.video.addEventListener(t, this[n].bind(this), {
        once: l === "canplay"
      });
    }), e.on(ZLMRTCClient.Events.WEBRTC_ICE_CANDIDATE_ERROR, function(t) {
      console.log("ICE 协商出错");
    }), e.on(ZLMRTCClient.Events.WEBRTC_ON_REMOTE_STREAMS, (t) => {
      this.onCanplay(), console.log("播放成功", t.streams);
    }), e.on(ZLMRTCClient.Events.WEBRTC_OFFER_ANWSER_EXCHANGE_FAILED, function(t) {
      console.log("offer anwser 交换失败", t), stop();
    }), e.on(ZLMRTCClient.Events.WEBRTC_ON_LOCAL_STREAM, function(t) {
      document.getElementById("selfVideo").srcObject = t, document.getElementById("selfVideo").muted = !0;
    }), e.on(ZLMRTCClient.Events.CAPTURE_STREAM_FAILED, function(t) {
      console.log("获取本地流失败");
    }), e.on(ZLMRTCClient.Events.WEBRTC_ON_CONNECTION_STATE_CHANGE, function(t) {
      console.log("当前状态==>", t);
    }), e.on(ZLMRTCClient.Events.WEBRTC_ON_DATA_CHANNEL_OPEN, function(t) {
      console.log("rtc datachannel 打开 :", t);
    }), e.on(ZLMRTCClient.Events.WEBRTC_ON_DATA_CHANNEL_MSG, function(t) {
      console.log("rtc datachannel 消息 :", t.data), document.getElementById("msgrecv").value = t.data;
    }), e.on(ZLMRTCClient.Events.WEBRTC_ON_DATA_CHANNEL_ERR, function(t) {
      console.log("rtc datachannel 错误 :", t);
    }), e.on(ZLMRTCClient.Events.WEBRTC_ON_DATA_CHANNEL_CLOSE, function(t) {
      console.log("rtc datachannel 关闭 :", t);
    });
  }
  onCanplay() {
    console.log("canplay"), this.onLoadFinish && this.onLoadFinish();
  }
  onPlay() {
    this.onPlayState && this.onPlayState(!0);
  }
  onPause() {
    this.onPlayState && this.onPlayState(!1);
  }
  onSeeked() {
    return f(this, null, function* () {
    });
  }
  onLoadedmetadata() {
    return f(this, null, function* () {
    });
  }
  onTimeupdate() {
    var e;
    this.onPlayTime && this.onPlayTime((e = this.player) == null ? void 0 : e.video.currentTime);
  }
  onVolumechange() {
  }
  onEnded() {
    this.onPlayFinish && this.onPlayFinish();
  }
  onError() {
  }
  play() {
    var e;
    this.player.start(), (e = this.player.video) == null || e.play(), this.onPlayState && this.onPlayState(!0);
  }
  pause() {
    var e;
    (e = this.player.video) == null || e.pause(), this.onPlayState && this.onPlayState(!1);
  }
  isPlaying() {
    return !this.player.video.paused;
  }
  setVoice(e) {
    this.player.video.volume = e;
  }
  release() {
    var e;
    try {
      this.player.close(), this.player.closeDataChannel(), this.player.video.load(), (e = this.player.video) == null || e.parentNode.removeChild(this.player.video);
    } catch (i) {
    }
  }
}, pe(R.prototype, "_init", [at], Object.getOwnPropertyDescriptor(R.prototype, "_init"), R.prototype), pe(R.prototype, "createVideo", [nt], Object.getOwnPropertyDescriptor(R.prototype, "createVideo"), R.prototype), pe(R.prototype, "initEvent", [lt], Object.getOwnPropertyDescriptor(R.prototype, "initEvent"), R.prototype), R);
var rt, At, st, S;
function me(a, e, i, t, l) {
  var n = {};
  return Object.keys(t).forEach(function(c) {
    n[c] = t[c];
  }), n.enumerable = !!n.enumerable, n.configurable = !!n.configurable, ("value" in n || n.initializer) && (n.writable = !0), n = i.slice().reverse().reduce(function(c, u) {
    return u(a, e, c) || c;
  }, n), l && n.initializer !== void 0 && (n.value = n.initializer ? n.initializer.call(l) : void 0, n.initializer = void 0), n.initializer === void 0 ? (Object.defineProperty(a, e, n), null) : n;
}
let ye = () => function(a, e, i) {
  let t = i.value;
  i.value = function(...l) {
    return t.apply(this, l);
  };
}, Xt = (rt = ye(), At = ye(), st = ye(), S = class {
  constructor(e) {
    this.config = e, this.player = {}, this.onLoadFinish = null, this.onPlayTime = null, this.onPlayState = null, this.onPlayFinish = null, this.run();
  }
  run() {
    let e = this._init(), {
      value: i,
      done: t
    } = e.next();
    t || (e.next(), e.next());
  }
  // 初始化
  *_init() {
    let {
      id: e,
      type: i,
      url: t,
      index: l,
      count: n
    } = this.config;
    if (!e)
      throw new Error("Container id is required");
    if (!t)
      throw new Error("player url is required");
    if (yield this.createVideo(e, t), !this.player)
      return {
        value: void 0,
        done: !0
      };
    yield this.initEvent(this.player);
  }
  // 创建video
  createVideo(e, i) {
    try {
      let t = document.querySelector(e);
      if (!t)
        throw new Error("Player id is required");
      t.innerHTML = "";
      let l = document.createElement("video");
      t.appendChild(l), this.player = videojs(l, {
        liveui: !0,
        autoplay: ut() ? "muted" : !0,
        controls: !1,
        volume: 0,
        sources: [{
          src: i,
          type: "application/x-mpegURL"
        }],
        userActions: {
          click: !1,
          // 用户单机行为
          doubleClick: !1,
          // 用户双击行为
          hotkeys: !1
          // 热键行为
        }
      });
    } catch (t) {
      throw new Error("create video error" + t);
    }
  }
  // 监听video一系列事件
  initEvent(e) {
    return f(this, null, function* () {
      if (!e)
        return;
      ["canplay", "play", "pause", "timeupdate", "volumechange", "ended", "error"].forEach((t) => {
        let l = t, n = `on${l.charAt(0).toUpperCase() + l.slice(1)}`;
        e.on(t, this[n].bind(this));
      });
    });
  }
  onCanplay() {
    this.onLoadFinish && this.onLoadFinish();
  }
  onPlay() {
    console.log("play"), this.onPlayState && this.onPlayState(!0);
  }
  onPause() {
    this.onPlayState && this.onPlayState(!1);
  }
  onTimeupdate() {
    this.onPlayTime && this.onPlayTime(this.player.currentTime());
  }
  onVolumechange() {
  }
  onEnded() {
    this.onPlayFinish && this.onPlayFinish();
  }
  onError(e) {
    console.log(e);
  }
  play() {
    this.player.play(), this.onPlayState && this.onPlayState(!0);
  }
  pause() {
    this.player.pause(), this.onPlayState && this.onPlayState(!1);
  }
  isPlaying() {
    return !this.player.paused;
  }
  seek(e) {
    requestAnimationFrame(() => {
      this.player.currentTime = e;
    });
  }
  setVoice(e) {
    this.player.volume(e);
  }
  mediaInfo() {
    return {
      duration: this.player.duration * 1e3
    };
  }
  release() {
    try {
      this.player.dispose();
    } catch (e) {
    }
  }
  setPlaybackRate(e) {
    this.player.playbackRate = e;
  }
}, me(S.prototype, "_init", [rt], Object.getOwnPropertyDescriptor(S.prototype, "_init"), S.prototype), me(S.prototype, "createVideo", [At], Object.getOwnPropertyDescriptor(S.prototype, "createVideo"), S.prototype), me(S.prototype, "initEvent", [st], Object.getOwnPropertyDescriptor(S.prototype, "initEvent"), S.prototype), S);
function _t(a, e) {
  var l;
  let i = a;
  i != null || (i = "");
  let t = g(/* @__PURE__ */ new Set([]));
  if (i !== "") {
    let n = String((l = e.find((c) => c.id === i)) == null ? void 0 : l.value);
    n && (t.value = pt(n));
  }
  return {
    voiceChannel: t
  };
}
class $t {
  constructor() {
    this.eventTarget = new EventTarget(), this.eventHandlers = /* @__PURE__ */ new Map([]);
  }
  // 监听事件
  on(e, i) {
    let t = (l) => i(l.detail);
    this.eventTarget.addEventListener(e, t), this.eventHandlers.set(e, t);
  }
  // 触发事件
  emit(e, i) {
    let t = new CustomEvent(e, {
      detail: i
    });
    this.eventTarget.dispatchEvent(t);
  }
  // 移除事件监听
  off(e) {
    let i = this.eventHandlers.get(e);
    i && (this.eventTarget.removeEventListener(e, i), this.eventHandlers.delete(e));
  }
  destroy() {
    Array.from(this.eventHandlers.keys()).forEach((i) => this.off(i));
  }
}
const K = new $t();
function ei() {
  return {
    isExists: (e, i) => Ce(e) !== "array" ? !1 : e.find((t) => t.sceneName === i)
  };
}
function ti(a) {
  let e = a.eventBus, i = a.video_player, t = document.querySelector(`#${a.playId}`), l = null, n = null, c = () => {
    let m = i.length;
    Array.from({
      length: m
    }, (I, q) => {
      let j = `#${a.playId} #player_item_${q + 1}`, Z = document.querySelector(j);
      u(Z, q), d(Z);
    }), o();
  }, u = (m, I) => {
    m.title = i[I].sceneName;
  }, d = (m, I) => {
    m.draggable = !0;
  }, o = () => {
    t && (t.addEventListener("click", v, {
      passive: !0
    }), t.addEventListener("dragstart", B, {
      passive: !1
    }), t.addEventListener("dragenter", E, {
      passive: !1
    }), t.addEventListener("dragleave", C, {
      passive: !1
    }), t.addEventListener("dragend", k, {
      passive: !1
    }), t.addEventListener("dragover", O, {
      passive: !1
    }), t.addEventListener("drop", x, {
      passive: !1
    }));
  }, p = () => {
    t && (t.removeEventListener("click", v, {
      passive: !0
    }), t.removeEventListener("dragstart", B, {
      passive: !1
    }), t.removeEventListener("dragenter", E, {
      passive: !1
    }), t.removeEventListener("dragleave", C, {
      passive: !1
    }), t.removeEventListener("dragend", k, {
      passive: !1
    }), t.removeEventListener("dragover", O, {
      passive: !1
    }), t.removeEventListener("drop", x, {
      passive: !1
    }));
  }, v = (m) => {
    if (l) {
      clearTimeout(l), l = null, e.emit("maximize", m);
      return;
    }
    l = setTimeout(() => {
      l = null, e.emit("switch", m);
    }, 200);
  }, B = (m) => {
    let I = m.target;
    I.classList.contains("maximize") || (I.classList.add("dragstart"), n = m.target);
  }, E = (m) => {
    n && n !== m.target && m.target.classList.add("dragging");
  }, C = (m) => {
    n && n !== m.target && m.target.classList.remove("dragging");
  }, k = (m) => {
    n && (m.target.classList.remove("dragstart"), n = null);
  }, x = (m) => {
    n && (m.target.classList.remove("dragging"), e.emit("dragend", {
      target: n,
      source: m.target
    }));
  }, O = (m) => {
    n && m.preventDefault();
  };
  return {
    init: c,
    destroy: p
  };
}
const ii = "data:audio/mp4;base64,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", ot = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA/hJREFUaEPtmWvon2MYxz/fTIwkhyanZc5DLBOyoZRDNokXiKIcEkuUDbFiqzkV3iyHciwv7A2Z04gi9so5wiblMFq0ZhJb4qtL9//f4/7dz/Z7fqdn//rfL+/7fq7n+lzX9Vz3dV+PmOBDE1x/JgHa9uCkB+o8YPtoYJOkdcP00sA9YHtP4G7gWmCtpCMmBIDtHYDrgKXAHmNKS2pkJNu7ADcCJwGrgKckbakzQiPhWwmXU4AngCPzPT0APA9cUJGzArhU0j+l9/cFYHtf4CHg4loLNffAr8Dumbzlkm4YGIDtnYCbgduBXbcW4z144A3gzILMBZIe7vBw0w/M9nnJ6od082wPAMcC7wG7ZfL/Ak6U9El1XranA48B53SjUNM9TQFCvu05wFtAeLo6vgaOk/TneJKw/Q5wWlPFut3fC0CCuAJ4uvCe+yXdWgVwt8r0sq8OwPb5wP7Ai5J+LMm2/Wg6T6rLfwOzJH0ekxFCIwew/VoWsvMlvZJDpGTxGXBYtrZSUhhg9AC2Q5m1BYvPlvRRAWIe8HI2H2fCDEnfj9wDtvcGfikAfCppVk0olb7TZZIWjxwgfaCXA88UlF0o6YGCFyJ1r8zm10k6sBWABBEn+E2ZUhuBAyT9UZ23HRXDt0Ck/Oo4qjWABPEVkFerV0l6suCF5cCCbH5R2wBRQz2XKfWCpAsLAPOBl7L5Fa0CJC/8ntVT6yVFkfi/YXsfYH02vXp7AFgNRDleHVMkxYGVQ8S3MbUyOfo0WlAqP9RiyzRJHanWdtRCh1ZkbNkePPBDZJ6KUpslVa08vmQ798DGVgFsx8H1ceaV4oGW7tobsr1r2gaIO+/ZmVKLJS0rhNps4IOOjNVGMZeyzy3AfbmiwEGSvisA3APcls0vacUDtq9MTYBcz+Ld1/aUlEL3yh6YM3IA23FV/K1g+Z+BwyVtKlj/IiC6E9Xx039lx6hDyPZM4IsCwFxJcSbkuT+aBlF+75ct3Slp6cgBUvznH++5kuI86Bg1t7JIp9MlbWgFIEHEjSrS6KuS3q9R/izg9cLaeNkdAG8Dp5cEDGKuj0v93NRazPtOkUpPHis1AmAG8DhwxiAUzmX0AmA7aqM3s7onRG8GjpH0zdh7GrcWbcfBEx2yg7sBbgpg+wTgXWDngvyrJUUPdnw0BkjxuyOwELhjCK3FD4HjC8ovkXRXh4e7sWLdntTcfRC4pG5PDx7IC7YQ/Yik60vv6MkDuaAUs4Nqrz8LXFZ5R6TceUNpr1dBhvCDI5LKGmBRtRc60BCqyd3xi+le4JroMks6tZ8w3dazAwmhGpCZkr7clgL9rg8NoF/Fun1+EqBbSw1r36QHhmXZbuX+C/Tasi3fwi5qAAAAAElFTkSuQmCC", ct = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////AAAAVcLTfgAAAAJ0Uk5T/wDltzBKAAAASklEQVR42uzWIQ4AIBTD0HL/S+MQBBI67CZJnu2HIUfBegUFcAAUAAXAAV4A510BBQUFBQrozPiQfaXSxzjIfXBQgpPVn8C2KcAAeAgGb8pOMZIAAAAASUVORK5CYII=", ai = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////AAAAVcLTfgAAAAJ0Uk5T/wDltzBKAAAAcElEQVR42uzWMQrAIBBE0e/9L22XQhTzRy0Etww8lrg6SpHFA99XUAAHQAFQABzgD6BfQ8BmgAOdVnOABph/yABqlVoxnYPtUKIOl4NsDgcnrTdftL3PHtEtMeODbCkqfRgHcR9cKMGV9V4CTVUBBgDLbAYRy/1mvwAAAABJRU5ErkJggg==", ni = {
  __name: "index",
  props: {
    // 模式 live vod websocket webrtc
    mode: {
      type: String,
      default: "live",
      required: !0
    },
    playStreams: {
      type: Object,
      default: () => {
      }
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
      default: !1
    },
    autoplay: {
      type: Boolean,
      default: !0
    },
    // 当前点播/直播的教室类型
    classroomType: {
      type: Number | String,
      default: ""
    },
    // 是否开启弹幕
    isEnableDanmu: {
      type: Boolean,
      default: !1
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
      default: !1
    },
    // 是否启用OCR，默认启用
    isEnableOcr: {
      type: Boolean,
      default: !1
      // 是否展示ocr图片转文字
    },
    // 是否启用菜单栏
    isEnableToolbar: {
      type: Boolean,
      default: !0
    },
    // 是否启用水印
    isEnableWaterMarker: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["ready", "timeupdate", "startControl", "stopControl", "updateChannel"],
  setup(a, { expose: e, emit: i }) {
    const t = a, l = It(), n = l ? l.proxy : null;
    let { isExists: c } = ei(), u = null, { voiceChannel: d } = _t(t.classroomType), o = g(!0), p = g(!1), v = g([]), B = g([]), E = g([]), C = g([]), k = g(""), x = g(0), O = g(0), m = g(!1), I = g(/* @__PURE__ */ new Set([])), q = g(["高清", "标清"]), j = g("高清"), Z = g(["0.5", "1.0", "1.5", "2.0", "5.0"]), w = g(/* @__PURE__ */ new Set([])), U = g("1.0"), J = g(0), mt = g(!1), ve = g(localStorage.getItem("loop") === "true"), Ie = g(!1), Y = g(""), G = g(""), W = g(!1), we = g({}), Be = g(null), X = g(null), z = g(!1), P = g(!1), F = g(!1), ne = g(!1), yt = wt(() => t.width ? {
      width: `${t.width}px`,
      height: `${t.height}px`
    } : {});
    Bt(() => {
      window.addEventListener("resize", de);
    }), Qt(() => {
      ue(), window.removeEventListener("resize", de);
    });
    let Qe = () => f(this, null, function* () {
      if (o.value = !0, v.value.length) {
        let r = JSON.parse(JSON.stringify(v.value));
        r.map((s, h) => s.sceneName = Je(s.name, h)), B.value = r;
        let A = [...B.value].slice(0, 5);
        w.value.size || (w.value = new Set(A.map((s) => s.id))), E.value = A.filter((s) => w.value.has(s.id)), yield be(), yield new Promise((s) => setTimeout(s, 10)), Dt((s) => f(this, null, function* () {
          E.value.map((h, y) => {
            let M = {};
            t.mode === "vod" ? M = new Vt({
              url: h.url,
              id: `#${k.value} #player_item_${y + 1}`,
              index: y,
              count: E.value.length
            }) : t.mode === "live" ? M = new Xt({
              url: h.url,
              id: `#${k.value} #player_item_${y + 1}`,
              index: y,
              count: E.value.length
            }) : t.mode === "websocket" ? M = new Ut({
              url: h.url,
              classroomId: h.id,
              name: h.sceneName,
              id: `#${k.value} #player_item_${y + 1}`,
              index: y,
              count: E.value.length,
              eventBus: K,
              isEnableControl: t.isEnableControl
            }) : t.mode === "webrtc" && (M = new Wt({
              url: h.url,
              name: h.sceneName,
              id: `#${k.value} #player_item_${y + 1}`,
              index: y,
              count: E.value.length
            })), M.id = h.id, M.sceneName = h.sceneName, C.value.push(M);
          }), C.value.map((h) => {
            re(h), h.onLoadFinish = () => {
              console.log("load finish"), re(h), p.value || (De(h), o.value = !1), p.value = !0;
            };
          }), yield Me(), yield new Promise((h) => setTimeout(h, 5e3)), o.value = !1, t.mode === "vod" && !p.value && C.value.length && N();
        }));
      } else
        o.value = !1;
    }), De = (r) => f(this, null, function* () {
      if (yield ke(r), yield b("muted"), x.value && t.mode === "vod" && (yield b("current", x.value)), t.autoplay || ne.value ? yield b("play") : yield b("pause"), t.mode === "vod" && (yield le()), t.autoplay)
        try {
          yield Ye(), console.log("Allow play with voice");
        } catch (A) {
          console.log("Not allow play with voice"), yield b("volume", 0);
        }
      !t.muted && (yield Re()), t.isEnableToolbar && (yield Se()), ne.value = !0, i("ready");
    }), Me = () => {
      C.value.length, u = ti({ eventBus: K, video_player: C.value, playId: k.value }), u.init(), K.on("switch", (r) => {
        T("switch", r);
      }), K.on("maximize", (r) => {
        T("maximize", r);
      }), K.on("dragend", (r) => {
        se(r.target, r.source);
      });
    }, b = (r, A) => {
      C.value.map((s, h) => {
        switch (r) {
          case "play":
            s.isPlaying() || s.play();
            break;
          case "pause":
            s.pause();
            break;
          case "replay":
            s.seek(0), s.play();
            break;
          case "destroy":
            s.release();
            break;
          case "muted":
            I.value.has(s.sceneName) ? s.setVoice(+(J.value / 100)) : s.setVoice(0);
            break;
          case "rate":
            s.setPlaybackRate(+A), U.value !== A && (U.value = A);
            break;
          case "current":
            s.seek(A), x.value = A;
            break;
          case "volume":
            I.value.has(s.sceneName) && s.setVoice(+(A / 100)), J.value = +A;
            break;
        }
      });
    }, ke = (r) => {
      r.onPlayTime = (A) => {
        A && (x.value = A), t.mode === "vod" && i("timeupdate", A);
      }, r.onPlayState = (A) => {
        m.value = A;
      }, r.onPlayFinish = (A) => {
        m.value = !1, ve.value && b("replay");
      }, t.mode === "websocket" && (K.on("startControl", (A) => {
        i("startControl", A);
      }), K.on("stopControl", (A) => {
        i("stopControl", A);
      }));
    }, T = (r, A) => {
      Ee((h, y) => {
        switch (h) {
          case "play":
            xe();
            break;
          case "definition":
            Oe(y);
            break;
          case "muted":
            Le(y);
            break;
          case "loop":
          case "debounce":
          case "optimization":
            localStorage.setItem(h, y);
            break;
          case "fullscreen":
            Ge();
            break;
          case "flip":
            break;
          case "channel":
            ze(y);
            break;
          case "ocr":
            He(y);
            break;
          case "maximize":
            Ae(y), P.value && E.value.length === 2 ? qe(y) : Pe(y);
            break;
          case "screening":
            y === "movie" ? Fe() : y === "pip" ? Te() : y === "multiSplitScreen" && Ne();
            break;
          case "switch":
            let M = E.value.length;
            if (y.target.classList.contains("maximize"))
              return;
            let H = document.querySelector(`#${k.value} #player_item_${M}`);
            M === 2 && y.target.id === "player_item_2" && (H = document.querySelector(`#${k.value} #player_item_1`)), se(y.target, H);
            break;
          default:
            throw new Error("Can not find！");
        }
      }, 10, r, A);
    }, N = (r = 0) => f(this, null, function* () {
      yield ce(), yield new Promise((A) => setTimeout(A, r)), yield Qe();
    }), be = (r) => {
      k.value = `player_list_${Date.now()}-${Math.random().toString(36).substring(2)}`;
    }, Re = (r) => {
      if (C.value.length) {
        let A = [];
        A = C.value.filter((s) => d.value.has(s.sceneName)), !A.length && (A = [C.value.find((s) => s.sceneName === "老师") || C.value.find((s) => s.sceneName === "老师全景") || C.value[C.value.length - 1]]), A.map((s) => T("muted", s));
      }
    }, Se = (r) => {
      t.isEnableWaterMarker && (G.value = `player_wrap_${(/* @__PURE__ */ new Date()).getTime()}`, Y.value = new Ze(G.value));
    }, xe = () => {
      m.value = !m.value, b(m.value ? "play" : "pause");
    }, le = () => f(this, null, function* () {
      C.value.map((r) => {
        var s;
        let A = ((s = r.mediaInfo()) == null ? void 0 : s.duration) / 1e3;
        (!O.value || Number(A) > O.value) && (O.value = A);
      }), O.value || (yield new Promise((r) => setTimeout(r, 500)), le());
    }), Oe = (r) => {
      j.value = r, v.value = t.playStreams[j.value].source || [], N(20);
    }, Le = (r) => {
      I.value.has(r.sceneName) ? I.value.delete(r.sceneName) : I.value.add(r.sceneName), I.value = new Set(I.value), b("muted");
    }, Ge = () => {
      Be.value.handleChange(document.getElementById("video_player")), setTimeout((r) => {
        t.mode === "vod" && X.value._getDistance();
      }, 40);
    }, ze = (r) => {
      w.value.has(r) ? w.value.delete(r) : w.value.add(r), w.value = new Set(w.value), Ke(), N(20);
    }, Ke = (r) => {
      w.value.size > 1 && z.value && (z.value = !1);
    }, He = (r) => {
      let A = C.value.find((s) => s.id === r.id);
      if (t.mode !== "vod") {
        Ae({ target: "" });
        let s = je(r.id);
        s && !s.classList.contains("maximize") && T("maximize", { target: s });
      }
      "startViewTransition" in document ? document.startViewTransition(() => {
        W.value = !0;
      }).ready.then(() => {
        document.querySelector("#ocrDialog").animate(
          [
            {
              top: "60%",
              opacity: 0.5
            },
            {
              top: "50%",
              opacity: 1
            }
          ],
          {
            duration: 200,
            easing: "cubic-bezier(0.42, 0, 0.58, 1)",
            fill: "forwards"
            // 动画结束后保持最后一帧状态
          }
        );
      }) : W.value = !0, setTimeout((s) => {
        var h;
        we.value = {
          item: oe(A),
          id: (h = oe(A)) == null ? void 0 : h.id
        };
      }, 100);
    }, Et = (r) => {
      W.value = !1;
    }, re = (r) => {
      if (r.player)
        try {
          t.mode === "live" ? (r.player.children_[0].id = `video_${r.id}`, r.player.children_[0].classList = ["video__"]) : t.mode === "vod" ? (r.player.id = `video_${r.id}`, r.player.classList = ["video__"]) : t.mode === "websocket" ? (r.player.player.id = `video_${r.id}`, r.player.player.classList = ["video__"]) : t.mode;
        } catch (A) {
        }
    }, qe = (r) => {
      let A = document.querySelector(".two_split_screen"), [s, h] = A.children, { target: y } = r;
      if ([s, h].includes(y)) {
        let M = y === s ? h : s, H = y.classList.contains("pip_sub");
        y.classList.toggle("pip_sub", !H), y.classList.toggle("pip_main", H), M.classList.toggle("pip_sub", H), M.classList.toggle("pip_main", !H);
      }
    }, Pe = (r) => {
      r.target.classList.contains("maximize") ? (r.target.classList.remove("maximize"), r.target.setAttribute("draggable", !0)) : (r.target.classList.add("maximize"), r.target.removeAttribute("draggable"));
    }, Ae = (r) => {
      document.querySelectorAll(".maximize").forEach((A) => A !== r.target ? A.classList.remove("maximize") : "");
    }, Fe = () => {
      if (z.value = !z.value, z.value) {
        let r = c(E.value, "PGM");
        w.value = /* @__PURE__ */ new Set([r.id]);
      } else
        w.value = /* @__PURE__ */ new Set([]);
      N(20);
    }, Te = () => {
      P.value = !P.value;
    }, Ne = () => {
      P.value && (P.value = !1, E.value.length === 2) || (z.value && (z.value = !1), w.value = /* @__PURE__ */ new Set([]), N(20));
    }, se = (r, A) => {
      if (r === A)
        return;
      A.insertBefore(r.firstChild, A.firstChild), r.appendChild(A.childNodes[1]);
      let s = r.getAttribute("title"), h = A.getAttribute("title");
      r.setAttribute("title", h), A.setAttribute("title", s);
    }, je = (r) => {
      var A, s;
      return t.mode === "live" ? (A = document.getElementById(`video_${r}`)) == null ? void 0 : A.parentElement.parentElement : (s = document.getElementById(`video_${r}`)) == null ? void 0 : s.parentElement;
    }, oe = (r) => {
      switch (t.mode) {
        case "vod":
          return r.player;
        case "live":
          return r.player.children_[0];
        case "websocket":
          return r.player.player;
        case "webrtc":
          return r.player;
      }
    }, ce = () => {
      u == null || u.destroy(), K.destroy(), b("destroy"), G.value && (Y.value.destroy(), G.value = ""), p.value = !1, C.value = [], I.value = /* @__PURE__ */ new Set([]);
    }, ue = () => {
      ce(), E.value = [], w.value = /* @__PURE__ */ new Set([]), Ie.value = !1, U.value = "1.0", x.value = 0, O.value = 0, J.value = 70, m.value = !1;
    }, Ct = (r) => {
      (r.key === "Escape" || r.key === "F11") && setTimeout((A) => {
        t.mode === "vod" && X.value._getDistance();
      }, 40);
    }, de = () => {
      Ee((r) => {
        parent.document.webkitIsFullScreen || parent.document.fullscreen || parent.document.mozFullScreen || parent.document.msFullscreenElement, t.mode === "vod" && X.value._getDistance(), G.value && (Y.value.destroy(), G.value = `player_wrap_${(/* @__PURE__ */ new Date()).getTime()}`, Y.value = new Ze(G.value));
      }, 200);
    }, Je = (r, A) => (r || (r = `通道${A + 1}`), r.replace("教师", "老师").toUpperCase()), Ye = (r) => f(this, null, function* () {
      return new Promise((A, s) => {
        let h = new Audio();
        h.src = ii, h.volume = 0.01, h.play().then(() => {
          A(), F.value = !1;
        }).catch(() => {
          s(), F.value = !0;
        });
      });
    }), ft = (r) => f(this, null, function* () {
      F.value = !1, b("volume", 70);
    });
    return he(() => t.playStreams, (r) => {
      if (Ce(r === "object") && Object.keys(r).length) {
        ue(), q.value = Object.keys(r);
        for (let A of q.value) {
          let s = r[A].source;
          if (s && s.length) {
            T("definition", A);
            break;
          }
        }
      }
    }, {
      deep: !0,
      immediate: !0
    }), he(() => w.value, (r) => {
      i("updateChannel", r.size);
    }), he(() => J.value, (r) => {
      r && F.value && (F.value = !1);
    }), e({
      _register_emits: b,
      current: x,
      duration: O
    }), { __sfc: !0, instance: l, _t: n, isExists: c, use_player_emit: u, props: t, emits: i, voiceChannel: d, is_loading: o, is_init: p, fileList: v, fileListCustom: B, resource_list: E, video_player: C, playId: k, current: x, duration: O, play: m, voice: I, definition_list: q, definition: j, rate_list: Z, channel_list: w, rate: U, volume: J, fullscreen_status: mt, loop: ve, flip: Ie, waterMarker: Y, waterMarkerId: G, show_ocr: W, ocr_origin: we, fullscreen: Be, slide: X, isMovieMode: z, isPipMode: P, isShowVolumeTip: F, isDisabledAutoplay: ne, videoPlayerStyle: yt, __init: Qe, initializePlayer: De, _registerDomEvent: Me, _register_emits: b, _listener_emit: ke, handle_click: T, _replyRenderPlayer: N, _setPlayId: be, _handleDefaultVoice: Re, _handleWaterMarker: Se, _play: xe, _get_duration: le, _handleChangeDefinition: Oe, _handleChangeMutedChannel: Le, _handleRequestFullscreen: Ge, _handleChangeChoiceChannel: ze, _handleCancelMovieMode: Ke, _handleShowOcrModel: He, cancelOcrModel: Et, _updateVideoStyle: re, _handleClickPip: qe, _handlerMaximization: Pe, _handleCancelAllMaximization: Ae, _handleChangeScreeningToMovie: Fe, _handleChangeScreeningToPip: Te, _handleChangeScreeningToMultiSplit: Ne, _handleSwitchVideo: se, _getPlayerItemWrap: je, _getVideoDom: oe, _dispose: ce, _reset: ue, _listen_keyup_emits: Ct, _listener_fullscreen_status: de, _filterChannelName: Je, _isAllowPlayByVoice: Ye, handleOpenVoiceByClick: ft, Slide: Ft, common: gt, FullScreen: Yt };
  }
};
var li = function() {
  var e = this, i = e._self._c, t = e._self._setupProxy;
  return i("div", { staticClass: "video_player_pc _flex_center", style: t.videoPlayerStyle, attrs: { id: "video_player" } }, [i("div", { staticClass: "player_wrap", class: { player_wrap_pip: t.isPipMode && t.resource_list.length === 2 }, style: t.resource_list.length === 1 ? { width: "auto", height: "100%" } : {}, attrs: { id: `${t.waterMarkerId}` } }, [t.resource_list.length === 1 ? i("div", { staticClass: "player_list default_screen", attrs: { id: `${t.playId}` } }, [i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, attrs: { id: "player_item_1" } })]) : e._e(), t.resource_list.length === 2 ? i("div", { staticClass: "player_list two_split_screen _flex_item_center", attrs: { id: `${t.playId}` } }, [i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip, pip_main: t.isPipMode }, staticStyle: { width: "50%" }, attrs: { id: "player_item_1" } }), i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip, pip_sub: t.isPipMode }, staticStyle: { width: "50%" }, attrs: { id: "player_item_2" } })]) : e._e(), t.resource_list.length === 3 ? i("div", { staticClass: "player_list _flex_item_center three_split_screen", attrs: { id: `${t.playId}` } }, [i("div", { staticStyle: { width: "50%", height: "100%" } }, [i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, staticStyle: { height: "50%" }, attrs: { id: "player_item_1" } }), i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, staticStyle: { height: "50%" }, attrs: { id: "player_item_2" } })]), i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, staticStyle: { width: "100%" }, attrs: { id: "player_item_3" } })]) : e._e(), t.resource_list.length === 4 ? i("div", { staticClass: "player_list _flex_item_center four_split_screen", attrs: { id: `${t.playId}` } }, [i("div", { staticStyle: { width: "26.6%" } }, [i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, attrs: { id: "player_item_1" } }), i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, attrs: { id: "player_item_2" } }), i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, attrs: { id: "player_item_3" } })]), i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, attrs: { id: "player_item_4" } })]) : e._e(), t.resource_list.length === 5 ? i("div", { staticClass: "player_list _flex_item_center five_split_screen", attrs: { id: `${t.playId}` } }, [i("div", { staticStyle: { width: "25%" } }, [i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, attrs: { id: "player_item_1" } }), i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, attrs: { id: "player_item_2" } }), i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, attrs: { id: "player_item_3" } }), i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, attrs: { id: "player_item_4" } })]), i("div", { staticClass: "player_item _flex_item_center", class: { flip: t.flip }, staticStyle: { width: "100%" }, attrs: { id: "player_item_5" } })]) : e._e(), t.is_init ? e._e() : i("div", { staticClass: "loading _flex_center" }, [i("img", { attrs: { src: ae, alt: "" } })])]), e.isEnableToolbar ? i("footer", { style: t.is_loading ? { pointerEvents: "none" } : {} }, [e.mode === "vod" ? i(t.Slide, { ref: "slide", attrs: { duration: +t.duration, mark: e.noteList }, on: { update: (l) => t._register_emits("current", l) }, model: { value: t.current, callback: function(l) {
    t.current = l;
  }, expression: "current" } }) : e._e(), i("div", { staticClass: "toolbar _flex_item_center" }, [i("div", { staticClass: "playing _flex_center", on: { click: function(l) {
    return t.handle_click("play");
  } } }, [i("i", { class: `iconfont ${t.play ? "icon-24gf-pause2" : "icon-24gf-play"}` })]), i("div", { staticClass: "time" }, [e._v(" " + e._s(t.common.filterTime(t.current, 1)) + " "), e.mode === "vod" ? i("span", { staticStyle: { "font-weight": "bold" } }, [e._v("  /  " + e._s(t.common.filterTime(t.duration, 1)) + " ")]) : e._e()]), i("el-popover", { staticStyle: { "margin-left": "auto" }, attrs: { placement: "top", "append-to-body": !1, "popper-options": { boundariesElement: ".toolbar", removeOnDestroy: !1 }, width: "50px", "popper-class": "popper_custom", trigger: "hover" } }, [i("div", { staticClass: "select_list mode_list" }, [i("div", { staticClass: "item _flex_center", class: { active: t.isMovieMode }, attrs: { disabled: !t.isExists(t.resource_list, "PGM") }, on: { click: function(l) {
    return t.handle_click("screening", "movie");
  } } }, [i("i", { staticClass: "iconfont icon--" }), i("span", [e._v("电影模式")])]), i("div", { staticClass: "item _flex_center", class: { active: t.isPipMode }, attrs: { disabled: t.resource_list.length !== 2 }, on: { click: function(l) {
    return t.handle_click("screening", "pip");
  } } }, [i("i", { staticClass: "iconfont icon-btn_trophy_defaultbeifen" }), i("span", [e._v("画中画")])]), i("div", { staticClass: "item _flex_center", class: { active: !t.isMovieMode && !t.isPipMode }, on: { click: function(l) {
    return t.handle_click("screening", "multiSplitScreen");
  } } }, [i("i", { staticClass: "iconfont icon-erjicaidan--duopingmu" }), i("span", [e._v("多分屏")])])]), i("div", { staticClass: "definition mode _flex_center", attrs: { slot: "reference" }, slot: "reference" }, [i("span", [e._v(e._s(t.isMovieMode ? "电影模式" : t.isPipMode ? "画中画" : "多分屏"))])])]), e.isEnableOcr ? i("el-popover", { attrs: { placement: "top", width: "50px", "append-to-body": !1, "popper-options": { boundariesElement: ".toolbar", removeOnDestroy: !1 }, "popper-class": "popper_custom", trigger: "hover" } }, [i("div", { staticClass: "select_list ocr_list" }, e._l(t.resource_list, function(l, n) {
    return i("div", { key: n, staticClass: "item _flex_center", attrs: { disabled: e.muted }, on: { click: function(c) {
      return t.handle_click("ocr", l);
    } } }, [i("i", { staticClass: "iconfont icon-ocr" }), i("span", [e._v(e._s(l.sceneName))])]);
  }), 0), i("div", { staticClass: "definition _flex_center", attrs: { slot: "reference" }, slot: "reference" }, [i("span", [e._v("OCR")])])]) : e._e(), i("el-popover", { attrs: { placement: "top", width: "50px", "append-to-body": !1, "popper-options": { boundariesElement: ".toolbar", removeOnDestroy: !1 }, "popper-class": "popper_custom", trigger: "hover" } }, [i("div", { staticClass: "select_list" }, e._l(t.definition_list, function(l) {
    return i("div", { staticClass: "item _flex_center", class: { active: t.definition === l }, on: { click: function(n) {
      return t.handle_click("definition", l);
    } } }, [i("span", [e._v(e._s(l))])]);
  }), 0), i("div", { staticClass: "definition _flex_center", attrs: { slot: "reference" }, slot: "reference" }, [i("span", [e._v(e._s(t.definition))])])]), e.mode === "vod" ? i("el-popover", { attrs: { placement: "top", width: "50px", "append-to-body": !1, "popper-options": { boundariesElement: ".toolbar", removeOnDestroy: !1 }, "popper-class": "popper_custom popper_custom_rate", trigger: "hover" } }, [i("div", { staticClass: "select_list" }, e._l(t.rate_list, function(l, n) {
    return i("div", { key: n, staticClass: "item _flex_center", class: { active: t.rate === l }, on: { click: function(c) {
      return t._register_emits("rate", l);
    } } }, [i("span", [e._v(e._s(l) + "x")])]);
  }), 0), i("div", { staticClass: "rate _flex_center", attrs: { slot: "reference" }, slot: "reference" }, [i("span", [e._v(e._s(t.rate) + "x")])])]) : e._e(), i("el-popover", { attrs: { placement: "top", width: "50px", "append-to-body": !1, "popper-options": { boundariesElement: ".toolbar", removeOnDestroy: !1 }, "popper-class": "popper_custom popper_custom_voice", trigger: "hover" } }, [i("div", { staticClass: "select_list channel_list" }, e._l(t.fileListCustom, function(l, n) {
    return i("div", { key: n, staticClass: "item _flex_center", class: { active: t.channel_list.has(l.id) }, on: { click: function(c) {
      return t.handle_click("channel", l.id);
    } } }, [i("i", { class: `iconfont ${t.channel_list.has(l.id) ? "icon-xianshikejian" : "icon-yincangbukejian"}` }), i("span", [e._v(e._s(l.sceneName))])]);
  }), 0), i("div", { staticClass: "channel _flex_center", attrs: { slot: "reference" }, slot: "reference" }, [i("i", { staticClass: "iconfont icon-tuwenliebiao" })])]), i("el-popover", { attrs: { placement: "top", width: "80px", "append-to-body": !1, "popper-options": { boundariesElement: ".toolbar", removeOnDestroy: !1 }, "popper-class": "popper_custom popper_custom_voice", trigger: "hover" } }, [i("div", { staticClass: "select_list voice_list" }, e._l(t.resource_list, function(l, n) {
    return i("div", { key: n, staticClass: "item _flex_center", class: { active: t.voice.has(l.sceneName) }, attrs: { disabled: e.muted }, on: { click: function(c) {
      return t.handle_click("muted", l);
    } } }, [t.voice.has(l.sceneName) ? i("img", { attrs: { src: ot, alt: "" } }) : i("img", { attrs: { src: ct, alt: "" } }), i("span", [e._v(e._s(l.sceneName))])]);
  }), 0), i("div", { staticClass: "channel _flex_center", attrs: { slot: "reference" }, slot: "reference" }, [i("i", { staticClass: "iconfont icon-yinpinliebiao" })])]), i("el-popover", { attrs: { placement: "top", width: "160px", "append-to-body": !1, "popper-options": { boundariesElement: ".toolbar", removeOnDestroy: !1 }, trigger: "manual", "popper-class": "popper_custom popper_custom_voice" }, model: { value: t.isShowVolumeTip, callback: function(l) {
    t.isShowVolumeTip = l;
  }, expression: "isShowVolumeTip" } }, [i("div", { staticStyle: { padding: "0.03rem" } }, [i("span", { staticStyle: { color: "white" } }, [e._v("检测到声音未开启！")]), i("br"), i("el-button", { staticStyle: { "margin-top": "0.07rem" }, attrs: { type: "primary", size: "mini" }, on: { click: t.handleOpenVoiceByClick } }, [e._v("点击开启")])], 1), i("div", { staticClass: "voice _flex_item_center", attrs: { slot: "reference" }, slot: "reference" }, [i("div", { staticClass: "voice_btn _flex_center", on: { click: function(l) {
    return t._register_emits("volume", t.volume ? 0 : 70);
  } } }, [t.volume === 0 ? i("img", { attrs: { src: ct, alt: "" } }) : t.volume >= 50 ? i("img", { attrs: { src: ot, alt: "" } }) : t.volume > 0 ? i("img", { attrs: { src: ai, alt: "" } }) : e._e()]), i("div", { staticClass: "voice_slide" }, [i("el-slider", { staticStyle: { width: "100%" }, attrs: { min: 0, max: 100 }, on: { change: function(l) {
    return t._register_emits("volume", t.volume);
  } }, model: { value: t.volume, callback: function(l) {
    t.volume = l;
  }, expression: "volume" } })], 1)])]), i(t.FullScreen, { ref: "fullscreen", attrs: { type: 1 }, model: { value: t.fullscreen_status, callback: function(l) {
    t.fullscreen_status = l;
  }, expression: "fullscreen_status" } }, [i("div", { staticClass: "full _flex_center", on: { click: function(l) {
    return t.handle_click("fullscreen");
  } } }, [t.fullscreen_status ? i("i", { staticClass: "iconfont icon-quxiaoquanping" }) : i("i", { staticClass: "iconfont icon-quanping1" })])])], 1)], 1) : e._e()]);
}, ri = [], Ai = /* @__PURE__ */ fe(
  ni,
  li,
  ri,
  !1,
  null,
  "6ce94c0b"
);
const si = Ai.exports, mi = (a, e) => {
  a.component("VueMultiSplitPlayer", si);
};
export {
  si as VueMultiSplitPlayer,
  mi as install
};
//# sourceMappingURL=vue-multi-split-player.es.js.map
