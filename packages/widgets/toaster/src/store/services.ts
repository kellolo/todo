import { useToasterStore } from './store'
import type { Severity } from '../types'

export const putToast = (severity: Severity, detail: string, summary?: string, life?: number) => {
  const toasterStore = useToasterStore()
  toasterStore.setToast(severity, detail, summary ? summary : severity.charAt(0).toUpperCase(), life)
}
