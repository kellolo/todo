import fs from 'fs'
import { Woker } from '@repo/helpers'

type JSONParsedData = any[] // jsons are only for arrays
export abstract class FileService extends Woker {
  private path: string
  private readonly fileType: 'txt' | 'json'
  protected fileServiceReady: boolean = false
  protected _cbAfterInit: null | (() => Promise<void>) = null

  constructor(path: string, fileType: 'txt' | 'json' = 'json') {
    super()
    this.path = path
    this.fileType = fileType
    this._init()
  }

  private async _init() {
    if (!(await this._fileExists())) {
      try {
        await this._ensureDirectoryExists()
        await this.createFile()

        this.fileServiceReady = true
        if (this._cbAfterInit) {
          await this._cbAfterInit()
        }
      } catch (error: any) {
        throw new Error(`Failed to initialize the file at ${this.path}: ${error.message}`)
      }
    } else {
      console.log('FILE EXISTS', this.path)
    }
  }

  protected async readFile(): Promise<string> {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8')
      return this._content({ content: '', fileContent: data })
    } catch (error: any) {
      throw new Error(this._getErrorMsg(error, 'read'))
    }
  }

  protected async writeFile(content: any): Promise<boolean> {
    const fileContent = await this.readFile()
    try {
      await fs.promises.writeFile(this.path, this._content({ content, fileContent }), 'utf-8')
      return true
    } catch (error: any) {
      throw new Error(this._getErrorMsg(error, 'write'))
    }
  }

  protected async createFile(): Promise<boolean> {
    try {
      const initData = this.fileType === 'json' ? JSON.stringify([]) : ''
      await fs.promises.writeFile(this.path, initData, 'utf-8')
      return true
    } catch (error: any) {
      throw new Error(this._getErrorMsg(error, 'create'))
    }
  }

  protected async deleteFile(): Promise<boolean> {
    try {
      await fs.promises.unlink(this.path)
      return true
    } catch (error: any) {
      throw new Error(this._getErrorMsg(error, 'delete'))
    }
  }

  private _content({ content, fileContent }: { content: string; fileContent: string }): string {
    switch (this.fileType) {
      case 'json': {
        const fileContentParsed = this._readJSON(fileContent)
        const contentParsed = this._readJSON(content)
        const data = this._processDataPartsForJSON(fileContentParsed, contentParsed)
        return JSON.stringify(data, null, 2)
      }
      default: {
        // for .txt
        return `${fileContent}\n${content}`
      }
    }
  }

  protected _readJSON(data: string): JSONParsedData {
    return JSON.parse(data)
  }

  private _processDataPartsForJSON(storedData: JSONParsedData, newData: JSONParsedData): any[] {
    const isArray = Array.isArray(storedData)
    const bothArrays = isArray && Array.isArray(newData)
    return bothArrays ? [...storedData, ...newData] : [...storedData, newData]
  }

  private async _fileExists(): Promise<boolean> {
    try {
      await fs.promises.access(this.path)
      return true
    } catch {
      return false
    }
  }

  private async _ensureDirectoryExists(): Promise<void> {
    const dirPath = this._getDirectoryPath()
    try {
      await fs.promises.mkdir(dirPath, { recursive: true })
      console.log(`Directory ${dirPath} created or already exists`)
    } catch (err: any) {
      throw new Error(`Failed to create directory at ${dirPath}: ${err.message}`)
    }
  }

  private _getDirectoryPath(): string {
    return this.path.substring(0, this.path.lastIndexOf('/')) // Получаем путь к папке без файла
  }

  private _getErrorMsg(err: any, op: 'read' | 'write' | 'delete' | 'create'): string {
    return `Error ${op} file at ${this.path}: ${err?.message || 'ERR::undefined'}`
  }

  protected get standBy(): boolean {
    return this.fileServiceReady
  }

  // protected async _sleep(maxAttempts = 25, timeout = 100) {
  //   if (this.parentReady) return
  //   const ready = await sleeper(maxAttempts, timeout, () => this.parentReady)

  //   if (ready === 'failed') {
  //     throw new Error('Fileserver initialization in DataHandler')
  //   }
  // }
}
