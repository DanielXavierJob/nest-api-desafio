import { Controller, UseGuards, Request, Post, Get, Param, Body } from '@nestjs/common';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';
import { JwtAuthGuard } from './shared/jwt-auth.guard';
type Forget = {
  email: string;
}
type ForgetCode = {
  code: string;
}
type ForgetPassword = {
  code: string;
  password: string;
}
@Controller()
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('auth/forget')
  async forget(@Body() body: Forget) {
    return this.authService.forget(body);
  }

  @Post('auth/forget/step')
  async forgetCode(@Body() body: ForgetCode) {
    
    if (body.code && body.code != null) {
      return this.authService.forgetCode(body);
    }
    return {statusCode: 404, message: "Page not found"};
  }
  @Post('auth/forget/reset')
  async forgetPassword(@Body() body: ForgetPassword) {
    return this.authService.forgetPassword(body);
  }


  @UseGuards(JwtAuthGuard)
  @Get('auth/me')
  getProfile(@Request() req) {
    return req.user;
  }
}
