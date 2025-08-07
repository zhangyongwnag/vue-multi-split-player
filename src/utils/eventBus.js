class EventBus {
  constructor() {
    this.eventTarget = new EventTarget();
    this.eventHandlers = new Map([])
  }

  // 监听事件
  on(eventName, callback) {
    let cb = e => callback(e.detail)
    this.eventTarget.addEventListener(eventName, cb);
    this.eventHandlers.set(eventName, cb)
  }

  // 触发事件
  emit(eventName, data) {
    let event = new CustomEvent(eventName, { detail: data });
    this.eventTarget.dispatchEvent(event);
  }

  // 移除事件监听
  off(eventName) {
    let callback = this.eventHandlers.get(eventName);
    if (callback) {
      this.eventTarget.removeEventListener(eventName, callback);
      this.eventHandlers.delete(eventName);
    }
  }

  destroy() {
    let eventNames = Array.from(this.eventHandlers.keys()); // 获取所有事件名称
    eventNames.forEach(eventName => this.off(eventName));
  }
}

// 创建全局实例
const eventBus = new EventBus();

export default eventBus;
