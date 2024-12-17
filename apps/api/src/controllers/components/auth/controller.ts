import { BaseController } from 'src/controllers/baseController'
import { authService } from 'src/services'
import { AUTH__REQUEST__BODY } from 'src/types'

class AuthController extends BaseController {
  constructor() {
    super('auth_controller')
  }

  private authService: typeof authService = authService

  public async login(data: AUTH__REQUEST__BODY) {
    try {
      console.log('HEREEE')
      await this.authService.login(data)
      // this.sendSuccess({}, {}, 200)
    } catch (err) {
      this.sendError(err, 'error')
    }
  }
}

export default new AuthController()
