import { IsOptional, IsString, IsEmail, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+254[0-9]{9}$/, {
    message: 'Phone number must be in format +254XXXXXXXXX',
  })
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
