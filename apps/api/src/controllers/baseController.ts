import { Response } from 'express'

export abstract class BaseController {
  sendSuccess<T>(responce: Response, data: T, statusCode: number = 200) {
    return responce.status(statusCode).json({ success: true, data })
  }

  sendError(responce: Response, message: string, statusCode: number = 500) {
    return responce.status(statusCode).json({ success: false, message })
  }
}
