import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SigninAuthDto } from './dto/signin.auth'
import { VerifyCodeAuthDto } from './dto/verify.auth'
import { IsPublic } from '@/decorators/public.decorator'

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
  async verifyCode(@Body() dto: VerifyCodeAuthDto) {
    return this.authService.verifyCode(dto)
  }
}
