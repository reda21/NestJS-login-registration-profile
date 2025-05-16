import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService, User } from '../users/users.service'; // Ajout de l'importation de User
import { JwtService } from '@nestjs/jwt';

export type SignInResponseType = {
  user: User;
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<SignInResponseType> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
