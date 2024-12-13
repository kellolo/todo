import { useAuthStore } from '@/store'
import type { AuthData } from '@/types'
export const login = async (data: AuthData) => {
  const authStore = useAuthStore()
  try {
    const succeed = await authStore.login(data)
    return succeed
  } catch (err) {
    throw err
  }
}
