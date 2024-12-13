import type { ToastItem, Severity } from '../types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useToasterStore = defineStore('toaster', () => {
  const alert = ref<ToastItem | null>(null)
  const timeStamp = ref<number>()

  const setToast = (severity: Severity, detail: string, summary = '', life?: number) => {
    alert.value = !life
      ? {
          severity,
          detail,
          summary,
        }
      : {
          severity,
          detail,
          summary,
          life,
        }

    timeStamp.value = Date.now()
    setTimeout(() => {
      _clear()
    }, 1000)
  }

  const _clear = () => {
    alert.value = null
  }

  return {
    alert,
    timeStamp,
    setToast,
  }
})
