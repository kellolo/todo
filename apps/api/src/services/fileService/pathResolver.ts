import path from 'path'

export const pathResolve = (...args: string[]): string =>
  path.resolve(__dirname, '../', 'src', ...args).replace(/\\/g, '/')
