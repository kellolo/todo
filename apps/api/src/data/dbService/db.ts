import { sleeper } from '@repo/helpers'
import { CollectionName } from './collection.types'
import { DataHandler } from './utils'

export type BaseStatus = 'active' | 'initializing' | 'error' | 'off'

class DataBase {
  private readonly MAX_INIT_ATTEMPTS = 5
  private readonly MAX_RESTART_ATTEMPTS = 5

  constructor(collections: CollectionName[] = ['auth', 'todo', 'user']) {
    this.collections = collections
    this.autoRestartAttempts = 5
  }
  private collections: CollectionName[]
  private startDBAttempts: number = this.MAX_INIT_ATTEMPTS
  private autoRestartAttempts: number = this.MAX_RESTART_ATTEMPTS
  private dataHandler: DataHandler | null = null
  private baseStatus: BaseStatus = 'off'
  private restartPoling: null | NodeJS.Timeout = null

  public async initialize() {
    const canBeInitedStatuses: BaseStatus[] = ['off', 'error']
    this._clearInterval()
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
    this._clearInterval()
  }

  private async _init() {
    let status: 'failed' | 'wake' = 'failed'
    try {
      do {
        this.startDBAttempts--
        this.dataHandler = new DataHandler(this.collections)
        status = await sleeper(5, 200, () => this._dataHandlerInitialized)

        if (status === 'wake') {
          this.baseStatus = 'active'
          this.autoRestartAttempts = 5
          this.startDBAttempts = 5
          setTimeout(() => {
            this.restartPoling = this._restartPoling()
          }, 5000)
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

  // DB methods for API Services
  public do: ReturnType<typeof this._getMethods> = this._getMethods()

  private _getMethods() {
    const checkCollection = (collection: string) => {
      const check = this.collections.includes(collection as CollectionName)
      if (!check) {
        throw new Error('Invalid collection name')
      }
    }
    return {
      findOne: (collection: CollectionName, payload: any, ...rest: any) =>
        this._findOne(checkCollection, collection, payload, rest),
      findMany: (collection: CollectionName, payload: any, ...rest: any) =>
        this._findMany(checkCollection, collection, payload, rest),
      insert: (collection: CollectionName, payload: any, ...rest: any) =>
        this._insert(checkCollection, collection, payload, rest),
      deleteOne: (collection: CollectionName, payload: any, ...rest: any) =>
        this._deleteMany(checkCollection, collection, payload, rest),
    }
  }

  private async _findOne(
    check: (collection: string) => void,
    collection: CollectionName,
    payload: any,
    ...params: any[]
  ) {
    check(collection)

    try {
      this.dataHandler?.processRequest(collection, 'findOne', payload)
    } catch (err) {
      throw err
    }
  }
  private async _findMany(
    check: (collection: string) => void,
    collection: CollectionName,
    payload: any,
    ...params: any[]
  ) {
    check(collection)
  }
  private async _insert(
    check: (collection: string) => void,
    collection: CollectionName,
    payload: any,
    ...params: any[]
  ) {
    check(collection)
  }
  private async _removeOne(
    check: (collection: string) => void,
    collection: CollectionName,
    payload: any,
    ...params: any[]
  ) {
    check(collection)
  }
  private async _deleteMany(
    check: (collection: string) => void,
    collection: CollectionName,
    payload: any,
    ...params: any[]
  ) {
    check(collection)
  }

  // restart
  private _restartPoling() {
    return setInterval(async () => {
      if (!this.standBy && this.baseStatus !== 'initializing') {
        if (!this.autoRestartAttempts) {
          this.baseStatus = 'error'
          this._clearInterval()
          throw new Error('Could Not AutoRestart DB')
        }
        console.log('Trying to restart DB...:' + --this.autoRestartAttempts)
        await this.initialize()
      }
    }, 5000)
  }

  private _clearInterval() {
    if (this.restartPoling) {
      clearInterval(this.restartPoling)
      this.restartPoling = null
    }
  }
}

export const dataBase = new DataBase()
