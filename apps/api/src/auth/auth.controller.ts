import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SigninAuthDto } from './dto/signin.auth'
import { VerifyCodeAuthDto } from './dto/verify.auth'
import { IsPublic } from '@/decorators/public.decorator'
import { type Response } from 'express'
import { setResponseCookie } from '@/common/utils'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('signin')
  @HttpCode(200)
  async signIn(@Body() dto: SigninAuthDto) {
    return this.authService.signIn(dto)
  }

  @IsPublic()
  @Post('verify-code')
  @HttpCode(200)
  async verifyCode(
    @Body() dto: VerifyCodeAuthDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { access_token, ...user } = await this.authService.verifyCode(dto)
    setResponseCookie(res, 'access_token', access_token)
    return { user, access_token }
  }
}
