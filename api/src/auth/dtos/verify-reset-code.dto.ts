import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class VerifyResetCodeDto {
  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}