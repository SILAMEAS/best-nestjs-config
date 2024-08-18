import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { DtoLogin } from './dto/dto.login';
import { DtoCreateEmployee } from '../employees/dto/dto.create.employee';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body(ValidationPipe) signInDto: DtoLogin) {
    return this.authService.signIn(signInDto);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/sign-up')
  signUp(@Body(ValidationPipe) createEmployeeDto: DtoCreateEmployee) {
    return this.authService.signUp(createEmployeeDto);
  }
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
