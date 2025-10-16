import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
// import { AuthenticatedRequest } from '../types/auth.types';
import { AuthService } from './auth.service';
import { CustomerSignupDto } from './dtos/customerSignUp.dto';
import { LoginDTO } from './dtos/login.dto';
import { RefreshTokensDTO } from './dtos/refresh.dto';
import { ChangePasswordDTO } from './dtos/change-password.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ForgotPasswordDTO } from './dtos/forgot-password.dto';
import { ResetPasswordDTO } from './dtos/reset-password.dto';
import { GoogleAuthGuard } from './guards/google-auth.guards';
import { FixerSignupDto } from './dtos/fixerSignup.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('customer-signup')
  async customerSignup(@Body() signupData: CustomerSignupDto) {
    return this.authService.customerSignup(signupData);
  }

  @Post('fixer-signup')
  async fixerSignup(@Body() signupData: FixerSignupDto) {
    return this.authService.fixerSignup(signupData);
  }

  @Post('login')
  async login(@Body() credentials: LoginDTO) {
    return this.authService.login(credentials);
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokensDTO) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @UseGuards(AuthGuard)
  @Put('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDTO,
    @Req() req,
  ) {
    return this.authService.changePassword(req.userId, changePasswordDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDTO) {
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken,
    );
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return this.authService.getProfile(req.userId);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async updateProfile(@Body() updateData: UpdateProfileDto, @Req() req) {
    return this.authService.updateProfile(req.userId, updateData);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    try {
      const { accessToken, refreshToken, user } =
        await this.authService.googleLogin(req.user);

      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
      const userData = encodeURIComponent(
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType || 'customer',
        }),
      );
      res.redirect(
        `${frontendUrl}/auth/google/success?token=${accessToken}&refreshToken=${refreshToken}&user=${userData}`,
      );
    } catch (error) {
      console.error('Google auth error:', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
      res.redirect(`${frontendUrl}/login?error=Authentication failed`);
    }
  }
}
