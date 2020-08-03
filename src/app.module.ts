import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { typeOrmConfig } from './config/typeorm.config';
import { ModelController } from './controllers/model.controller';
import { AuthController } from 'controllers/auth.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'providers/jwtStrategy';
import { SECREAT } from 'config/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'client')
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || SECREAT,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  TypeOrmModule.forRoot(typeOrmConfig),
  ],
  providers: [
    JwtStrategy
  ],
  controllers: [
    AuthController,
    ModelController,
  ]

})
export class AppModule { }
