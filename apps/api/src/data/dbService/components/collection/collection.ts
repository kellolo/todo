import uuid from 'uuid'
import { Model } from '../model'
import type { CollectionName } from '../../collection.types'

export class Collection<T> {
  constructor(data: T[], name: CollectionName) {
    this.items = data
    this.keyIds = new Set(data.map(item => (item as { $id: string })['$id']))
    this.idPrefix = name.slice(0, 2)
  }

  private items: T[]
  private keyIds: Set<string>
  private idPrefix: string

  // non-updating .json
  public findOne(key: keyof T, value: string | number): T | null {
    return this.items.find(item => item[key] === value) || null
  }

  public findMany(key: keyof T, value: string | number): T[] {
    return this.items.filter(item => item[key] === value)
  }

  // methods return updated collectons for updating .json
  public insert(data: Omit<T, 'created' | '$id'>): T[] {
    let uniqueId = this._getNewId()
    while (this.keyIds.has(uniqueId)) {
      uniqueId = this._getNewId()
    }
    const item = new Model<T>().create(data, uniqueId)
    this.items.push(item)
    this.keyIds.add(uniqueId)
    return this.items
  }

  public delete($id: string): T[] {
    const index = this.items.findIndex(item => (item as { $id: string })['$id'] === $id)
    if (index === -1) {
      throw new Error('Base Delete: Item not found')
    }
    this.items.splice(index, 1)
    this.keyIds.delete($id)
    return this.items
  }

  // helpers
  private _getNewId(): string {
    return `${this.idPrefix}-${uuid.v4().replace(/-/g, '').slice(0, 8)}`
  }
}
