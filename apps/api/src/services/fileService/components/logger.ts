import { FileService } from '../services'
import { pathResolve } from '../pathResolver'

class Logger extends FileService {
  constructor(type: 'err' | 'log') {
    super(pathResolve('logs', `${type}.txt`), 'txt')
  }

  public async log(content: string) {
    return this.writeFile(content)
  }

  static createLogger(type: 'err' | 'log') {
    return new Logger(type)
  }
}

export const errorLogger = Logger.createLogger('err')
export const logger = Logger.createLogger('log')
