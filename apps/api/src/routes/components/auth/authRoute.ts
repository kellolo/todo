import { BaseRoute } from '../baseRoute'

const AuthController = {
  login: () => {
    console.log('LOGIN')
  },
}

class AuthRoute extends BaseRoute {
  protected basePath = '/auth'

  // private authController: AuthController
  private authController: { login: () => void }

  constructor() {
    super()
    this.authController = AuthController
    console.log('here', this.authController)
  }

  initializeRoutes() {
    // this.router.post('/login', this.authController.login.bind(this.authController))
    this.router.post('/login', () => {
      console.log('LOGN')
    })
  }
}

export default AuthRoute
