export type Severity = 'success' | 'info' | 'error' | 'warn' | 'contrast'

export type ToastItem = {
  severity: Severity
  summary: string
  detail: string
  life?: number
}
