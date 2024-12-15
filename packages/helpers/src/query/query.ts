import type { QueryAsyncItem } from './types'

/**
 * Executes an asynchronous request from a `QueryAsyncItem`, and handles the result or failure.
 *
 * @param item - A `QueryAsyncItem` object containing the asynchronous request (`req`) and an optional callback (`callback`) to be called once the request is complete.
 *
 * @throws {Error} - Will throw an error if the asynchronous request fails.
 */
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

/**
 * Executes an array of asynchronous queries sequentially.
 *
 * Each query is executed in the order they appear in the `items` array.
 * If any query fails, the execution will stop and throw an error.
 *
 * @param items - An array of `QueryAsyncItem` objects, each containing a request function (`req`) and an optional callback (`callback`).
 *
 * @throws {Error} - Will throw an error if any of the asynchronous requests fail.
 */
export const exeQuery = async (items: QueryAsyncItem[]) => {
  for (const item of items) {
    await getAsyncFunction(item)
  }
}
