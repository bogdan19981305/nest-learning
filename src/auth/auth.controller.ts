import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDtoRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Endpoint to register a new user in the system.',
    tags: ['Auth'],
  })
  @ApiOkResponse({
    description: 'User successfully registered.',
    type: AuthResponse,
  })
  @ApiConflictResponse({
    description: 'User already exists with this email.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data.',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterDtoRequest,
  ) {
    return this.authService.register(res, dto);
  }

  @ApiOkResponse({
    description: 'User successfully registered.',
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'User login failed due to invalid credentials.',
  })
  @ApiOperation({
    summary: 'User login',
    description: 'Endpoint for user login to the system.',
    tags: ['Auth'],
  })
  @ApiNotFoundResponse({
    description: 'User not found with the provided email.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return this.authService.login(res, dto);
  }

  @ApiOkResponse({
    description: 'User successfully refreshed.',
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized request, invalid or expired tokens.',
  })
  @ApiOperation({
    summary: 'Refresh user session',
    description: 'Endpoint to refresh user session and tokens.',
  })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.authService.refresh(res, req);
  }

  @ApiOperation({
    summary: 'User logout',
    description: 'Endpoint for user logout from the system.',
    tags: ['Auth'],
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @ApiOperation({
    summary: 'Get current user',
    description: 'Endpoint to get the currently authenticated user.',
    tags: ['Auth'],
  })
  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('me')
  me(@Authorized() user: User) {
    return user;
  }
}
