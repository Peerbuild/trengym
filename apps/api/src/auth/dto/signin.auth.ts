import { IsEmail, IsPhoneNumber } from 'class-validator'

export class SigninAuthDto {
  @IsEmail()
  email: string

  @IsPhoneNumber()
  phone: string
}
