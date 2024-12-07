import { CookieOptions, Response, Request } from 'express'

export function setResponseCookie(
  res: Response,
  key: string,
  value: string,
  options?: CookieOptions
) {
  res.cookie(key, value, {
    domain: 'localhost',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    httpOnly: true,
    ...options
  })
}

export const jwtExtractor = (
  req: Request,
  type: 'access_token' | 'refresh_token'
) => {
  let token = null

  const hasBearerToken =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer ')

  if (hasBearerToken) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies) {
    token = req.cookies[type]
  }

  return token
}
