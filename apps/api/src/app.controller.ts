import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { IsPublic } from './decorators/public.decorator'

@IsPublic()
@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
