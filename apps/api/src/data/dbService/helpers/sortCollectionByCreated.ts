import type { BaseSchema } from '../collection.types'

export const sortCollectionByCreated = (collection: BaseSchema[]): BaseSchema[] => {
  return [...collection].sort((a, b) => {
    const dateA = new Date(a.created).getTime()
    const dateB = new Date(b.created).getTime()
    return dateA - dateB
  })
}
