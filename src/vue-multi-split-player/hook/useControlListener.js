import { ref, computed, watch, getCurrentInstance, onMounted } from 'vue';
import { debounceBind } from '@/utils/common';

export default function useControlListener(eventBus) {
  let el = ref(null)
  let classroomId = ref(null)
  let delay = 0.2 // 防抖时间

  // 开启事件监听
  let startEventMonitoring = (el, id) => {
    el.value = el
    classroomId.value = id

    if (el.value) {
      // 监听事件
      el.value?.addEventListener('click', handleEvent)
      el.value?.addEventListener('dblclick', handleEvent)
      el.value?.addEventListener('mousedown', debounceBind(handleMousedown, delay * 1000))
      el.value?.addEventListener('mouseup', debounceBind(handleMouseup, delay * 1000))
    }
  }

  // 处理dblclick事件
  let handleEvent = event => {
    event.stopPropagation()
  }

  // 结束事件监听
  let stopEventMonitoring = () => {
    // 监听事件
    el.value?.removeEventListener('click', handleEvent)
    el.value?.removeEventListener('dblclick', handleEvent)
    el.value?.removeEventListener('mousedown', debounceBind(handleMousedown, delay * 1000))
    el.value?.removeEventListener('mouseup', debounceBind(handleMouseup, delay * 1000))
  }

  // 处理mousedown事件
  let handleMousedown = (event) => {
    event.stopPropagation()
    let target = event.target
    if (!target.getAttribute('data-type')) {
      return
    }
    eventBus.emit('startControl', {
      id: classroomId.value,
      type: target.getAttribute('data-type')
    })
  }

  // 处理mouseup事件
  let handleMouseup = (event) => {
    event.stopPropagation()
    let target = event.target
    if (!target.getAttribute('data-type')) {
      return
    }
    eventBus.emit('stopControl', {
      id: classroomId.value,
      type: target.getAttribute('data-type')
    })
  }

  return {
    startEventMonitoring,
    stopEventMonitoring
  }
}
