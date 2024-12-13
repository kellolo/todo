import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { APIAuthService } from '@/services'

import type { AuthData } from '@/types'

const useAuthStore = defineStore('auth', () => {
  async function login(data: AuthData) {
    try {
      await APIAuthService.login(data)
      return true
    } catch (err) {
      console.warn('auth:login:ERR')
      return false
    }
  }

  return {
    login,
  }
})

export default useAuthStore