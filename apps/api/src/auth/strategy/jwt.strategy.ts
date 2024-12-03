import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { AuthPayload } from '../types/jwt-payload.type'
import { Request } from 'express'
import { jwtExtractor } from '@/common/utils'
import { Inject } from '@nestjs/common'
import jwtConfig from '../config/jwt.config'
import { type ConfigType } from '@nestjs/config'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {
    super({
      jwtFromRequest: (req: Request) => jwtExtractor(req, 'access_token'),
      secretOrKey: jwtConfiguration.secret
    })
  }

  async validate(payload: AuthPayload) {
    return { id: payload.id, email: payload.email }
  }
}
