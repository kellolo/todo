import { sleeper } from '@repo/helpers'
import { CollectionName } from './collection.types'
import { DataHandler } from './utils'

export type BaseStatus = 'active' | 'initializing' | 'error' | 'off'

class DataBase {
  constructor(collections: CollectionName[] = ['auth', 'todo', 'user']) {
    this.collections = collections
  }
  private collections: CollectionName[]
  private startDBAttempts: number = 5
  private dataHandler: DataHandler | null = null
  private baseStatus: BaseStatus = 'off'

  public async initialize() {
    const canBeInitedStatuses: BaseStatus[] = ['off', 'error']
    try {
      if (canBeInitedStatuses.includes(this.baseStatus)) {
        this.baseStatus = 'initializing'
        await this._init()
        return this.baseStatus
      }
    } finally {
      console.log('DB status: ' + this.baseStatus)
    }
  }

  public off() {
    this.baseStatus = 'off'
    this.dataHandler?.destroy()
    this.dataHandler = null
  }

  private async _init() {
    let status: 'failed' | 'wake' = 'failed'
    try {
      do {
        this.startDBAttempts--
        this.dataHandler = new DataHandler(this.collections)
        status = await sleeper(5, 200, () => this._dataHandlerInitialized)
        // console.log(this._dataHandlerInitialized)
        if (status === 'wake') {
          this.baseStatus = 'active'
          break
        }
      } while (this.startDBAttempts)
    } catch (err) {
      this.baseStatus = 'error'
      throw err
    } finally {
      if (status !== 'wake') {
        console.log(this.baseStatus)
        throw new Error('Failed initialize DB')
      } else {
        return status === 'wake'
      }
    }
  }
  // private async _setCollections() {}
  // private async _createCollection() {}

  // private async _checkStorages() {}
  private get _dataHandlerInitialized(): boolean {
    return Boolean(this.dataHandler?.standBy)
  }
  public get standBy() {
    const status = this.baseStatus === 'active'
    return Boolean(this.dataHandler?.standBy && status)
  }
}

export const dataBase = new DataBase()
