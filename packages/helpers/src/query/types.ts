export type QueryAsyncItem = {
  title: string
  req: () => Promise<void>
  callback?: () => void
}
