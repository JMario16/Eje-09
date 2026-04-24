import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiResponseProperty, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // auth/register - - No protegida
  @ApiBody({type: CreateUserDto}) // Indica que requiere un body
  @ApiCreatedResponse({type: User, description: 'Cuando el registro es exitoso'})
  @ApiBadRequestResponse({description: 'Cuando falta un campo, o el formato es incorrecto'})
  @ApiConflictResponse({description: 'Correo existente'})
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  // auth/login - - No protegida
  @ApiBody({type: LoginUserDto}) // Indica que requiere un body
  @ApiCreatedResponse({description: 'Cuando el acceso es correcto', schema: {example: {token: 'Token generado'}}})
  @ApiNotFoundResponse({description: 'Usuario no encontrado'})
  @ApiUnauthorizedResponse({description: 'Contraseña incorrecta'})
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  // auth/profile - - Protegida
  // Para ver el perfil de un usuario, se requiere su token

  @ApiBearerAuth() // Indica que requiere autorización
  @UseGuards(AuthGuard)
  @Get('/profile')
  profile(@Request() req) {
    return "Estas viendo un perfil protejido por un Token valido del usuario: " + req.user.name;
  }
}