import { HTTPError, type KyInstance } from 'ky'
import { HTTPClient } from './HTTPClient'
import { API_URL } from './url'

export abstract class APIService<T> {
  constructor(
    protected URL: string,
    ext?: boolean
  ) {
    this.apiURL = API_URL
    this.url = `${this.apiURL}${URL}`
    this.external = Boolean(ext)
    this.instance = new HTTPClient()
  }

  protected apiURL: string
  public url: string
  protected external: boolean
  protected instance: HTTPClient

  protected async get<TReq, TRes>(url: string, query?: Record<string, any>, blob?: boolean) {
    const URL = this._getURL(url)
    try {
      const response = await this._instance.get(URL, query)

      const data = await (!blob ? response.json() : response.blob())

      return data
    } catch (err) {
      this._handleError(err as HTTPError)
    }
  }

  protected async post<TReq, TRes>(url: string, body: TReq, searchParams?: Record<string, any>) {
    const URL = this._getURL(url)
    try {
      const response =
        ((await (await this._instance.post(URL, { json: body, searchParams }))?.json()) as {
          status: boolean
          token?: string
        }) || null

      return response || false
    } catch (err) {
      this._handleError(err as HTTPError)
      throw err
    }
  }

  protected async delete<TReq, TRes>(url: string, query?: Record<string, any>) {
    const URL = this._getURL(url)
    try {
      const response = ((await (await this._instance.delete(URL, query))?.json()) as { status: boolean }) || null
      return response?.status || false
    } catch (err) {
      this._handleError(err as HTTPError)
    }
  }

  private async _handleError(error: HTTPError) {
    const { response } = error

    switch (response.status) {
      default: {
        console.log(`server error: ${response.status}`)
      }
    }
    throw error
  }
  private _getURL(url: string) {
    return !this.external ? `${this.url}${url}` : url
  }

  private get _instance() {
    return this.instance.getInstance()
  }
}
