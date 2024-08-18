import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoLogin } from './dto/dto.login';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  login(@Body(ValidationPipe) dtoLogin: DtoLogin) {
    this.authService.signIn(dtoLogin).then((r) => r);
  }
}
