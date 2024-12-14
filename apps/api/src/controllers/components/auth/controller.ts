import { BaseController } from 'src/controllers/baseController'
import { logger } from 'src/services'
import { AUTH__REQUEST__BODY } from 'src/types'

class AuthController extends BaseController {
  constructor() {
    super()
  }

  public login(data: AUTH__REQUEST__BODY) {
    logger.log('controlled auth: ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString())
  }
}

export default new AuthController()
