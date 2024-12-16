import { FileService, errorLogger } from 'src/services'
import { dataPathResolve } from './helpers'

import type { BaseSchema, CollectionName } from '../../../collection.types'

export class DataHandlerFS extends FileService {
  constructor(type: CollectionName) {
    super(dataPathResolve(type, 'data'), 'json')
    this._cbAfterInit = this._initDataHandler
  }

  protected async _initDataHandler() {
    await this._sleep(10, 10, () => this.standBy)

    try {
      this.storageData = await this.readCollection()
      this.isReady = this.wokerStatus
      console.log('DataHandler: ', this.isReady)
    } catch (err) {
      this._handleError('err INIT DATA_HANDLER')
      throw err
    }
  }

  protected storageData: BaseSchema[] = []
  protected isReady: boolean = false

  public async reWriteCollection(content: string) {
    return this.writeFile(content)
  }

  public async readCollection(): Promise<BaseSchema[]> {
    return this._readJSON(await this.readFile())
  }

  static createDataHandler(type: CollectionName) {
    return new DataHandlerFS(type)
  }

  private _handleError(msg: string) {
    errorLogger.log(`ERR: DB: DataHandlerFS: ${msg}`)
  }
}
