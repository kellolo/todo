import { BaseRoute } from '../baseRoute'
import { authController } from 'src/controllers'
import type { REQUEST, AUTH__REQUEST__BODY } from 'src/types'
const AuthController = {
  login: () => {
    console.log('LOGIN')
  },
}

class AuthRoute extends BaseRoute {
  protected basePath = '/api/auth'

  // private authController: AuthController
  private authController: { login: () => void }

  constructor() {
    super()
    this.authController = AuthController
  }

  initializeRoutes() {
    // this.router.post('/login', this.authController.login.bind(this.authController))
    this.router.post('/login', (request: REQUEST<AUTH__REQUEST__BODY>, response) => {
      authController.login(request.body)
    })
  }
}

export default AuthRoute
