import { Router } from 'express'

export abstract class BaseRoute {
  public router: Router
  protected abstract basePath: string

  constructor() {
    this.router = Router()
    this.initializeRoutes()
  }

  abstract initializeRoutes(): void

  getPath(): string {
    return this.basePath
  }
}
