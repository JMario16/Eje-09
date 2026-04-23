import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // auth/register - - No protegida
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  // auth/login - - No protegida
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // auth/profile - - Protegida
  // Para ver el perfil de un usuario, se requiere su token

  @UseGuards(AuthGuard)
  @Get('/profile')
  profile(@Request() req) {
    return "Estas viendo un perfil protejido por un Token valido del usuario: " + req.user.name;
  }
}