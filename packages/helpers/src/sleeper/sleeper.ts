/**
 * Sleep until the condition in the callback becomes true or the maximum retry count is reached.
 *
 * @param maxRepeats - Maximum number of attempts to check the condition (retries).
 * @param timeout - Timeout in milliseconds between each retry.
 * @param cb - A callback 'reactive' function that should return a boolean value. The function will return `true` when the condition is met, triggering the wake-up.
 *
 * @returns 'wake' if the condition is met within the given retries, 'failed' if the maximum retries are reached.
 */
export const sleeper = async (
  maxRepeats: number = 10,
  timeout: number = 100,
  cb: () => boolean
): Promise<'wake' | 'failed'> => {
  let retries = 0

  while (retries < maxRepeats) {
    if (cb()) {
      return 'wake'
    }

    retries++
    await new Promise(resolve => setTimeout(resolve, timeout))
  }

  return 'failed'
}
