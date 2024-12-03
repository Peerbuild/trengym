import { Body, Controller, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create.user'
import { CurrentUser } from '@/decorators/currentUser.decorator'
import { type AuthPayload } from '@/auth/types/jwt-payload.type'
import { UpdateUserDto } from './dto/update.user'

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

  @Patch('update')
  async updateSelf(
    @CurrentUser() user: AuthPayload,
    @Body() dto: UpdateUserDto
  ) {
    return this.userService.updateSelf(user, dto)
  }
}
