import { Woker } from '@repo/helpers'
import { errorLogger, pathResolve } from 'src/services'

import { DataHandlerFS, HashHandlerFS } from './components'

import type { BaseSchema, CollectionName } from '../../collection.types'

type Handlers<T> = Record<CollectionName, T>
type Collections = CollectionName[]

export class DataHandler extends Woker {
  constructor(collections: Collections = ['auth', 'todo', 'user']) {
    super()
    this.collectionNames = collections
    this._init()
  }

  private async _init() {
    this.inited = false
    while (this.attemptsToInitiate > 0 && !this.standBy) {
      try {
        this.fileHandlers = (await this._getFSHandlers('data')) as Handlers<DataHandlerFS>
        this.hashHandlers = (await this._getFSHandlers('hash')) as Handlers<HashHandlerFS>
        await this._sleep(10, 100, () => this.handlersStandBy)
        break
      } catch (err) {
        errorLogger.log('ERR: DB: DATAHANDLER INIT')
        this.attemptsToInitiate--
        if (this.attemptsToInitiate === 0) {
          errorLogger.log('Failed to initiate DataHandler')
          throw err
        }
      }
    }
    this.inited = true
  }

  private attemptsToInitiate: number = 5
  private inited: boolean = false
  private collectionNames: Collections
  private fileHandlers: Handlers<DataHandlerFS> | null = null
  private hashHandlers: Handlers<HashHandlerFS> | null = null

  private _getFSHandlers = async (type: 'data' | 'hash'): Promise<Handlers<DataHandlerFS | HashHandlerFS>> => {
    try {
      const handlers: Handlers<DataHandlerFS | HashHandlerFS> = {} as Handlers<DataHandlerFS | HashHandlerFS>

      const handlersInitQuery = this.collectionNames.map(async name => {
        handlers[name] = type === 'data' ? new DataHandlerFS(name) : new HashHandlerFS(name)
      })
      // console.log(handlers, handlersInitQuery)
      await Promise.all(handlersInitQuery)

      return handlers
    } catch (err) {
      this._nullHandlers(type)
      throw new Error(`DATAHANDLER:ERR:(${type}):INIT`)
    } finally {
    }
  }

  private get handlersStandBy(): boolean {
    return Boolean(this.fileHandlers && this.hashHandlers)
  }

  private _nullHandlers(type: 'data' | 'hash') {
    switch (type) {
      case 'data': {
        this.fileHandlers = null
        break
      }
      case 'hash': {
        this.hashHandlers = null
        break
      }
    }
  }

  public get standBy(): boolean {
    return this.inited && this.handlersStandBy && this.wokerStatus
  }

  public async checkDataChanges(
    collection: CollectionName,
    data: BaseSchema[]
  ): Promise<boolean | ('no-changes' | 'updated')> {
    if (!this.handlersStandBy) return false
    return this.hashHandlers ? await this.hashHandlers[collection]?.checkDataChange(data) : false
  }

  public destroy() {
    this.ready = false
    this.fileHandlers = null
    this.hashHandlers = null
  }
}
