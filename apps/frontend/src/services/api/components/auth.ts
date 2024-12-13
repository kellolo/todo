import type { AuthData } from '@/types'
import { APIService } from '../api'
import { putToast } from '@repo/widgets'

class APIAuth extends APIService<{}> {
  constructor() {
    super('/auth')
  }

  async login(data: AuthData) {
    try {
      const response = await this.post('/', data)
      if (response?.token) {
        this.instance.setToken(response.token)
      }
      return response
    } catch (err) {
      putToast('error', 'Auth error', 'Oooooooops', 3000)
      // ('error', 'Auth error', 'Oooooooops', 3000)
      throw err
    }
  }
}

export const APIAuthService = new APIAuth()
