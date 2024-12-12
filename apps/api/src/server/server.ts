import express, { Application } from 'express'
import { Router } from '@/routes'
import { BASE__CONFIG } from '@/configs'
import { serverCors } from './cors'
// import { errorHandler } from '../middlewares/errorHandler'

export class Server {
  private app: Application
  private router: Router

  constructor() {
    this.app = express()
    this.router = new Router()
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  // Метод для инициализации middleware
  private initializeMiddlewares() {
    this.app.use(serverCors)
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  // Метод для подключения маршрутов
  private initializeRoutes() {
    this.router.initialize(this.app)
  }

  // Метод для подключения обработки ошибок
  private initializeErrorHandling() {
    // this.app.use(errorHandler)
    console.log('ERROR__Router')
  }

  // Метод для запуска сервера
  public start() {
    const port = BASE__CONFIG.port
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }
}
