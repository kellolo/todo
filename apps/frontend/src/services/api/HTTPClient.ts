import ky, { type KyInstance } from 'ky'
import { cookiesHandler } from './cookie'
import type { Headers } from '@/types'
import { DEFAULT_HEADERS } from './assets'

export class HTTPClient {
  private headers: Headers = { ...DEFAULT_HEADERS }
  private instanceCache!: KyInstance

  constructor() {
    this.updateInstance()
  }

  private updateInstance() {
    this.instanceCache = ky.create({
      headers: this.headers,
    })
  }

  private get token() {
    return cookiesHandler.get()
  }

  public setToken(token: string) {
    cookiesHandler.set(token)
  }

  public removeToken() {
    cookiesHandler.remove()
    delete this.headers.Authorization
    this.updateInstance()
  }

  public getInstance(): KyInstance {
    const token = this.token

    if (this.updateTrigger) {
      this.headers.Authorization = `Bearer ${token}`
      this.updateInstance()
    }

    return this.instanceCache
  }

  private get updateTrigger() {
    const {
      token,
      headers: { Authorization = null },
    } = this
    return (token && Authorization !== `Bearer ${token}`) || (!token && Boolean(Authorization))
  }
}
