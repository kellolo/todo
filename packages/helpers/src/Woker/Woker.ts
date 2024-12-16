import { sleeper } from '../sleeper'

export abstract class Woker {
  private sleeping: boolean = false
  private sleepingResult: null | 'wake' | 'failed' = null

  protected async _sleep(maxRepeats = 20, timeout = 100, cb: () => boolean) {
    this.sleeping = true
    this.sleepingResult = await sleeper(maxRepeats, timeout, cb)
    this.sleeping = false
  }

  protected get wokerStatus() {
    const status = !this.sleeping && (this.sleepingResult === 'wake' || this.sleepingResult === null)
    return status
  }
}
