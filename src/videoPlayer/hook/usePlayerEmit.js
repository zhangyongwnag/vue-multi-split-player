import {debounceBind} from '@/utils/common';

export default function usePlayerEmit(options) {
  let eventBus = options.eventBus
  let videoPlayer = options.video_player
  let playerList = document.querySelector(`#${options.playId}`)
  let clickTimer = null
  let source = null

  let init = () => {
    let _m = videoPlayer.length
    Array.from({length: _m}, (_, index) => {
      let id = `#${options.playId} #player_item_${index + 1}`
      let player = document.querySelector(id)
      // 设置title
      setPlayerTitle(player, index)
      // 设置拖拽
      setPlayerDraggable(player, index)
    })
    // 监听监听DOM事件
    startEventMonitoring()
  }

  // 设置title
  let setPlayerTitle = (player, index) => {
    player.title = videoPlayer[index].sceneName
  }

  // 设置拖拽属性
  let setPlayerDraggable = (player, index) => {
    player.draggable = true
  }

  // 开启事件监听
  let startEventMonitoring = () => {
    if (!playerList) {
      return
    }
    // 监听鼠标点击，利用事件捕获机制
    playerList.addEventListener('click', handleClick, {passive: true})
    // 监听拖拽事件
    playerList.addEventListener('dragstart', handleDragStart, {passive: false})
    playerList.addEventListener('dragenter', handleDragEnter, {passive: false})
    playerList.addEventListener('dragleave', handleDragLeave, {passive: false})
    playerList.addEventListener('dragend', handleDragEnd, {passive: false})
    playerList.addEventListener('dragover', handleDragOver, {passive: false})
    playerList.addEventListener('drop', handleDrop, {passive: false})
  }

  // 结束事件监听
  let stopEventMonitoring = () => {
    if (!playerList) {
      return
    }
    playerList.removeEventListener('click', handleClick, {passive: true})
    playerList.removeEventListener('dragstart', handleDragStart, {passive: false})
    playerList.removeEventListener('dragenter', handleDragEnter, {passive: false})
    playerList.removeEventListener('dragleave', handleDragLeave, {passive: false})
    playerList.removeEventListener('dragend', handleDragEnd, {passive: false})
    playerList.removeEventListener('dragover', handleDragOver, {passive: false})
    playerList.removeEventListener('drop', handleDrop, {passive: false})
  }

  // 处理click单机、双击事件
  let handleClick = (event) => {
    if (clickTimer) {
      clearTimeout(clickTimer)
      clickTimer = null
      eventBus.emit('maximize', event)
      return
    }
    clickTimer = setTimeout(() => {
      clickTimer = null
      eventBus.emit('switch', event)
    }, 200)
  }

  // 处理dragstart事件
  let handleDragStart = (event) => {
    let target = event.target
    if (target.classList.contains('maximize')) {
      return
    }
    target.classList.add('dragstart')
    source = event.target
  }

  // 处理dragenter事件
  let handleDragEnter = (event) => {
    if (!source) {
      return
    }
    if (source === event.target) {
      return;
    }
    event.target.classList.add('dragging')
  }

  // 处理dragleave事件
  let handleDragLeave = (event) => {
    if (!source) {
      return
    }
    if (source === event.target) {
      return;
    }
    event.target.classList.remove('dragging')
  }

  // 处理dragend事件
  let handleDragEnd = (event) => {
    if (!source) {
      return
    }
    event.target.classList.remove('dragstart')
    source = null
  }

  // 处理drop事件
  let handleDrop = (event) => {
    if (!source) {
      return
    }
    event.target.classList.remove('dragging')
    eventBus.emit('dragend', {
      target: source,
      source: event.target
    })
  }

  // 处理dragover事件
  let handleDragOver = (event) => {
    if (!source) {
      return
    }
    event.preventDefault()
  }

  return {
    init,
    destroy: stopEventMonitoring
  }
}
