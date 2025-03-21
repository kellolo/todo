import type { SetOptional } from 'frontend/src/shared'

export type Todo = {
  id: string
  date: string
  value: string
  status: boolean
}

export type LocalTodo = SetOptional<Todo, 'id'>
