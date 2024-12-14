import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from 'src/constants'
import type { JwtPayload } from 'src/types'

class JwtService {
  constructor(expiresIn: string = '2h') {
    if (!JWT_SECRET_KEY) throw new Error('JWT_SECRET_KEY is not defined')

    this.jwt = jwt
    this.secretKey = String(JWT_SECRET_KEY)
    this.expiresIn = expiresIn
  }

  private jwt: typeof jwt
  private readonly secretKey: string
  private readonly expiresIn: string

  public generateToken(payload: JwtPayload): string {
    return this.jwt.sign(payload, this.secretKey, { expiresIn: this.expiresIn })
  }

  public verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = this.jwt.verify(token, this.secretKey) as JwtPayload
      return decoded
    } catch (error) {
      throw new Error(`Token: ${token} NOT VERIFIED at ${new Date().toLocaleDateString()}`)
    }
  }

  public decodeToken(token: string): JwtPayload | null {
    try {
      const decoded = this.jwt.decode(token) as JwtPayload
      return decoded
    } catch (error) {
      throw new Error(`Token: ${token} NOT DECODED at ${new Date().toLocaleDateString()}`)
    }
  }

  public extractTokenFromHeader(authHeader: string): string | null {
    if (!authHeader) throw new Error(`header: ${authHeader} NOT EXTRACTABLE at ${new Date().toLocaleDateString()}`)
    const parts = authHeader.split(' ')

    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1] ?? null
    }

    return null
  }
}
