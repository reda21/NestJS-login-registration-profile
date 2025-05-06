import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './DTO/register.dto';
import { LoginDto } from './DTO/login.dto';
import { PrismaService } from 'src/prisma.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly prisma: PrismaService) {}

  @Post('register')  // ../auth/register
  register(@Body() dto: RegisterDto) {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Get("db-test")
  async testDb() {
    try {
      const users = await this.prisma.user.findMany(); // ou une autre table existante
      return users;
    } catch (error) {
      console.error('Database test error:', error);
      return { error: error.message };
    }
  }
}
