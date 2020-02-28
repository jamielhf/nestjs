
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import {  GithubStrategy } from './github.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { CommonModule } from '../../common/common.module';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    CoreModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers:[AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GithubStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}