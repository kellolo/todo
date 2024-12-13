import { BaseController } from 'src/controllers/baseController'
import { AUTH__REQUEST__BODY } from 'src/types'

class AuthController extends BaseController {
  constructor() {
    super()
  }

  public login(data: AUTH__REQUEST__BODY) {
    console.log('controlled auth')
  }
}

export default new AuthController()
