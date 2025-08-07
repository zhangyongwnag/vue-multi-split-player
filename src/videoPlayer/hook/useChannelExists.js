import { typeDetection } from '@/utils/common'

export default function useChannelExists() {
  // 检测是否包含某个通道
  let isExists = (list, name) => {
    if (typeDetection(list) !== 'array') {
      return false
    }
    return list.find(item => item.sceneName === name)
  }
  return {
    isExists
  }
}
