import {
  SCHEMA,
  CollectionServiceCollectionsMap,
  CollectionName,
  AuthSchema,
  TodoSchema,
  UserSchema,
  SingleCollectionSchema,
} from 'src/data/dbService/collection.types'
import { Collection } from 'src/data/dbService/components/'

type CollectionConfig<T extends SCHEMA> = (data: T[], name: CollectionName) => Collection<T>

export class CollectionsService {
  private readonly COLLECTIONS_CONFIG: {
    auth: CollectionConfig<AuthSchema>
    todo: CollectionConfig<TodoSchema>
    user: CollectionConfig<UserSchema>
  } = {
    auth: (data: SingleCollectionSchema<AuthSchema>) => new Collection<AuthSchema>(data, 'auth'),
    todo: (data: SingleCollectionSchema<TodoSchema>) => new Collection<TodoSchema>(data, 'todo'),
    user: (data: SingleCollectionSchema<UserSchema>) => new Collection<UserSchema>(data, 'user'),
  }

  constructor(
    collections: CollectionName[],
    protected dataHandlersStoreData: CollectionServiceCollectionsMap
  ) {
    this.collections = this._initCollections(collections)
  }

  public collections: Record<CollectionName, Collection<SCHEMA>> | null = null

  private _initCollections(collections: CollectionName[]): Record<CollectionName, Collection<SCHEMA>> {
    const unknownCollections = this._getUnknownCollections(collections)
    if (unknownCollections.length) {
      throw new Error('Err: Collections Service. Unknown collection names: ' + unknownCollections.join(', '))
    }

    return collections.reduce(
      (acc, key: CollectionName) => {
        acc[key] = this.COLLECTIONS_CONFIG[key](this.dataHandlersStoreData[key], key)
        return acc
      },
      {} as Record<CollectionName, Collection<SCHEMA>>
    )
  }

  private get knownCollections(): Set<string> {
    return new Set(Object.keys(this.COLLECTIONS_CONFIG))
  }

  private _getUnknownCollections(arr: string[]): string[] {
    return arr.filter((col: string) => !this.knownCollections.has(col))
  }
}
