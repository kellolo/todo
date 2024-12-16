export type CollectionName = 'auth' | 'user' | 'todo'

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
  login: string
  password: string
}

export type UserCollection = Collection<UserSchema>

export type TodoSchema = BaseSchema & {
  'user:$id': string
  title: string
  status: boolean
}

export type TodoCollection = Collection<TodoSchema>
