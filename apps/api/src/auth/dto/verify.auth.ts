import { IsNumberString, IsPhoneNumber, Length } from 'class-validator'

export class VerifyCodeAuthDto {
  @IsPhoneNumber()
  phone: string

  @IsNumberString()
  @Length(6, 6)
  code: string
}
