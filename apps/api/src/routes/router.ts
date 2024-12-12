import { Application } from 'express'
import { BaseRoute, AuthRoute } from './components'

export class Router {
  private routes: BaseRoute[] = []

  constructor() {
    this.registerRoutes()
  }

  private registerRoutes() {
    this.routes = [new AuthRoute()]
  }
  public initialize(app: Application) {
    this.routes.forEach(route => {
      const path = route.getPath()
      app.use(path, route.router)
    })
  }
}
