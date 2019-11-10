import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { AuthService } from '../auth/auth.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    PassportModule, // 默认策略，之后在装饰器中使用就不需要传递
    JwtModule.register({
        secret: jwtConstants.secret, // 设置secret
        signOptions: { expiresIn: '3600' }, // 设置token的属性，时间为3600*10就是十小时,其余配置可以看jwt的一些相关配置
    }),
  ],
  controllers:[
    UserController
  ],
  providers:[
    UsersService,
    AuthService
  ],
  exports:[
    PassportModule,
    UsersService,

  ]
})
export class UsersModule {}
