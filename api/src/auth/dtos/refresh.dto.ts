import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokensDTO {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
