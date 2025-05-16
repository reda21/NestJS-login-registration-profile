import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Import du module JWT pour la gestion des tokens
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy'; // Import de la stratégie JWT
import { AuthService } from './auth.service'; // Service d'authentification
import { PrismaService } from '../prisma.service'; // Prisma service pour la gestion des données

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Assure-toi d'avoir le secret dans ton fichier .env
      signOptions: { expiresIn: '60m' }, // Option d'expiration du JWT
    }),
  ],
  providers: [
    AuthService,
    PrismaService,
    JwtAuthGuard, // Tu peux ajouter le guard ici si tu veux
    JwtStrategy, // Enregistrement de la stratégie JWT
  ],
  exports: [AuthService], // Tu peux exporter AuthService pour qu'il soit disponible dans d'autres modules
})
export class AuthModule {}
