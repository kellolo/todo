import { Response } from 'express'
import { logger, errorLogger } from 'src/services'
import { dateTime } from 'src/helpers'
export abstract class BaseController {
  constructor(controllerName: string = 'base') {
    this.controllerName = controllerName
  }

  private controllerName: string

  sendSuccess<T>(responce: Response, data: T, statusCode: number = 200) {
    this.log('log', 'SUCCESS')
    return responce.status(statusCode).json({ success: true, data })
  }

  sendError(responce: Response, message: string, statusCode: number = 500) {
    this.log('err', 'ERROR')
    return responce.status(statusCode).json({ success: false, message })
  }

  log(type: 'log' | 'err', message: string) {
    const timeStamp = `${dateTime.getLocaleDate()} @ ${dateTime.getLocaleTime()}`
    const log_item = `${this.controllerName}: ${message} : ${timeStamp}`
    if (type === 'log') {
      logger.log(log_item)
    } else {
      errorLogger.log(log_item)
    }
  }
}
