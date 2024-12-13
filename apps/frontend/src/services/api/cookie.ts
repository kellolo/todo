import Cookies from 'js-cookie'

const key = 'auth_token'

export const getCookies = () => Cookies.get(key) || null

export const setCookies = (token: string) => Cookies.set(key, token)

export const deleteCookies = () => Cookies.remove(key)

class CookiesHandler {
  constructor() {
    this.key = 'auth_token'
    this.instance = Cookies
  }

  private instance: typeof Cookies
  private key: string

  public get = () => this.instance.get(this.key) || null
  public set = (token: string) => {
    this.instance.set(this.key, token)
  }

  public remove = () => {
    this.instance.remove(this.key)
  }
}

export const cookiesHandler = new CookiesHandler()
