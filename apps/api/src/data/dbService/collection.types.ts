export type CollectionName = 'auth' | 'user' | 'todo'
export type SCHEMAS = AuthSchema | TodoSchema | UserSchema
/**
 * $ - key
 * _ - uniq
 * : - 1 to 1
 * :: - 1 to many
 * ::: - many to many
 */

export type BaseSchema = {
  $id: string
  created: string // ISO Date
  updated?: string // ISO Date
}

type Collection<T> = T[]

export type AuthSchema = BaseSchema & {
  'user:$id': string
  token: string
  timestamp: number // Date.now()
}

export type AuthCollection = Collection<AuthSchema>

export type UserSchema = BaseSchema & {
  _login: string
  password: string
  'todo::$id': string[]
}

export type UserCollection = Collection<UserSchema>

export type TodoSchema = BaseSchema & {
  'user:$id': string
  title: string
  status: boolean
}

export type TodoCollection = Collection<TodoSchema>
