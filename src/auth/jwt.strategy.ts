import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,  // Assure-toi que ce secret est défini dans ton .env
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };  // Cela permet d'extraire les données du payload du token
  }
}
