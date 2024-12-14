import type { QueryAsyncItem } from './types'

const getAsyncFunction = async (item: QueryAsyncItem) => {
  try {
    await item.req()
  } catch (err) {
    console.warn(`ERROR in QUERY item: ${item.title}`)
    throw err
  } finally {
    if (item.callback) {
      item.callback()
    }
  }
}

export const exeQuery = async (items: QueryAsyncItem[]) => {
  for (const item of items) {
    await getAsyncFunction(item)
  }
}
