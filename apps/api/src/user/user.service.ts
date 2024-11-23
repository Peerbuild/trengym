import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create.user';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: createUserDto.email }, { phone: createUserDto.phone }],
      },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  async approveUser(userId: string) {
    const { id } = await this.getUserById(userId);

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        isApproved: true,
      },
    });

    return `User:${id} has been approved`;
  }

  private async getUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User:${userId} not found`);
    }

    return user;
  }
}
