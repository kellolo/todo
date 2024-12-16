import { FileService, errorLogger } from 'src/services'
import { dataPathResolve } from './helpers'
import { hashArray } from 'src/data/dbService/helpers'
import type { BaseSchema, CollectionName } from 'src/data/dbService/collection.types'

export class HashHandlerFS extends FileService {
  constructor(type: CollectionName) {
    super(dataPathResolve(type, 'hash'), 'txt')
    this._cbAfterInit = this._initDataHandler
  }

  protected hashData: string = ''
  private cryptoHashDataArray: (arr: BaseSchema[]) => string = hashArray
  protected isReady: boolean = false

  protected async _initDataHandler() {
    await this._sleep(10, 10, () => this.standBy)

    try {
      this.isReady = this.wokerStatus
    } catch (err) {
      this._handleError('err INIT HASH_HANDLER')
      throw err
    }
  }

  private _handleError(msg: string) {
    errorLogger.log(`ERR: DB: HashHandlerFS: ${msg}`)
  }

  public checkDataChange(arr: BaseSchema[]): 'no-changes' | 'updated' {
    const hashArray = this.cryptoHashDataArray(arr)
    if (hashArray !== this.hashData) {
      this.hashData = hashArray
      this.writeFile(hashArray)
      return 'updated'
    }
    return 'no-changes'
  }
}
