import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create.user'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto)
  }

  @Post('approve/:id')
  @HttpCode(200)
  async approveUser(@Param('id') userId: string) {
    return this.userService.approveUser(userId)
  }
}
