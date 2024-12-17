import { Woker } from '@repo/helpers'
import { errorLogger, pathResolve } from 'src/services'

import { DataHandlerFS, HashHandlerFS } from './components'

import type { BaseSchema, CollectionName } from '../../collection.types'

type Handlers<T> = Record<CollectionName, T>
type Collections = CollectionName[]
type RequestTypes = 'findOne' | 'findMany' | 'insert' | 'insertMany' | 'deleteOne' | 'deleteMany'

class CollectionsService {}

export class DataHandler extends Woker {
  private readonly MAX_INIT_ATTEMPTS = 5

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

  private attemptsToInitiate: number = this.MAX_INIT_ATTEMPTS
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
    this.fileHandlers = null
    this.hashHandlers = null
  }

  // Served methods for DB access
  public async processRequest(collection: CollectionName, reqType: RequestTypes, payload: any) {
    const fileHandler = this.fileHandlers![collection]
    const hashHandler = this.hashHandlers![collection]

    if (!(fileHandler && hashHandler && this.standBy)) {
      throw new Error('DataHandler error: Handlers not initialized or system not ready')
    }

    const requestType = this._defineRequestType(reqType)
    let processingResult = null
    try {
      switch (requestType) {
        case 'single': {
          const result = await this._processSingleRequest(/**something here */)
          processingResult = this._postProcessRequestResult(/**something here */)
          break
        }
        case 'multy': {
          const result = await this._processMultyRequest(/**something here */)
          processingResult = this._postProcessRequestResult(/**something here */)
          break
        }
      }
    } catch (err) {
      throw new Error('DataHandler error: Request processing ERROR')
    }
    return processingResult
  }

  private _postProcessRequestResult(something: any) {
    return //something
  }

  private async _processSingleRequest(something: any) {
    return //something
  }

  private async _processMultyRequest(something: any) {
    return //something
  }

  private _defineRequestType(request: RequestTypes): 'single' | 'multy' {
    return /Many/gi.test(request) ? 'multy' : 'single'
  }
}
