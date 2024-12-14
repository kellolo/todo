import {} from 'src/services'
import { CollectionName } from './collection.types'
import { exeQuery } from '@repo/helpers'

class DataBase {
  constructor() {
    this.collections = ['auth', 'todo', 'user']
    this._init()
  }
  private collections: CollectionName[]

  private async _init() {}
  private async _setCollections() {}
  private async _createCollection() {}

  private get isReady() {}

  private async _checkStorages() {}
}

export const dataBase = new DataBase()
