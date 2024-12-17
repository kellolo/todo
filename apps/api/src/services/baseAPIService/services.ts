import { dataBase } from 'src/data'
import { CollectionName } from 'src/data/dbService/collection.types'
export abstract class BaseAPIService {
  constructor(collection: CollectionName) {
    this.collection = collection
  }

  protected DB: typeof dataBase = dataBase
  protected collection: CollectionName

  public get standBy() {
    return this.DB.standBy
  }
}
