import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { LocalTodo } from '../types'

const testItems: LocalTodo[] = [
  {
    id: '1',
    value: 'Lol kek ogurtchik',
    date: new Date().toLocaleDateString(),
    status: false,
  },
  {
    id: '2',
    value: 'Lol kek ogurtchik kekeke',
    date: new Date().toLocaleDateString(),
    status: true,
  },
  {
    id: '3',
    value: 'OMG WTF?! Ogurtchik??? kekeke, lold',
    date: new Date().toLocaleDateString(),
    status: false,
  },
]

export const useAppTodoStore = defineStore('appTodo', () => {
  const items = ref<LocalTodo[]>(testItems)

  async function addToDo(value: string) {
    try {
      //api
    } catch (err) {
      console.warn(err)
      throw err
    }
  }

  async function changeTodo(item: { id: string; value: string }) {
    try {
      //api
    } catch (err) {
      console.warn(err)
      throw err
    }
  }
  return {
    items,
    addToDo,
    changeTodo,
  }
})
