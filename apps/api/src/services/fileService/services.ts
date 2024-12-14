import fs from 'fs'

export abstract class FileService {
  private path: string
  private readonly fileType: 'txt' | 'json'

  constructor(path: string, fileType: 'txt' | 'json' = 'json') {
    this.path = path
    this.fileType = fileType
    this._init()
  }

  private async _init() {
    if (!(await this._fileExists())) {
      try {
        console.log(this.path)
        await this.createFile()
      } catch (error: any) {
        throw new Error(`Failed to initialize the file at ${this.path}: ${error.message}`)
      }
    }
  }

  protected async readFile(): Promise<any> {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8')
      return this._content({ content: '', fileContent: data })
    } catch (error: any) {
      throw new Error(this._getErrorMsg(error, 'read'))
    }
  }

  protected async writeFile(content: any): Promise<void> {
    const fileContent = await this.readFile()
    // const data = this._contentToWrite({ content, fileContent })
    try {
      await fs.promises.writeFile(this.path, this._content({ content, fileContent }), 'utf-8')
    } catch (error: any) {
      throw new Error(this._getErrorMsg(error, 'write'))
    }
  }

  protected async createFile(): Promise<void> {
    try {
      await fs.promises.writeFile(this.path, '', 'utf-8')
    } catch (error: any) {
      throw new Error(this._getErrorMsg(error, 'create'))
    }
  }

  protected async deleteFile(): Promise<void> {
    try {
      await fs.promises.unlink(this.path)
    } catch (error: any) {
      throw new Error(this._getErrorMsg(error, 'delete'))
    }
  }

  private _content({ content, fileContent }: { content: string; fileContent: string }): any {
    if (this.fileType === 'json') {
      try {
        const fileContentParsed = JSON.parse(fileContent)
        const contentParsed = typeof content === 'string' ? JSON.parse(content) : content
        const isArray = Array.isArray(fileContentParsed)
        const bothArrays = isArray && Array.isArray(contentParsed)

        return bothArrays ? [...fileContentParsed, ...contentParsed] : [...fileContentParsed, contentParsed]
      } catch (error) {
        throw new Error('Failed to parse JSON content')
      }
    }

    return `${fileContent}\n${content}`
  }

  private _contentToWrite(content: any): string {
    if (this.fileType === 'json') {
      return JSON.stringify(content, null, 2)
    }
    return content
  }

  private async _fileExists(): Promise<boolean> {
    try {
      await fs.promises.access(this.path)
      return true
    } catch {
      return false
    }
  }

  private _getErrorMsg(err: any, op: 'read' | 'write' | 'delete' | 'create') {
    return `Error ${op} file at ${this.path}: ${err?.message || 'ERR::undefined'}`
  }
}
