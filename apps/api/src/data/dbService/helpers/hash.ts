import { createHash } from 'crypto'
import { sortCollectionByCreated } from './sortCollectionByCreated'

import type { BaseSchema } from '../collection.types'

export const hashArray = (dataArray: BaseSchema[]): string => {
  const sortedItems = sortCollectionByCreated(dataArray)
  const jsonString = JSON.stringify(sortedItems, null, 2)
  return createHash('sha256').update(jsonString).digest('hex')
}
