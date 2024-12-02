import { createEvent } from '@/common/event'
import { PrismaService } from '@/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create.user'
import { getUserByIdOrEmailOrPhone } from '@/common/user'

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
}
