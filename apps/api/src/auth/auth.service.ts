import {
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { SigninAuthDto } from './dto/signin.auth'
import { PrismaService } from '@/prisma/prisma.service'
import { createEvent } from '@/common/event'
import { VerifyCodeAuthDto } from './dto/verify.auth'
import { getUserByIdOrEmailOrPhone } from '@/common/user'
import { Twilio } from 'twilio'
import { ConfigService } from '@nestjs/config'
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  twilioClient: Twilio
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService
  ) {
    this.twilioClient = new Twilio(
      this.config.get('TWILIO_ACCOUNT_SID'),
      this.config.get('TWILIO_AUTH_TOKEN')
    )
  }

  async signIn({ email, phone }: SigninAuthDto) {
    // check if user exists with this email and phone and approved
    const user = await getUserByIdOrEmailOrPhone(this.prisma, {
      email,
      phone
    })

    // create a new accountVerification Event for this user
    await createEvent({
      eventType: 'smsVerification',
      recipient: {
        phoneNumber: user.phone
      }
    })

    return {
      message: 'Verification code sent successfully'
    }
  }

  async verifyCode({ phone, code }: VerifyCodeAuthDto) {
    // check if user exists with this phone
    const user = await getUserByIdOrEmailOrPhone(this.prisma, {
      phone
    })

    // check if verification code is correct
    let verificationCheck: VerificationCheckInstance
    try {
      verificationCheck = await this.twilioClient.verify.v2
        .services('VA835611453c0e452a7b9a9557ec945978')
        .verificationChecks.create({
          to: phone,
          code
        })
    } catch (error) {
      throw new NotFoundException(
        'Verification code not found for this phone number'
      )
    }

    if (verificationCheck.status !== 'approved') {
      throw new ForbiddenException('Invalid verification code')
    }

    // generate a JWT token for this user
    const access_token = await this.jwt.signAsync({
      id: user.id,
      email: user.email
    })

    return {
      ...user,
      access_token
    }
  }
}
