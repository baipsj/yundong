// PWA服务工作者注册
import { registerSW } from 'virtual:pwa-register'

// 注册服务工作者
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('发现新版本，是否立即更新？')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('应用已可离线使用')
  },
  onRegistered(r) {
    console.log('PWA已注册:', r)
  },
  onRegisterError(error) {
    console.log('PWA注册失败:', error)
  },
})

export { updateSW }