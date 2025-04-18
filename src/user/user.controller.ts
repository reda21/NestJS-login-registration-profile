import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserProfile(@Request() req) {
    return req.user; // Affiche les données de l'utilisateur connecté
  }
}