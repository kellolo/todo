import { pathResolve } from 'src/services'

export const dataPathResolve = (name: string, type: 'data' | 'hash') => {
  return pathResolve('data', 'storage', name, type === 'data' ? 'data.json' : 'hash.txt')
}
