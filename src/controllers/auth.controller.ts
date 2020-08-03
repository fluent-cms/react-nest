import { Controller, Post, Body, ValidationPipe, UnauthorizedException, Logger, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest, MFARequest } from 'client/src/share/auth/authRequest';
import { findUserbyName, validatePassword, toDTO } from '../repos/userRepo';

@Controller('api/auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
  ) { }


  @Post('signin')
  async signIn(@Body(ValidationPipe) authRequest: AuthRequest) {
    try {

      const { username, password } = authRequest
      const user = await findUserbyName(username)
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const result = await validatePassword(user, password)
      if (!result) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const userModel = toDTO(user)
      const accessToken = await this.jwtService.sign(userModel);
      return {accessToken}
    }
    catch (err) {
      console.log(err)
      throw new InternalServerErrorException(JSON.stringify(err))
    }
  }
}
