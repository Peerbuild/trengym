import { Gender } from '@trengym/db'
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsEmail()
  email: string

  @IsPhoneNumber()
  phone: string

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender

  @IsNumber()
  @IsOptional()
  age?: number

  @IsNumber()
  @IsOptional()
  weight?: number

  @IsNumber()
  @IsOptional()
  height?: number
}
