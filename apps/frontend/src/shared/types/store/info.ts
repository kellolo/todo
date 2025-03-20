export type Severity = 'success' | 'info' | 'error'

export type ToastItem = {
  severity: Severity
  summary: string
  detail: string
  life?: number
}
