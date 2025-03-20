export type CollectionName = 'auth' | 'user' | 'todo'
export type SCHEMA = AuthSchema | TodoSchema | UserSchema // common extendable type

export type SingleCollectionSchema<T extends SCHEMA> = T[] // data array from dataHandlers
/**
 * $ - key
 * _ - uniq
 * : - 1 to 1
 * :: - 1 to many
 * ::: - many to many
 */

export type BaseSchema<T> = {
  $id: string
  created: string // ISO Date
  updated?: string // ISO Date
} & T

type Collection<T> = BaseSchema<T>[]

export type AuthSchema = BaseSchema<{
  'user:$id': string
  token: string
  timestamp: number // Date.now()
}>

export type AuthCollection = Collection<AuthSchema>

export type UserSchema = BaseSchema<{
  _login: string
  password: string
  'todo::$id': string[]
}>

export type UserCollection = Collection<UserSchema>

export type TodoSchema = BaseSchema<{
  'user:$id': string
  title: string
  status: boolean
}>

export type TodoCollection = Collection<TodoSchema>

export type CollectionServiceCollectionsMap = {
  auth: SingleCollectionSchema<AuthSchema>
  user: SingleCollectionSchema<UserSchema>
  todo: SingleCollectionSchema<TodoSchema>
}
