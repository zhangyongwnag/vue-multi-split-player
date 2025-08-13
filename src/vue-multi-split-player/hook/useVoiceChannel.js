import { ref, computed, watch, getCurrentInstance, onMounted } from 'vue';
import { filterVoiceConfigId } from '@/utils/common'

export default function useVoiceChannel(classroomType, voiceConfig) {
  let type = classroomType
  type ??= ''
  let voiceChannel = ref(new Set([]))
  if (type !== '' && voiceConfig.length) {
    let _v = String(voiceConfig.find(item => item.id === type)?.value)

    if (_v) {
      voiceChannel.value = filterVoiceConfigId(_v)
    }
  }

  return {
    voiceChannel
  }
}
