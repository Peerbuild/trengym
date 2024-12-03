import { createEvent } from '@/common/event'
import { PrismaService } from '@/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create.user'
import { getUserByIdOrEmailOrPhone } from '@/common/user'
import { AuthPayload } from '@/auth/types/jwt-payload.type'
import { UpdateUserDto } from './dto/update.user'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const userExists = await getUserByIdOrEmailOrPhone(this.prisma, {
      email: createUserDto.email,
      phone: createUserDto.phone
    })

    if (userExists) {
      throw new BadRequestException('User already exists')
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto
      }
    })
  }

  async approveUser(userId: string) {
    const { id, email, name } = await getUserByIdOrEmailOrPhone(this.prisma, {
      id: userId
    })

    await this.prisma.user.update({
      where: {
        id
      },
      data: {
        isApproved: true
      }
    })

    await createEvent({
      eventType: 'accountConfirmation',
      recipient: {
        email
      },
      variables: {
        name
      }
    })

    return `User:${id} has been approved`
  }

  async updateSelf(
    currenUser: AuthPayload,
    { email, phone, ...dto }: UpdateUserDto
  ) {
    const user = await getUserByIdOrEmailOrPhone(this.prisma, {
      id: currenUser.id
    })

    if (email) {
      const userExists = await getUserByIdOrEmailOrPhone(this.prisma, {
        email
      })
      if (userExists) {
        throw new BadRequestException('User already exists')
      }

      //TODO: send verification email
      return {
        message: 'Verification email sent'
      }
    }

    if (phone) {
      const userExists = await getUserByIdOrEmailOrPhone(this.prisma, {
        phone
      })
      if (userExists) {
        throw new BadRequestException('User already exists')
      }

      //TODO: send verification sms
      return {
        message: 'Verification sms sent'
      }
    }

    return this.prisma.user.update({
      where: {
        id: user.id
      },
      data: dto
    })
  }
}
