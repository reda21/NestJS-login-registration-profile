import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma.service';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
  import { RegisterDto } from './DTO/register.dto';
  
  @Injectable()
  export class AuthService {
    constructor(
      private prisma: PrismaService,
      private jwt: JwtService,
    ) {}
  
    async register(dto: RegisterDto) {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
  
      if (existing) throw new BadRequestException('Email already in use');
  
      const hashed = await bcrypt.hash(dto.password, 10);
      console.log('Creating user with email:', dto.email);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashed,
          name: dto.name,
        },
      });
      return this.generateToken(user.id);
    }
  
    async login(email: string, password: string) {
      const user = await this.prisma.user.findUnique({ where: { email } });
  
      if (!user) throw new NotFoundException('User not found');
  
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new BadRequestException('Invalid credentials');
  
      return this.generateToken(user.id);
    }
  
    private generateToken(userId: number) {
      const payload = { sub: userId };
      return {
        access_token: this.jwt.sign(payload),
      };
    }
  }
  