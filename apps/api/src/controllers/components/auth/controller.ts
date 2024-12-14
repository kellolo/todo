import { BaseController } from 'src/controllers/baseController'

import { AUTH__REQUEST__BODY } from 'src/types'

class AuthController extends BaseController {
  constructor() {
    super('auth_controller')
  }

  public async login(data: AUTH__REQUEST__BODY) {
    try {
      this.sendSuccess({}, {}, 200)
    } catch (err) {
      this.sendError(err, 'error')
    }
  }
}

export default new AuthController()
