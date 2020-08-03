import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { findUserbyName } from '../repos/userRepo';
import { User } from 'client/src/share/entities/user.entity';
import { SECREAT } from 'config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || SECREAT,
    });
  }

  async validate(payload: User): Promise<User> {
    const user = findUserbyName(payload.username)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
