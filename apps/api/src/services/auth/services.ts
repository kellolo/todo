import { BaseAPIService } from 'src/services'
import { AUTH__REQUEST__BODY } from 'src/types'

export class AuthService extends BaseAPIService {
  constructor() {
    super('auth')
  }

  public async login(data: AUTH__REQUEST__BODY) {
    return true
  }
}

export const authService = new AuthService()
